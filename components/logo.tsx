import { appConfig } from '@/lib/config';

type LogoProps = {
  /** Pixel size of the square icon mark. */
  size?: number;
  /** Show the "ProductFrame AI" wordmark beside the mark. */
  showWordmark?: boolean;
  className?: string;
};

/**
 * ProductFrame AI logo.
 *
 * The mark is a camera viewfinder — four corner brackets that "frame" a solid
 * lens dot in the center. It echoes the product story: the real product stays
 * locked in the middle while the studio is built around it. Brackets inherit
 * `currentColor` so the mark adapts to light/dark surfaces; the lens dot stays
 * brand blue.
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={`${appConfig.name} logo`}
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H6a2 2 0 0 0-2 2v5" />
        <path d="M21 4h5a2 2 0 0 1 2 2v5" />
        <path d="M11 28H6a2 2 0 0 1-2-2v-5" />
        <path d="M21 28h5a2 2 0 0 0 2-2v-5" />
      </g>
      <circle cx="16" cy="16" r="4.5" fill="#2563eb" />
    </svg>
  );
}

export function Logo({ size = 28, showWordmark = true, className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <LogoMark size={size} className="text-ink" />
      {showWordmark ? (
        <span className="text-lg font-semibold tracking-tight">
          ProductFrame <span className="text-brand">AI</span>
        </span>
      ) : null}
    </span>
  );
}
