
type GlowOrbProps = {
    className?: string;
}

export function GlowOrb({ className = "" }: GlowOrbProps) {
    return <div className={`absolute rounded-full blur-3xl ${className}`} />;
}