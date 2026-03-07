"use client"

type FlowingMistProps = {
    className?: string;
}

export function FlowingMist({ className = "" }: FlowingMistProps) {
    return (
        <div className={`absolute inset-0 opacity-50 ${className}`}>
            <div className="absolute inset-[-20%] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.05),rgba(192,132,252,0.09),rgba(124,58,237,0.05),rgba(168,85,247,0.05))] blur-3xl animate-[spin_26s_linear_infinite]" />
        </div>
    );
}