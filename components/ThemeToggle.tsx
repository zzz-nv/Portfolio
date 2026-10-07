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

      // Circle div sized to cover the viewport from the click point.
      // We animate transform: scale (GPU-composited) instead of clip-path,
      // because Firefox rasterizes clip-path every frame.
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.left = `${x - endRadius}px`;
      overlay.style.top = `${y - endRadius}px`;
      overlay.style.width = `${endRadius * 2}px`;
      overlay.style.height = `${endRadius * 2}px`;
      overlay.style.borderRadius = "50%";
      overlay.style.zIndex = "40";
      overlay.style.pointerEvents = "none";
      overlay.style.transformOrigin = "center";
      overlay.style.backgroundColor = oldBg;

      // Stars live on an inner div pinned to the viewport so they align
      // with the page behind, regardless of the outer circle's position.
      if (oldBgLayer && oldBgLayer !== "none") {
        const starLayer = document.createElement("div");
        starLayer.style.position = "absolute";
        starLayer.style.left = `${-(x - endRadius)}px`;
        starLayer.style.top = `${-(y - endRadius)}px`;
        starLayer.style.width = "100vw";
        starLayer.style.height = "100vh";
        starLayer.style.backgroundImage = oldBgLayer;
        starLayer.style.backgroundAttachment = "fixed";
        overlay.appendChild(starLayer);
      }

      document.body.appendChild(overlay);

      // Swap theme on the real page underneath
      commit();

      const anim = overlay.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0)" },
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
      className="group absolute top-6 left-1/2 -translate-x-1/2 z-50 w-12 h-12 md:w-16 md:h-16 cursor-pointer p-0 border-0 bg-transparent"
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
          className="text-foreground/40 group-hover:text-foreground/70 transition-colors"
        />
      </svg>
    </button>
  );
}