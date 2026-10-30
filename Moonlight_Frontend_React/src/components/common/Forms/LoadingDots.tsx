interface LoadingDotsProps {
    color?: "light" | "dark";
}

export function LoadingDots({ color = "light" }: LoadingDotsProps) {
    const dotColor = color === "dark" ? "bg-base" : "bg-gray-500";
    return (
        <span className="flex gap-1">
            {[0, 1, 2].map((index) => (
                <span
                    key={index}
                    className={`w-1.5 h-1.5 ${dotColor} rounded-full animate-bounce`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                />
            ))}
        </span>
    );
}
