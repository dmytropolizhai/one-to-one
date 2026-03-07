"use client"

type NoiseOverlayProps = {
    className?: string;
}

export function NoiseOverlay({ className = "" }: NoiseOverlayProps) {
    return (
        <div
            className={`absolute inset-0 opacity-[0.06] mix-blend-screen ${className}`}
            style={{
                backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1.1\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"1\"/></svg>')",
            }}
        />
    );
}
