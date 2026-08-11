export function Footer() {
  return (
    <footer className="eduqa-layout-footer">
      <div className="footer-inner-container">
        <div className="footer-logos-row">
          <a href="/" className="footer-main-logo">
            <img
              src="https://i.imgur.com/Dc0uBa8.png"
              alt="RED"
              className="logo-red"
            />
          </a>
          <div className="footer-partner-logos-group">
            <p className="funding-statement">
              O GiRED - Gestão Integrada de RED é financiado pelo Plano de
              Recuperação e Resiliência e o NextGenerationEU.
            </p>
            <p className="funding-statement">
              CLPQ 01/2025/DGE
              <br />
              AQUISIÇÃO DE SERVIÇOS PARA O DESENVOLVIMENTO DE RECURSOS
              EDUCATIVOS DIGITAIS PARA O ENSINO BÁSICO NAS ÁREAS DE PORTUGUÊS,
              MATEMÁTICA E CIÊNCIAS.
            </p>
          </div>
        </div>
        <div className="footer-content-row">
          <div className="footer-info-block">
            <div className="footer-funding-section">
              <div className="funding-inline-logos">
                <img
                  src="https://i.imgur.com/CgbUEwi.png"
                  alt="PRR"
                  className="funding-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
