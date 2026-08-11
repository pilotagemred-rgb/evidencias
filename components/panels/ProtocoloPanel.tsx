import { PROTOCOLO_PDF } from "@/lib/staticData";

export function ProtocoloPanel() {
  return (
    <div className="content-view" id="panel-pilotagem-protocolo">
      <h2 className="content-heading-1">Protocolo de Pilotagem</h2>
      <p className="content-text" style={{ marginBottom: 20 }}>
        Consulte ou transfira o documento oficial do Protocolo de Pilotagem no
        botão abaixo:
      </p>
      <div>
        <a
          href={PROTOCOLO_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-aceder-pill"
        >
          <i className="fa-solid fa-file-pdf" style={{ marginRight: 8 }} />
          Aceder ao Protocolo (PDF)
        </a>
      </div>
    </div>
  );
}
