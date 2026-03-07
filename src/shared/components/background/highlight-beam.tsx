"use client"

type HighlightBeamProps = {
    className?: string;
}

export function HighlightBeam({ className = "" }: HighlightBeamProps) {
    return (
        <div
            className={`absolute left-1/2 top-0 h-full w-xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(216,180,254,0.13),transparent_55%)] blur-2xl ${className}`}
        />
    );
}
