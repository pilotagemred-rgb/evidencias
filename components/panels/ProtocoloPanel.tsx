"use client";

import { useDriveFiles } from "@/hooks/useDriveFiles";
import { PROTOCOLO_PDF } from "@/lib/staticData";
import type { DriveFile } from "@/lib/drive/types";

function isPdf(file: DriveFile) {
  return (
    file.mimeType === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function pickProtocolo(files: DriveFile[]): DriveFile | null {
  const pdfs = files.filter(isPdf);
  const named = pdfs.find((file) =>
    file.name.toLowerCase().includes("protocolo")
  );
  return named ?? pdfs[0] ?? files[0] ?? null;
}

export function ProtocoloPanel() {
  const { files, loading, error, configured } = useDriveFiles("protocolo");
  const driveReady = configured && !error;
  const driveFile = driveReady ? pickProtocolo(files) : null;
  const href = driveFile?.url ?? PROTOCOLO_PDF;

  return (
    <div className="content-view" id="panel-pilotagem-protocolo">
      <h2 className="content-heading-1">Protocolo de Pilotagem</h2>
      <p className="content-text" style={{ marginBottom: 20 }}>
        Consulte ou transfira o documento oficial do Protocolo de Pilotagem no
        botão abaixo:
      </p>

      {loading && (
        <div className="table-loader">A carregar protocolo do Google Drive...</div>
      )}

      {!loading && (
        <div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aceder-pill"
          >
            <i className="fa-solid fa-file-pdf" style={{ marginRight: 8 }} />
            Aceder ao Protocolo (PDF)
          </a>
        </div>
      )}
    </div>
  );
}
