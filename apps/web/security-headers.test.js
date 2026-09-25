const assert = require('node:assert/strict');
const test = require('node:test');

const nextConfig = require('./next.config');
const {
  contentSecurityPolicy,
  createSecurityHeaders,
  securityHeaders,
} = require('./security-headers');

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
  assert.match(contentSecurityPolicy, /script-src[^;]+https:\/\/client\.crisp\.chat/);
  assert.match(contentSecurityPolicy, /frame-src[^;]+https:\/\/client\.crisp\.chat/);
  assert.equal(
    headerValue('Content-Security-Policy-Report-Only'),
    contentSecurityPolicy
  );
  assert.equal(headerValue('X-Frame-Options'), 'DENY');
  assert.equal(headerValue('X-Content-Type-Options'), 'nosniff');
  assert.equal(headerValue('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.match(headerValue('Permissions-Policy'), /camera=\(\)/);
  assert.match(headerValue('Permissions-Policy'), /autoplay=\(self\)/);
  assert.match(headerValue('Permissions-Policy'), /payment=\(self\)/);
});

test('keeps cross-origin framing available only for builder development', () => {
  const developmentHeaders = createSecurityHeaders({
    allowCrossOriginFraming: true,
  });

  assert.equal(
    developmentHeaders.some((header) => header.key === 'X-Frame-Options'),
    false
  );
  assert.equal(
    developmentHeaders.some(
      (header) => header.key === 'Content-Security-Policy-Report-Only'
    ),
    true
  );
});
