import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isBootstrapSignupEmail } from '@/lib/auth/allowlist';
import { isSignupEligible } from '@/lib/auth/signup-eligibility';

const queryOne = vi.fn();

vi.mock('@/lib/db/client', () => ({
  queryOne: (...args: unknown[]) => queryOne(...args),
  execute: vi.fn(),
}));

describe('signup eligibility', () => {
  beforeEach(() => {
    queryOne.mockReset();
  });

  it('allows bootstrap operator emails without a database lookup', async () => {
    await expect(isSignupEligible('PMT@eatos.com')).resolves.toBe(true);
    expect(queryOne).not.toHaveBeenCalled();
  });

  it('allows emails already present in admin_users', async () => {
    queryOne.mockResolvedValueOnce({ email: 'invited@company.com' });
    await expect(isSignupEligible('invited@company.com')).resolves.toBe(true);
    expect(queryOne).toHaveBeenCalledTimes(1);
  });

  it('allows emails with a valid pending invite', async () => {
    queryOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 'invite-1' });
    await expect(isSignupEligible('new.hire@company.com')).resolves.toBe(true);
    expect(queryOne).toHaveBeenCalledTimes(2);
  });

  it('rejects unknown emails without admin rows or invites', async () => {
    queryOne.mockResolvedValue(null);
    await expect(isSignupEligible('random@example.com')).resolves.toBe(false);
  });

  it('keeps bootstrap allowlist separate from invite flow', () => {
    expect(isBootstrapSignupEmail('jaspreet.singh@eigital.com')).toBe(true);
    expect(isBootstrapSignupEmail('random@example.com')).toBe(false);
  });
});
