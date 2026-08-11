import { VimeoEmbed } from "@/components/VimeoEmbed";

export function SobreSasPanel() {
  return (
    <div className="content-view" id="panel-sobre-sas">
      <h2 className="content-heading-1">SAs e Atividades</h2>
      <p className="content-text">
        Detalhamento da estrutura das Sequências de Aprendizagem (SA) e tipos de
        atividades disponíveis.
      </p>
      <VimeoEmbed
        src="https://player.vimeo.com/video/1214505914?h=e786957d6b&badge=0&autopause=0&player_id=0&app_id=58479"
        title="Video 2_Guia de utilização SAs"
      />
    </div>
  );
}
