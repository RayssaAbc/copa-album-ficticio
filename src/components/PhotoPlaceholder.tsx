import { Camera, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square" | "rounded";
  label?: string;
  className?: string;
  locked?: boolean;
}

const sizeMap = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

const iconSizeMap = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
  xl: "size-10",
};

export function PhotoPlaceholder({
  src,
  alt = "Foto",
  size = "md",
  shape = "circle",
  label,
  className,
  locked,
}: PhotoPlaceholderProps) {
  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "square"
        ? "rounded-none"
        : "rounded-xl";

  if (locked) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-neutral-800 text-neutral-500 border-2 border-neutral-700",
          sizeMap[size],
          shapeClass,
          className,
        )}
        aria-label="Bloqueado"
      >
        <Lock className={iconSizeMap[size]} />
      </div>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "object-cover border-2 border-border",
          sizeMap[size],
          shapeClass,
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed border-border bg-muted/50 text-muted-foreground",
        sizeMap[size],
        shapeClass,
        className,
      )}
    >
      <Camera className="size-4 opacity-60" />
      {label && (
        <span className="text-[10px] leading-tight mt-1 text-center px-1">
          {label}
        </span>
      )}
    </div>
  );
}
