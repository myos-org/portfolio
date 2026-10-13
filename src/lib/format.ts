const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-07" → "Jul 2026". Locale-independent so server and client always agree. */
export function formatMonth(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  if (!year || !month || month < 1 || month > 12) throw new Error(`Invalid month: ${iso}`);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

/** Split text on `backticks` into plain and code segments. */
export function splitCode(text: string): { code: boolean; value: string }[] {
  return text
    .split("`")
    .map((value, i) => ({ code: i % 2 === 1, value }))
    .filter((part) => part.value.length > 0);
}
