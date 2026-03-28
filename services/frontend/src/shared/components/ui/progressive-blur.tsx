"use client"

import React from "react"
import { cn } from "@/shared/lib/utils"

export interface ProgressiveBlurProps {
  className?: string
  height?: string | number
  position?: "top" | "bottom" | "both"
  blurLevels?: number[]
  opacity?: number
}

export function ProgressiveBlur({
  className,
  height = "100%",
  position = "top",
  blurLevels = [1, 2, 4, 8, 12, 16, 24, 32],
  opacity = 1,
}: ProgressiveBlurProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-0 overflow-hidden",
        position === "top" && "top-0",
        position === "bottom" && "bottom-0",
        position === "both" && "inset-y-0",
        className
      )}
      style={{
        height: position === "both" ? "100%" : height,
        opacity,
      } as React.CSSProperties}
    >
      {blurLevels.map((blur, i) => {
        const step = i + 1
        const total = blurLevels.length

        // This creates a mask that "opens up" as we go through layers
        // For 'top', layer 1 blurs 0-12.5%, layer 2 12.5-25% etc.
        const start = (i / total) * 100
        const end = ((i + 1) / total) * 100

        let mask = ""
        if (position === "top") {
          mask = `linear-gradient(to bottom, rgba(0,0,0,1) ${start}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${end + 15}%)`
        } else if (position === "bottom") {
          mask = `linear-gradient(to top, rgba(0,0,0,1) ${start}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${end + 15}%)`
        } else {
          // both: basically masks from edges towards center
          const edgePadding = 5
          mask = `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) ${edgePadding}%, rgba(0,0,0,1) ${100 - edgePadding}%, rgba(0,0,0,0) 100%)`
        }

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
              zIndex: step,
            }}
          />
        )
      })}
    </div>
  )
}

