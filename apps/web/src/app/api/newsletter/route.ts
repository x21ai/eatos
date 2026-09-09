// Newsletter signup, stored in Cloudflare D1.
//
// Tool contract:
//   subscribe_newsletter POST /api/newsletter { email, source? }
//     -> { data: { email, status: 'subscribed' } }
// Call when a visitor asks to receive eatOS updates. Do not call to check an
// existing subscription. Errors are { error: true, code, message }.

import { execute } from '@/lib/db/client';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fail(code: string, message: string, status: number) {
  return Response.json({ error: true, code, message }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return fail('invalid_json', 'The request body must be JSON.', 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254) {
    return fail('validation_failed', 'A valid email address is required.', 400);
  }

  const source = typeof body.source === 'string' ? body.source.slice(0, 80) : 'site';

  try {
    await execute(
      `INSERT INTO newsletter_subscribers (email, source, status)
       VALUES (?, ?, 'subscribed')
       ON CONFLICT (email) DO UPDATE SET status = 'subscribed', source = excluded.source`,
      [email, source]
    );
  } catch (error) {
    console.error('Newsletter signup failed', error);
    return fail('write_failed', 'The signup could not be saved.', 500);
  }

  return Response.json({ data: { email, status: 'subscribed' } });
}
