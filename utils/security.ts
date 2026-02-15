
/**
 * Security utility functions.
 */

/**
 * Escapes a string for CSV export to prevent CSV Injection (Formula Injection).
 *
 * Vulnerability:
 * Excel and other spreadsheet software execute cells starting with =, +, -, or @ as formulas.
 * Attackers can inject malicious formulas to execute code or exfiltrate data.
 *
 * Mitigation:
 * 1. Wrap fields in double quotes.
 * 2. Escape double quotes by doubling them (" -> "").
 * 3. Prepend a single quote (') if the field starts with dangerous characters (=, +, -, @).
 *
 * @param value The value to escape.
 * @returns The escaped CSV string, including surrounding quotes.
 */
export const escapeCSV = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '""';
  }

  const stringValue = String(value);

  // Replace double quotes with double double quotes
  let safeValue = stringValue.replace(/"/g, '""');

  // Prevent Formula Injection
  // Check if the string starts with =, +, -, or @
  // Also check for tab (\t) and carriage return (\r) just in case, though less common for formula injection
  if (/^[=+\-@]/.test(safeValue)) {
    safeValue = "'" + safeValue;
  }

  return `"${safeValue}"`;
};
