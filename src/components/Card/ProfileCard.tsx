import React from "react";
import Card from "./Card";

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarSrc?: string;
  initials?: string;
  actions?: React.ReactNode;
  elevation?: "flat" | "raised" | "glass";
  className?: string;
}

export default function ProfileCard({
  name,
  role,
  avatarSrc,
  initials,
  actions,
  elevation = "glass",
  className = "",
}: ProfileCardProps) {
  const displayInitials = initials || name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <Card elevation={elevation} className={`profile-card relative overflow-hidden ${className}`}>
      {/* Decorative background element for glass effect */}
      {elevation === "glass" && (
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="profile-card-header flex items-center gap-4 mb-5 relative z-10">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="w-14 h-14 rounded-full border-2 border-background object-cover shadow-sm"
          />
        ) : (
          <div className="w-14 h-14 rounded-full border-2 border-background bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
            {displayInitials}
          </div>
        )}
        <div className="profile-card-meta">
          <h4 className="profile-card-name font-headline-sm text-headline-sm text-on-background leading-tight">
            {name}
          </h4>
          <p className="profile-card-role font-body-sm text-body-sm text-text-secondary">
            {role}
          </p>
        </div>
      </div>

      {actions && (
        <div className="profile-card-actions flex gap-2 relative z-10">
          {actions}
        </div>
      )}
    </Card>
  );
}
