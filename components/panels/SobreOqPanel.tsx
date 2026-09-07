"use client";

import { useDriveFiles } from "@/hooks/useDriveFiles";
import { type DriveFolderKey } from "@/lib/drive/types";

type PanelProps = {
  id?: string;
  folder?: DriveFolderKey;
};

export function SobreOqPanel({ id = "panel-ea-oq", folder = "eavideo1" }: PanelProps) {
  const { files, loading, error, configured } = useDriveFiles(folder);

  return (
    <div className="content-view" id={id}>
      <h2 className="content-heading-1">O que é o EA?</h2>
      <p className="content-text" style={{ marginBottom: 20 }}>
        Veja abaixo os vídeos explicativos sobre o Estudo Acompanhado:
      </p>

      {loading && <div className="table-loader">A carregar vídeos...</div>}

      {!loading && (!configured || error || files.length === 0) && (
        <div className="table-loader">
          {error ? `Erro ao carregar: ${error}` : "Nenhum vídeo encontrado nesta pasta do Drive."}
        </div>
      )}

      {!loading && files.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {files.map((file) => (
            <div key={file.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", padding: "12px", backgroundColor: "#fff" }}>
              <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: "6px", overflow: "hidden", backgroundColor: "#000" }}>
                <iframe
                  src={`https://drive.google.com/file/d/${file.id}/preview`}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                  allow="autoplay"
                />
              </div>
              <p style={{ marginTop: "10px", fontWeight: "600", fontSize: "14px", color: "#334155" }}>
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}