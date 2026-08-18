"use client";

import { useDriveFiles } from "@/hooks/useDriveFiles";
import {
  ANALISE_RESULTADOS,
  QUESTIONARIOS,
  type QuestionarioRow,
} from "@/lib/staticData";
import type { DriveFile } from "@/lib/drive/types";

type ListedFile = {
  id: string;
  name: string;
  url: string;
};

function fold(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isExcelFile(file: DriveFile) {
  return (
    file.mimeType.includes("spreadsheet") ||
    file.mimeType.includes("excel") ||
    /\.xlsx?$/i.test(file.name)
  );
}

function isPdfFile(file: DriveFile) {
  return (
    file.mimeType === "application/pdf" || /\.pdf$/i.test(file.name)
  );
}

function matchesPublico(fileName: string, publico: string) {
  const name = fold(fileName);
  const group = fold(publico);

  if (group.includes("professor")) {
    return name.includes("professor");
  }

  if (group.includes("1")) {
    return (
      (name.includes("1 ciclo") || name.includes("1ciclo")) &&
      !name.includes("2") &&
      !name.includes("3")
    );
  }

  return (
    (name.includes("2") && name.includes("3")) ||
    name.includes("2 3") ||
    name.includes("2-3")
  );
}

function applyDriveQuestionarios(
  rows: QuestionarioRow[],
  files: DriveFile[]
): QuestionarioRow[] {
  return rows.map((row) => {
    const next = { ...row };

    for (const file of files) {
      if (!matchesPublico(file.name, row.publico)) continue;

      const name = fold(file.name);
      const isFinal = name.includes("final");
      const isInicial = name.includes("inicial");
      if (!isFinal && !isInicial) continue;

      const excel = isExcelFile(file);
      const pdf = isPdfFile(file);

      if (isInicial && pdf) next.inicialPdf = file.url;
      else if (isInicial && excel) next.inicialXlsx = file.url;
      else if (isFinal && pdf) next.finalPdf = file.url;
      else if (isFinal && excel) next.finalXlsx = file.url;
    }

    return next;
  });
}

function FileButton({
  href,
  isExcel = false,
}: {
  href: string;
  isExcel?: boolean;
}) {
  if (!href || href === "#") {
    return (
      <span style={{ color: "#94a3b8", fontSize: 11 }}>Indisponível</span>
    );
  }

  const btnClass = isExcel
    ? "btn-aceder-sm btn-aceder-green"
    : "btn-aceder-sm";
  const iconClass = isExcel ? "fa-solid fa-file-excel" : "fa-solid fa-file-pdf";
  const label = isExcel ? "Excel" : "PDF";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={btnClass}
    >
      <i className={iconClass} /> {label}
    </a>
  );
}

export function QuestionariosPanel() {
  const analise = useDriveFiles("analise");
  const questionarios = useDriveFiles("questionarios");

  const fallbackFiles: ListedFile[] = ANALISE_RESULTADOS.map((row) => ({
    id: row.documento,
    name: row.documento,
    url: row.ficheiro,
  }));

  const analiseReady = analise.configured && !analise.error;
  const listed: ListedFile[] = analiseReady
    ? analise.files.map((f) => ({ id: f.id, name: f.name, url: f.url }))
    : !analise.loading
      ? fallbackFiles
      : [];

  const questionarioRows =
    questionarios.configured &&
    !questionarios.error &&
    questionarios.files.length > 0
      ? applyDriveQuestionarios(QUESTIONARIOS, questionarios.files)
      : QUESTIONARIOS;

  return (
    <div className="content-view" id="panel-pilotagem-questionarios">
      <h2 className="content-heading-1">Questionários de Avaliação</h2>
      <p className="content-text" style={{ marginBottom: 12 }}>
        Aceda aos formulários de questionário (PDF) e aos respetivos dados das
        respostas recolhidas (.XLSX):
      </p>

      <div className="table-responsive-container" style={{ marginBottom: 36 }}>
        {questionarios.loading && (
          <div className="table-loader">
            A carregar questionários do Google Drive...
          </div>
        )}

        {!questionarios.loading && (
          <table className="dynamic-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Público</th>
                <th style={{ width: "18.5%", textAlign: "center" }}>
                  Q. Inicial (PDF)
                </th>
                <th style={{ width: "18.5%", textAlign: "center" }}>
                  Respostas Inicial (XLSX)
                </th>
                <th style={{ width: "18.5%", textAlign: "center" }}>
                  Q. Final (PDF)
                </th>
                <th style={{ width: "18.5%", textAlign: "center" }}>
                  Respostas Final (XLSX)
                </th>
              </tr>
            </thead>
            <tbody>
              {questionarioRows.map((row) => (
                <tr key={row.publico}>
                  <td>
                    <strong>{row.publico}</strong>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FileButton href={row.inicialPdf} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FileButton href={row.inicialXlsx} isExcel />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FileButton href={row.finalPdf} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FileButton href={row.finalXlsx} isExcel />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h2 className="content-heading-1">Análise de Resultados</h2>
      <p className="content-text" style={{ marginBottom: 12 }}>
        Consulte os relatórios analíticos dos inquéritos aplicados aos docentes
        e alunos:
      </p>

      <div className="table-responsive-container">
        {analise.loading && (
          <div className="table-loader">
            A carregar relatórios do Google Drive...
          </div>
        )}

        {!analise.loading && listed.length === 0 && (
          <div className="table-loader">
            {analise.error
              ? `Drive indisponível: ${analise.error}. A mostrar lista local.`
              : "Nenhum relatório encontrado na pasta do Drive."}
          </div>
        )}

        {!analise.loading && listed.length > 0 && (
          <table className="dynamic-table">
            <thead>
              <tr>
                <th>Relatório de Análise</th>
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
                      <i className="fa-solid fa-arrow-up-right-from-square" />{" "}
                      Aceder
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
