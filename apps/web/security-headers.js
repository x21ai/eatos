const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.hubspot.com https://*.hsforms.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://client.crisp.chat https://js.hsforms.net https://static.hsappstatic.net https://*.hubspot.com https://*.hsappstatic.net",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "media-src 'self' blob: https:",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https://client.crisp.chat https://*.lovable.app https://*.hubspot.com https://*.hsforms.com https://go.fliplink.me",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

function createSecurityHeaders({ allowCrossOriginFraming = false } = {}) {
  const headers = [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
    },
    {
      // Start in report-only mode so violations can be reviewed before enforcement.
      key: 'Content-Security-Policy-Report-Only',
      value: contentSecurityPolicy,
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value:
        'accelerometer=(), autoplay=(self), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(self), usb=()',
    },
  ];

  if (!allowCrossOriginFraming) {
    headers.push({
      key: 'X-Frame-Options',
      value: 'DENY',
    });
  }

  return headers;
}

const securityHeaders = createSecurityHeaders({
  // The Anything builder runs development previews in a cross-origin iframe.
  allowCrossOriginFraming:
    process.env.NEXT_PUBLIC_CREATE_ENV === 'DEVELOPMENT',
});

module.exports = {
  contentSecurityPolicy,
  createSecurityHeaders,
  securityHeaders,
};
