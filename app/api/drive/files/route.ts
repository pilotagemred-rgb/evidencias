import { NextRequest, NextResponse } from "next/server";
import { listDriveFolder } from "@/lib/drive/client";
import { isDriveConfigured, type DriveFolderKey } from "@/lib/drive/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_FOLDERS: DriveFolderKey[] = [
  "uminho",
  "gallery",
  "analise",
  "questionarios",
  "protocolo",
];

function getOrigin(request: NextRequest): string {
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "localhost:3000";
  return `${proto}://${host}`;
}

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get("folder") as DriveFolderKey | null;

  if (!folder || !VALID_FOLDERS.includes(folder)) {
    return NextResponse.json(
      {
        error: `Parâmetro folder inválido. Use: ${VALID_FOLDERS.join(", ")}`,
      },
      { status: 400 }
    );
  }

  if (!isDriveConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        files: [],
        error:
          "Google Drive não configurado. Define GOOGLE_DRIVE_API_KEY (ou service account) e o ID da pasta.",
      },
      { status: 503 }
    );
  }

  try {
    const files = await listDriveFolder(folder, getOrigin(request));
    return NextResponse.json(
      { configured: true, folder, files },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao listar ficheiros do Drive";
    return NextResponse.json(
      { configured: true, files: [], error: message },
      { status: 500 }
    );
  }
}
