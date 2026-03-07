"use client"

import { cn } from "@/shared/lib/utils";

type GridPatternProps = {
  className?: string;
  size?: number;
  opacity?: number;
  lineOpacity?: number;
  fade?: boolean;
}

export function GridPattern({
  className = "",
  size = 42,
  opacity = 0.3,
  lineOpacity = 0.2,
  fade = true,
}: GridPatternProps) {
  return (
    <div
      className={cn("absolute inset-0", fade ? "mask-[radial-gradient(circle_at_center,black,transparent_85%)]" : "", className)}
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(196,181,253,${lineOpacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,${lineOpacity}) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          backgroundOrigin: "border-box",
        }}
      />
    </div>
  );
}