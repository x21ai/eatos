const assert = require('node:assert/strict');
const test = require('node:test');

const nextConfig = require('./next.config');
const { contentSecurityPolicy, securityHeaders } = require('./security-headers');

const headerValue = (key) =>
  securityHeaders.find((header) => header.key === key)?.value;

test('applies the security headers to every route', async () => {
  const rules = await nextConfig.headers();

  assert.deepEqual(rules, [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ]);
  assert.equal(nextConfig.poweredByHeader, false);
});

test('uses a one-year HSTS policy without premature preload', () => {
  assert.equal(
    headerValue('Strict-Transport-Security'),
    'max-age=31536000; includeSubDomains'
  );
});

test('keeps CSP report-only while protecting framing separately', () => {
  assert.match(contentSecurityPolicy, /frame-ancestors 'none'/);
  assert.match(contentSecurityPolicy, /https:\/\/\*\.hubspot\.com/);
  assert.match(contentSecurityPolicy, /https:\/\/\*\.lovable\.app/);
  assert.equal(
    headerValue('Content-Security-Policy-Report-Only'),
    contentSecurityPolicy
  );
  assert.equal(headerValue('X-Frame-Options'), 'DENY');
  assert.equal(headerValue('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.match(headerValue('Permissions-Policy'), /camera=\(\)/);
  assert.match(headerValue('Permissions-Policy'), /payment=\(self\)/);
});
