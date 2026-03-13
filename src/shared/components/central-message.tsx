export function CentralMessage({ message }: { message: string }) {
    return (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
            {message}
        </div>
    )
}