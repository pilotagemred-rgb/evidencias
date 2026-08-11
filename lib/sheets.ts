export const PILOTAGEM_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRREjylh0mcjvTRSyr7dxfyMvjO23J2wV-SyWpDe2sswSdPz40rWronIxJXUqqohllk1U_jojRsqadA/pub?output=csv";

export const LINKS_RED_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9rk-7uX34gLLAADpYPbhpDifHYhs3Mdim2W7WXia9YJ_KeU3JCu8_bs8dhPNC6ILBTj7GArGFqjCu/pub?output=csv";

export type CsvRow = Record<string, string>;

export function normalizeLinksRedRows(data: CsvRow[]): CsvRow[] {
  return data.map((row) => {
    const newRow: CsvRow = {};
    Object.keys(row).forEach((key) => {
      const trimmedKey = key.trim();
      if (trimmedKey.toLowerCase().includes("ciclo")) {
        newRow["Ano de Escolaridade"] = row[key];
      } else {
        newRow[trimmedKey] = row[key];
      }
    });
    return newRow;
  });
}

export function uniqueFilterValues(
  data: CsvRow[],
  matcher: (keyLower: string) => boolean
): string[] {
  const values = new Set<string>();
  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      const value = (row[key] || "").trim();
      if (!value) return;
      if (matcher(key.trim().toLowerCase())) values.add(value);
    });
  });
  return Array.from(values).sort();
}
