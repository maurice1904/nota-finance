import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton – Platzhalter für ladende Inhalte
 * 
 * Verwendung:
 * <Skeleton className="h-4 w-full" />           // Text-Zeile
 * <Skeleton className="h-12 w-12 rounded-xl" /> // Icon Box
 * <Skeleton className="h-48 w-full rounded-2xl" /> // Card
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-surface-100 via-surface-100/50 to-surface-100 rounded-lg",
        className
      )}
    />
  );
}

/**
 * SkeletonCard – Vorgefertigte Card-Skeleton für Feature Cards
 */
export function SkeletonCard() {
  return (
    <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8">
      {/* Icon */}
      <Skeleton className="w-16 h-16 rounded-xl mb-6" />
      
      {/* Title */}
      <Skeleton className="h-7 w-3/4 mb-4" />
      
      {/* Description Lines */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/**
 * SkeletonText – Mehrere Text-Zeilen als Skeleton
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonButton – Button-Platzhalter
 */
export function SkeletonButton({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-10 w-24",
    default: "h-12 w-32",
    lg: "h-14 w-40",
  };

  return <Skeleton className={cn(sizeClasses[size], "rounded-lg")} />;
}

