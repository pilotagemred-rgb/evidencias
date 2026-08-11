"use client";

import { useDriveFiles } from "@/hooks/useDriveFiles";
import { UMINHO_EML_FILES } from "@/lib/staticData";
import { buildSafeUrl } from "@/lib/urls";

type ListedFile = {
  id: string;
  name: string;
  url: string;
};

export function UminhoPanel() {
  const { files, loading, error, configured } = useDriveFiles("uminho");

  const fallbackFiles: ListedFile[] = UMINHO_EML_FILES.map((name) => ({
    id: name,
    name,
    url: buildSafeUrl(name),
  }));

  const driveReady = configured && !error;
  const listed: ListedFile[] = driveReady
    ? files.map((f) => ({ id: f.id, name: f.name, url: f.url }))
    : !loading
      ? fallbackFiles
      : [];

  return (
    <div className="content-view" id="panel-pilotagem-uminho">
      <h2 className="content-heading-1">Pareceres de Pré-pilotagem</h2>
      <p className="content-text" style={{ marginBottom: 12 }}>
        Consulte e faça o download dos pareceres em formato EML emitidos para os
        Recursos Educativos Digitais:
      </p>

      <div className="table-responsive-container">
        {loading && (
          <div className="table-loader">A carregar pareceres do Google Drive...</div>
        )}

        {!loading && listed.length === 0 && (
          <div className="table-loader">
            {error
              ? `Drive indisponível: ${error}. A mostrar lista local.`
              : "Nenhum parecer encontrado na pasta do Drive."}
          </div>
        )}

        {!loading && listed.length > 0 && (
          <table className="dynamic-table">
            <thead>
              <tr>
                <th>Documento / Parecer (EML)</th>
                <th style={{ textAlign: "center", width: 150 }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {listed.map((file) => (
                <tr key={file.id}>
                  <td>
                    <strong>{file.name}</strong>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-aceder-sm"
                    >
                      <i className="fa-solid fa-download" /> Download
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
