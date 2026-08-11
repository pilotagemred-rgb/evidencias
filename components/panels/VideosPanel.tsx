import { VimeoEmbed } from "@/components/VimeoEmbed";

const VIDEOS = [
  {
    title: "Docentes",
    icon: "fa-solid fa-chalkboard-user",
    src: "https://player.vimeo.com/video/1206390675?h=76f2ac31e1&badge=0&autopause=0&player_id=0&app_id=58479",
    iframeTitle: "VIDEO 1 - Docentes",
  },
  {
    title: "Alunos 1.º Ciclo",
    icon: "fa-solid fa-child-reaching",
    src: "https://player.vimeo.com/video/1206390701?h=649ac39acc&badge=0&autopause=0&player_id=0&app_id=58479",
    iframeTitle: "VIDEO 2 - 1º ciclo",
  },
  {
    title: "Alunos 2.º Ciclo",
    icon: "fa-solid fa-graduation-cap",
    src: "https://player.vimeo.com/video/1206390744?h=9a3afa6e71&badge=0&autopause=0&player_id=0&app_id=58479",
    iframeTitle: "VIDEO 3 - 2do ciclo",
  },
  {
    title: "Alunos 3.º Ciclo",
    icon: "fa-solid fa-user-graduate",
    src: "https://player.vimeo.com/video/1206390737?h=248fb3d434&badge=0&autopause=0&player_id=0&app_id=58479",
    iframeTitle: "VIDEO 4 - 3r ciclo",
  },
];

export function VideosPanel() {
  return (
    <div className="content-view" id="panel-pilotagem-videos">
      <h2 className="content-heading-1">Vídeos Introdutórios</h2>
      <p className="content-text">
        Assista aos vídeos abaixo para entender melhor a importância dos
        Recursos Educativos Digitais!
      </p>

      <div className="videos-grid-container">
        {VIDEOS.map((video) => (
          <div key={video.title} className="video-card-item">
            <h3 className="video-card-title">
              <i className={video.icon} /> {video.title}
            </h3>
            <div className="vimeo-wrapper">
              <VimeoEmbed
                src={video.src}
                title={video.iframeTitle}
                className="vimeo-embed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
