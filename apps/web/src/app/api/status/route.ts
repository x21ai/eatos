import { fail, ok, readJson } from '@/lib/api';
import { execute, queryAll, queryOne } from '@/lib/db/client';

const DEFAULTS = [
  { id: 'api', name: 'API', group_name: 'Platform', status: 'operational', position: 0 },
  { id: 'pos', name: 'Point of Sale', group_name: 'Products', status: 'operational', position: 1 },
  { id: 'payments', name: 'Payments', group_name: 'Products', status: 'operational', position: 2 },
  { id: 'online', name: 'Online ordering', group_name: 'Products', status: 'operational', position: 3 },
  { id: 'dashboard', name: 'Dashboard', group_name: 'Platform', status: 'operational', position: 4 },
];

async function ensureDefaults() {
  const existing = await queryAll(`SELECT id FROM service_status LIMIT 1`);
  if (existing && existing.length > 0) return;
  for (const row of DEFAULTS) {
    await execute(
      `INSERT OR IGNORE INTO service_status (id, name, group_name, status, description, position)
       VALUES (?, ?, ?, ?, '', ?)`,
      [row.id, row.name, row.group_name, row.status, row.position],
    );
  }
}

export async function GET() {
  try {
    await ensureDefaults();
  } catch {
    // table may not exist yet during first deploy window
  }
  const rows = await queryAll<Record<string, any>>(
    `SELECT id, name, group_name, status, description, updated_at, position
       FROM service_status ORDER BY position ASC, name ASC`,
  );
  if (rows === null) return fail('database_unavailable', 'Status database unavailable.', 503);

  const groups = {};
  for (const row of rows) {
    const g = row.group_name || 'Other';
    if (!groups[g]) groups[g] = [];
    groups[g].push({
      id: row.id,
      name: row.name,
      status: row.status,
      description: row.description || '',
      updated_at: row.updated_at,
    });
  }

  return ok({
    updated_at: rows[0]?.updated_at || new Date().toISOString(),
    groups: Object.entries(groups).map(([name, systems]) => ({ name, systems })),
  });
}

export async function PATCH(request: Request) {
  const body = (await readJson(request)) || {};
  const id = typeof body.id === 'string' ? body.id : '';
  const status = typeof body.status === 'string' ? body.status : '';
  if (!id || !status) return fail('validation_failed', 'id and status are required.');

  const existing = await queryOne(`SELECT id FROM service_status WHERE id = ?`, [id]);
  if (!existing) return fail('not_found', 'Service not found.', 404);

  await execute(
    `UPDATE service_status SET status = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [status, body.description ?? '', id],
  );
  const row = await queryOne(`SELECT * FROM service_status WHERE id = ?`, [id]);
  return ok(row);
}
