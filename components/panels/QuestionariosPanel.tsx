import { ANALISE_RESULTADOS, QUESTIONARIOS } from "@/lib/staticData";

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
  return (
    <div className="content-view" id="panel-pilotagem-questionarios">
      <h2 className="content-heading-1">Questionários de Avaliação</h2>
      <p className="content-text" style={{ marginBottom: 12 }}>
        Aceda aos formulários de questionário (PDF) e aos respetivos dados das
        respostas recolhidas (.XLSX):
      </p>

      <div className="table-responsive-container" style={{ marginBottom: 36 }}>
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
            {QUESTIONARIOS.map((row) => (
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
      </div>

      <h2 className="content-heading-1">Análise de Resultados</h2>
      <p className="content-text" style={{ marginBottom: 12 }}>
        Consulte os relatórios analíticos dos inquéritos aplicados aos docentes
        e alunos:
      </p>

      <div className="table-responsive-container">
        <table className="dynamic-table">
          <thead>
            <tr>
              <th>Relatório de Análise</th>
              <th style={{ textAlign: "center", width: 150 }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {ANALISE_RESULTADOS.map((row) => (
              <tr key={row.documento}>
                <td>
                  <strong>{row.documento}</strong>
                </td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={row.ficheiro}
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
      </div>
    </div>
  );
}
