import { ROLE_LABELS, type AdminRole } from '@/lib/admin/permissions';

function getResendKey() {
  return process.env.RESEND_API_KEY || process.env.RESEND_KEY || '';
}

function getResendFrom() {
  return process.env.RESEND_FROM || 'eatOS <noreply@eatos.dev>';
}

function getSignupBaseUrl() {
  return (
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://s.eatos.dev'
  ).replace(/\/$/, '');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatRoleSummary(roles: AdminRole[]) {
  return roles.map((role) => ROLE_LABELS[role] || role).join(', ');
}

export type SendAdminInviteResult =
  | { ok: true; id: string | null }
  | { ok: false; code: 'not_configured' | 'send_failed'; message: string };

export async function sendAdminInvite(opts: {
  to: string;
  roles: AdminRole[];
  invitedByEmail: string;
  signupUrl?: string;
}): Promise<SendAdminInviteResult> {
  const key = getResendKey();
  if (!key) {
    return {
      ok: false,
      code: 'not_configured',
      message: 'Email service is not configured (RESEND_API_KEY).',
    };
  }

  const signupUrl =
    opts.signupUrl ||
    `${getSignupBaseUrl()}/account/signup?email=${encodeURIComponent(opts.to)}`;
  const roleSummary = formatRoleSummary(opts.roles);

  const html = `
    <div style="font-family:Montserrat,Arial,sans-serif;color:#111;max-width:560px">
      <h1 style="font-size:22px;margin-bottom:12px">You're invited to eatOS Admin</h1>
      <p>${escapeHtml(opts.invitedByEmail)} invited you to join the eatOS admin team.</p>
      <p><strong>Access:</strong> ${escapeHtml(roleSummary)}</p>
      <p style="margin:24px 0">
        <a href="${escapeHtml(signupUrl)}"
           style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600">
          Create your account
        </a>
      </p>
      <p style="color:#555;font-size:14px">
        Signup is invite-only. Use this email address (<strong>${escapeHtml(opts.to)}</strong>)
        when creating your account. If the button does not work, open
        <a href="${escapeHtml(signupUrl)}">${escapeHtml(signupUrl)}</a>.
      </p>
    </div>
  `;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: getResendFrom(),
      to: opts.to,
      subject: 'You are invited to eatOS Admin',
      html,
    });

    if ((result as { error?: { message?: string } }).error) {
      const message =
        (result as { error?: { message?: string } }).error?.message ||
        'Resend rejected the invite email.';
      console.error('admin invite email failed', message);
      return { ok: false, code: 'send_failed', message };
    }

    return {
      ok: true,
      id: (result as { data?: { id?: string | null } }).data?.id ?? null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send invite email.';
    console.error('admin invite email failed', error);
    return { ok: false, code: 'send_failed', message };
  }
}
