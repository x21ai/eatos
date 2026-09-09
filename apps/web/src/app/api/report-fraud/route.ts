// Fraud report intake, stored in Cloudflare D1 with a reference the reporter
// can quote to support.
//
// Tool contract:
//   submit_fraud_report POST /api/report-fraud
//     { firstName, lastName, email, phone?, category, details }
//     -> { data: { reference, status: 'new', created_at } }
// Call when someone reports suspected fraud involving eatOS. Do not call for
// general support questions. Errors are { error: true, code, message }.

import { execute } from '@/lib/db/client';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fail(code: string, message: string, status: number, details?: unknown) {
  return Response.json({ error: true, code, message, details }, { status });
}

function reference(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `FR-${stamp}-${random}`;
}

export async function POST(request: Request) {
  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'The request body must be JSON.', 400);
  }

  const text = (value: unknown, max: number) =>
    typeof value === 'string' ? value.trim().slice(0, max) : '';

  const firstName = text(body.firstName, 80);
  const lastName = text(body.lastName, 80);
  const email = text(body.email, 254).toLowerCase();
  const phone = text(body.phone, 40);
  const category = text(body.category, 80);
  const details = text(body.details, 5000);

  const missing: string[] = [];
  if (!firstName) missing.push('firstName');
  if (!lastName) missing.push('lastName');
  if (!EMAIL.test(email)) missing.push('email');
  if (!category) missing.push('category');
  if (details.length < 10) missing.push('details');

  if (missing.length) {
    return fail('validation_failed', 'Some required fields are missing or invalid.', 400, {
      fields: missing,
    });
  }

  const ref = reference();
  const createdAt = new Date().toISOString();

  try {
    await execute(
      `INSERT INTO fraud_reports
         (reference, first_name, last_name, email, phone, category, details, status, created_at)
       VALUES (?,?,?,?,?,?,?,'new',?)`,
      [ref, firstName, lastName, email, phone || null, category, details, createdAt]
    );
  } catch (error) {
    console.error('Fraud report failed', error);
    return fail('write_failed', 'The report could not be saved.', 500);
  }

  return Response.json({ data: { reference: ref, status: 'new', created_at: createdAt } });
}
