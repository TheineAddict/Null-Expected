import type { LucideIcon } from 'lucide-react';

type IconBadgeProps = {
  icon: LucideIcon;
  variant?: 'strong' | 'soft' | 'inline';
  size?: 'medium' | 'large';
  /** Provide only when the icon conveys information not otherwise available to screen readers. */
  accessibleLabel?: string;
};

const IconBadge = ({
  icon: Icon,
  variant = 'soft',
  size = 'medium',
  accessibleLabel,
}: IconBadgeProps) => {
  const variantClass = `site-icon-badge-${variant}`;
  const sizeClass = variant === 'inline' ? '' : `site-icon-badge-${size}`;

  return (
    <span
      className={`site-icon-badge ${variantClass} ${sizeClass}`}
      role={accessibleLabel ? 'img' : undefined}
      aria-label={accessibleLabel}
      aria-hidden={accessibleLabel ? undefined : true}
    >
      <Icon className="site-icon-badge-glyph" />
    </span>
  );
};

export default IconBadge;
