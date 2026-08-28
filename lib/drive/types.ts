export type DriveFolderKey =
  | "uminho"
  | "gallery"
  | "analise"
  | "questionarios"
  | "protocolo"
  | "eavideo1"
  | "eavideo2"
  | "giredvideo1"
  | "giredvideo2"
  | "giredvideo3"
  | "giredvideo4";

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
  eavideo1: "GOOGLE_DRIVE_FOLDER_EA_VIDEO_1",
  eavideo2: "GOOGLE_DRIVE_FOLDER_EA_VIDEO_2",
  giredvideo1: "GOOGLE_DRIVE_FOLDER_GIRED_VIDEO_1",
  giredvideo2: "GOOGLE_DRIVE_FOLDER_GIRED_VIDEO_2",
  giredvideo3: "GOOGLE_DRIVE_FOLDER_GIRED_VIDEO_3",
  giredvideo4: "GOOGLE_DRIVE_FOLDER_GIRED_VIDEO_4"
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
