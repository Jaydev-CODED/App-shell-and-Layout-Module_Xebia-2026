import Card from "./Card";

export interface NewsCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  tag?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function NewsCard({
  title,
  description,
  imageSrc,
  tag,
  actionText = "Read Full Report",
  onActionClick,
  className = "",
}: NewsCardProps) {
  return (
    <Card
      elevation="raised"
      className={`news-card overflow-hidden flex flex-col p-0 ${className}`}
      style={{ padding: 0 }} // Remove default card padding to cover header image
    >
      {imageSrc && (
        <div className="news-card-image-wrapper h-32 w-full bg-surface-container-low relative">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          {tag && (
            <div className="news-card-tag absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
              <span className="font-label-sm text-label-sm text-primary">{tag}</span>
            </div>
          )}
        </div>
      )}

      <div className="news-card-body p-5 flex-1 flex flex-col">
        <h4 className="news-card-title font-headline-sm text-headline-sm text-on-background mb-2 line-clamp-1">
          {title}
        </h4>
        <p className="news-card-description font-body-sm text-body-sm text-text-secondary mb-4 line-clamp-2 flex-1">
          {description}
        </p>
        <button
          type="button"
          onClick={onActionClick}
          className="news-card-action text-primary font-label-md text-label-md flex items-center gap-1 hover:text-primary-hover w-fit bg-transparent border-none cursor-pointer p-0"
        >
          {actionText}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>
    </Card>
  );
}
