export type DriveFolderKey =
  | "uminho"
  | "gallery"
  | "analise"
  | "questionarios"
  | "protocolo";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
};

const FOLDER_ENV: Record<DriveFolderKey, string> = {
  uminho: "GOOGLE_DRIVE_FOLDER_UMINHO",
  gallery: "GOOGLE_DRIVE_FOLDER_GALLERY",
  analise: "GOOGLE_DRIVE_FOLDER_ANALISE",
  questionarios: "GOOGLE_DRIVE_FOLDER_QUESTIONARIOS",
  protocolo: "GOOGLE_DRIVE_FOLDER_PROTOCOLO",
};

export function getFolderId(folder: DriveFolderKey): string | null {
  const envName = FOLDER_ENV[folder];
  const id = process.env[envName]?.trim();
  return id || null;
}

export function isDriveConfigured(): boolean {
  const hasAuth =
    Boolean(process.env.GOOGLE_DRIVE_API_KEY?.trim()) ||
    Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()) ||
    Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim());

  return (
    hasAuth &&
    Object.values(FOLDER_ENV).some((key) => Boolean(process.env[key]?.trim()))
  );
}

export function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function publicDriveViewUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function publicDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
