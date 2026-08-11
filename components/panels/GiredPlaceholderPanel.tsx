type GiredPlaceholderPanelProps = {
  id: string;
  title: string;
  description: string;
};

export function GiredPlaceholderPanel({
  id,
  title,
  description,
}: GiredPlaceholderPanelProps) {
  return (
    <div className="content-view" id={id}>
      <h2 className="content-heading-1">{title}</h2>
      <p className="content-text">{description}</p>
    </div>
  );
}
