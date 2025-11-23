export const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
    <svg width="100%" height="100%">
      <pattern id="chinese-lattice" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 0h40v40H0z" fill="none" />
        <path d="M20 0v40M0 20h40" stroke="currentColor" strokeWidth="1" />
        <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(45 20 20)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#chinese-lattice)" />
    </svg>
  </div>
);
