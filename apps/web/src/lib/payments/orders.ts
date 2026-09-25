function errorText(error: unknown): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  if (error instanceof Error) {
    const cause = 'cause' in error ? errorText((error as { cause?: unknown }).cause) : '';
    return `${error.message} ${cause}`.trim();
  }
  if (typeof error === 'object' && error && 'message' in error) {
    return String((error as { message?: unknown }).message ?? '');
  }
  return String(error);
}

/** True when the orders table predates migration 0008 and has no `source` column. */
export function isMissingOrdersSourceColumn(error: unknown): boolean {
  return /no such column:\s*source|no column named source/i.test(errorText(error));
}
