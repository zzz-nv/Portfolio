"use client";

import { useEffect, useRef } from "react";

export function VideoPreview({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const card = video.closest("li");
    if (!card) return;

    const play = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const stop = () => {
      video.pause();
      video.currentTime = 0;
    };

    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", stop);
    return () => {
      card.removeEventListener("mouseenter", play);
      card.removeEventListener("mouseleave", stop);
    };
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"      />
      <img
        src={poster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
      />
    </div>
  );
}