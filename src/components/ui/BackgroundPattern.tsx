import { cn } from "@/lib/utils";

interface BackgroundPatternProps {
  opacity?: number;
  className?: string;
}

export const BackgroundPattern = ({ opacity = 0.12, className }: BackgroundPatternProps) => (
  <div
    aria-hidden="true"
    className={cn("absolute inset-0 pointer-events-none", className)}
    style={{
      backgroundImage:
        "radial-gradient(#CC9902 1.5px, transparent 1.5px), radial-gradient(#CC9902 1.5px, transparent 1.5px)",
      backgroundSize: "30px 30px",
      backgroundPosition: "0 0, 15px 15px",
      opacity,
    }}
  />
);
