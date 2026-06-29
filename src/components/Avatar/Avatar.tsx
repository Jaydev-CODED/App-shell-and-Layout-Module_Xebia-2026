import "./Avatar.css";
import { useState } from "react";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}

export default function Avatar({
  src,
  alt = "Avatar",
  initials = "?",
  size = "md",
  className = "",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
  className={`avatar avatar-${size} ${className}`}
  title={alt}
  aria-label={alt}
>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}