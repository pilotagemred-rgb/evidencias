import { getAppOrigin } from "@/lib/origin";

const FRAME_ID = "red-doc-frame";

export default async function MirrorEntryPage() {
  const origin = await getAppOrigin();
  const hubUrl = `${origin}/hub`;

  return (
    <>
      <iframe
        id={FRAME_ID}
        title="RED - Documentação"
        src={hubUrl}
        allow="fullscreen; autoplay; clipboard-write"
        style={{
          width: "100%",
          height: "100vh",
          minHeight: 960,
          border: 0,
          display: "block",
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var f=document.getElementById("${FRAME_ID}");if(!f)return;window.addEventListener("message",function(e){if(!e.data||e.data.type!=="red-doc-frame-height")return;var h=Number(e.data.height);if(h>0)f.style.height=h+"px";});})();`,
        }}
      />
    </>
  );
}
