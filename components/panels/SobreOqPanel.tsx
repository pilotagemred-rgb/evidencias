import { VimeoEmbed } from "@/components/VimeoEmbed";

export function SobreOqPanel() {
  return (
    <div className="content-view" id="panel-sobre-oq">
      <h2 className="content-heading-1">O que é?</h2>
      <p className="content-text">
        Informações sobre o ecossistema EA e os seus principais objetivos
        pedagógicos.
      </p>
      <VimeoEmbed
        src="https://player.vimeo.com/video/1214505800?h=89a337f1e1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
        title="Video 1_Guia de utilização EA"
      />
    </div>
  );
}
