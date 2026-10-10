export function BackToTop() {
  return (
    <div className="flex justify-center mb-4">
      <a
        href="#top"
        aria-label="Back to top"
        className="group inline-flex items-center justify-center w-8 h-8 text-white [[data-theme=light]_&]:text-black hover:opacity-70 transition-opacity"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
    </div>
  );
}