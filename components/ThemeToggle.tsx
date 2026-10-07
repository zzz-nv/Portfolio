"use client";

import { useEffect, useRef, useState } from "react";

export function ThemeToggle() {
  const busy = useRef(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

      function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    if (busy.current) return;
    busy.current = true;
    setTimeout(() => { busy.current = false; }, 1500);

    const root = document.documentElement;
    const next = theme === "light" ? "dark" : "light";
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const commit = () => {
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setTheme(next);
    };

    const isFirefox = /Firefox|FxiOS/.test(navigator.userAgent);

    // Firefox: manual DOM overlay, since View Transitions can't animate
    // clip-path on its pseudo-elements in Firefox.
    if (isFirefox) {
      const oldBg = getComputedStyle(root).getPropertyValue("--background").trim();
      const oldBgLayer = getComputedStyle(root).getPropertyValue("--bg-layer").trim();

      const overlay = document.createElement("div");
      overlay.id = "theme-overlay";
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.zIndex = "40";
      overlay.style.pointerEvents = "none";
      overlay.style.backgroundColor = oldBg;
      if (oldBgLayer) {
        overlay.style.backgroundImage = oldBgLayer;
        overlay.style.backgroundAttachment = "fixed";
      }
      overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      // Swap theme on the page (overlay covers it, so no visible flash)
      commit();

      // Shrink the overlay's circle toward the click point, revealing new theme
      const anim = overlay.animate(
        [
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
          { clipPath: `circle(0px at ${x}px ${y}px)` },
        ],
        {
          duration: 1200,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );

      anim.onfinish = () => overlay.remove();
      return;
    }

    // Chrome / Edge / Safari: View Transitions
    if (!document.startViewTransition) {
      commit();
      return;
    }

    const transition = document.startViewTransition(commit);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1200,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

    return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-16 h-16 cursor-pointer p-0 border-0 bg-transparent"
    >
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full block"
        shapeRendering="geometricPrecision"
      >
        {/* Base disc — always visible, gives the button its own material */}
        <circle
          cx="32"
          cy="32"
          r="30"
          style={{ fill: theme === "light" ? "var(--background)" : "#212123" }}
        />

        {/* Water fill — expands from center with the new theme color */}
        <circle
          key={theme}
          cx="32"
          cy="32"
          r="30"
          className="animate-water-fill"
          style={{ fill: theme === "light" ? "#ffffff" : "#161618" }}
        />

        {/* Ring — SVG stroke renders clean arcs */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/40"
        />
      </svg>
    </button>
  );
}