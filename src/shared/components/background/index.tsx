import { FlowingMist } from "./flowing-mist";
import { GlowOrb } from "./glow-orb";
import { GridPattern } from "./grid-pattern";
import { HighlightBeam } from "./highlight-beam";
import { NoiseOverlay } from "./noise-overlay";

import "./styles/background.css"

export default function Background() {
    return (
        <div
            className="
      pointer-events-none fixed inset-0 -z-10 overflow-hidden
      bg-background
    "
        >
            {/* Base gradient */}
            <div
                className="
        absolute inset-0
        bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_bottom,hsl(var(--secondary)/0.06),transparent_30%),linear-gradient(to_bottom,#ffffff,#faf7ff,#f3efff)]
        dark:bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_35%),radial-gradient(circle_at_bottom,hsl(var(--secondary)/0.14),transparent_30%),linear-gradient(to_bottom,#07030f,#0a0614,#05030a)]
      "
            />

            <GlowOrb className="-left-24 top-[-8%] h-24 w-24 bg-[hsl(var(--primary)/0.15)] dark:bg-[hsl(var(--primary)/0.25)] animate-[blobFloat_18s_ease-in-out_infinite]" />
            <GlowOrb className="right-[-10%] top-[18%] h-24 w-24 bg-[hsl(var(--secondary)/0.15)] dark:bg-[hsl(var(--secondary)/0.25)] animate-[blobFloat_20s_ease-in-out_infinite_reverse]" />
            <GlowOrb className="bottom-[-12%] left-[18%] h-24 w-24 bg-[hsl(var(--primary)/0.12)] dark:bg-[hsl(var(--primary)/0.20)] animate-[blobFloat_22s_ease-in-out_infinite]" />
            <GlowOrb className="bottom-[8%] right-[12%] h-24 w-24 bg-[hsl(var(--secondary)/0.12)] dark:bg-[hsl(var(--secondary)/0.18)] animate-[blobFloat_16s_ease-in-out_infinite_reverse]" />

            <FlowingMist />
            <GridPattern />
            <HighlightBeam />
            <NoiseOverlay />
        </div>
    )
}

export { FlowingMist, GlowOrb, GridPattern, HighlightBeam, NoiseOverlay }