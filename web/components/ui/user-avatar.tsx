import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-[13px]",
  lg: "h-14 w-14 text-xl",
};

export function UserAvatar({ src, name, size = "md", className }: UserAvatarProps) {
  const initial = (name || "?")[0].toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={cn(
          "shrink-0 rounded-full object-cover",
          SIZES[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 font-bold text-white uppercase",
        SIZES[size],
        className
      )}
    >
      {initial}
    </div>
  );
}
