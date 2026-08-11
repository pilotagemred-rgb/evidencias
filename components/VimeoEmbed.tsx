type VimeoEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

export function VimeoEmbed({ src, title, className }: VimeoEmbedProps) {
  return (
    <div
      className={className}
      style={{
        padding: "56.25% 0 0 0",
        position: "relative",
        marginTop: className ? undefined : 20,
      }}
    >
      <iframe
        src={src}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
        title={title}
        allowFullScreen
      />
    </div>
  );
}
