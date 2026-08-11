const DEFAULT_ASSETS_BASE = "https://hub-v-deos.vercel.app";

export function getAssetsBase(): string {
  const base = process.env.NEXT_PUBLIC_ASSETS_BASE || DEFAULT_ASSETS_BASE;
  return base.replace(/\/$/, "");
}

export function buildSafeUrl(filename: string): string {
  if (!filename) return "#";

  let cleaned = filename
    .replace("https://lms.gired.pt/", "")
    .replace("http://lms.gired.pt/", "");

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    return cleaned;
  }

  cleaned = cleaned.replace(/^\//, "");
  const encoded = cleaned
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${getAssetsBase()}/${encoded}`;
}

export function isLinkCell(value: string): boolean {
  return (
    value.startsWith("http") ||
    value.includes(".pdf") ||
    value.includes(".xlsx") ||
    value.includes(".docx")
  );
}
