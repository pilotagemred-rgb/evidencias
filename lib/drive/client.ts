import { google } from "googleapis";
import {
  getFolderId,
  isImageMime,
  publicDriveDownloadUrl,
  publicDriveViewUrl,
  type DriveFile,
  type DriveFolderKey,
} from "./types";

type DriveAuth =
  | { type: "apiKey"; apiKey: string }
  | { type: "serviceAccount"; auth: InstanceType<typeof google.auth.JWT> };

function getAuth(): DriveAuth {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY?.trim();
  if (apiKey) {
    return { type: "apiKey", apiKey };
  }

  const jsonRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (jsonRaw) {
    const credentials = JSON.parse(jsonRaw) as {
      client_email: string;
      private_key: string;
    };
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    return { type: "serviceAccount", auth };
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim();
  if (email && privateKey) {
    const auth = new google.auth.JWT({
      email,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    return { type: "serviceAccount", auth };
  }

  throw new Error(
    "Google Drive não configurado. Define GOOGLE_DRIVE_API_KEY ou service account."
  );
}

function getDriveClient() {
  const authConfig = getAuth();
  if (authConfig.type === "apiKey") {
    return google.drive({ version: "v3", auth: authConfig.apiKey });
  }
  return google.drive({ version: "v3", auth: authConfig.auth });
}

function toAppUrl(fileId: string, mimeType: string, origin: string): string {
  // Proxy through our API so private files work with service account
  if (isImageMime(mimeType)) {
    return `${origin}/api/drive/file/${fileId}?disposition=inline`;
  }
  return `${origin}/api/drive/file/${fileId}?disposition=attachment`;
}

export async function listDriveFolder(
  folder: DriveFolderKey,
  origin: string
): Promise<DriveFile[]> {
  const folderId = getFolderId(folder);
  if (!folderId) {
    throw new Error(
      `Pasta Drive não configurada para "${folder}". Define a variável de ambiente correspondente.`
    );
  }

  const drive = getDriveClient();
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields:
        "nextPageToken, files(id, name, mimeType, webViewLink, thumbnailLink)",
      pageSize: 1000,
      pageToken,
      orderBy: "name",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    for (const file of response.data.files ?? []) {
      if (!file.id || !file.name || !file.mimeType) continue;
      // Skip Google Docs shortcuts / folders
      if (file.mimeType === "application/vnd.google-apps.folder") continue;

      files.push({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        url: toAppUrl(file.id, file.mimeType, origin),
        thumbnailUrl: file.thumbnailLink ?? undefined,
      });
    }

    pageToken = response.data.nextPageToken ?? undefined;
  } while (pageToken);

  return files;
}

export async function getDriveFileStream(fileId: string) {
  const drive = getDriveClient();
  const meta = await drive.files.get({
    fileId,
    fields: "id, name, mimeType",
    supportsAllDrives: true,
  });

  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
      supportsAllDrives: true,
    },
    { responseType: "stream" }
  );

  return {
    stream: response.data as NodeJS.ReadableStream,
    name: meta.data.name ?? fileId,
    mimeType: meta.data.mimeType ?? "application/octet-stream",
  };
}

/** Fallback public URLs when only API key + public folder is used without proxy */
export function buildPublicUrls(fileId: string, mimeType: string): DriveFile["url"] {
  return isImageMime(mimeType)
    ? publicDriveViewUrl(fileId)
    : publicDriveDownloadUrl(fileId);
}
