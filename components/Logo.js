export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0F1A3D" />
      <path d="M9 22V10l14 12V10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="2.2" fill="#FFB84D" />
      <circle cx="23" cy="10" r="2.2" fill="#0FB5A5" />
    </svg>
  );
}
