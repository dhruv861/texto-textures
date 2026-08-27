"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  name: string;
  loop?: boolean;
  priority?: boolean;
  className?: string;
};

/**
 * Background/decorative video. Non-priority clips ship with only a poster
 * frame until they scroll near the viewport, then load and play; they pause
 * again once scrolled away so off-screen clips don't burn bandwidth or CPU.
 * The `priority` clip (the hero) loads immediately instead.
 */
export default function LazyVideo({
  name,
  loop = true,
  priority = false,
  className,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (priority) {
      const p = video.play();
      p?.catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = `/media/${name}.mp4`;
            video.load();
          }
          const p = video.play();
          p?.catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "600px 0px", threshold: 0.01 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [name, priority]);

  return (
    <video
      ref={videoRef}
      src={priority ? `/media/${name}.mp4` : undefined}
      poster={`/media/${name}.jpg`}
      muted
      loop={loop}
      playsInline
      preload={priority ? "auto" : "none"}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}
