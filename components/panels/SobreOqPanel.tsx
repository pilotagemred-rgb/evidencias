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
      <p className="content-text" style={{ marginBottom: 12 }}>
        Consulte os vídeos e documentos explicativos sobre o Estudo Acompanhado:
      </p>

      <div className="table-responsive-container">
        {loading && <div className="table-loader">A carregar conteúdos...</div>}

        {!loading && (!configured || error || files.length === 0) && (
          <div className="table-loader">
            {error ? `Erro: ${error}` : "Nenhum conteúdo encontrado nesta pasta."}
          </div>
        )}

        {!loading && files.length > 0 && (
          <table className="dynamic-table">
            <thead>
              <tr>
                <th>Nome do Vídeo / Conteúdo</th>
                <th style={{ textAlign: "center", width: 150 }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td><strong>{file.name}</strong></td>
                  <td style={{ textAlign: "center" }}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="btn-aceder-sm">
                      <i className="fa-solid fa-play" /> Ver / Aceder
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}