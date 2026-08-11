import { NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";
import { getDriveFileStream } from "@/lib/drive/client";
import { isDriveConfigured } from "@/lib/drive/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isDriveConfigured()) {
    return NextResponse.json(
      { error: "Google Drive não configurado." },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "ID em falta." }, { status: 400 });
  }

  const dispositionParam =
    request.nextUrl.searchParams.get("disposition") === "inline"
      ? "inline"
      : "attachment";

  try {
    const { stream, name, mimeType } = await getDriveFileStream(id);
    const webStream = Readable.toWeb(
      stream as Readable
    ) as unknown as ReadableStream;

    const encodedName = encodeURIComponent(name);
    return new NextResponse(webStream, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `${dispositionParam}; filename*=UTF-8''${encodedName}`,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao obter ficheiro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
