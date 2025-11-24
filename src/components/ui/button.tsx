import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-[0.2em] ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu hover:scale-[1.05] active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-[#CC232A] text-white shadow-[0_20px_45px_rgba(204,35,42,0.35)] hover:bg-[#b31e25]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[#1A1A40] text-[#1A1A40] bg-transparent hover:border-[#CC9902] hover:text-[#CC9902]",
        secondary:
          "bg-white/10 text-white border border-white/40 hover:border-[#CC9902] hover:text-[#CC9902]",
        ghost:
          "text-[#1A1A40] hover:text-[#CC9902] hover:bg-[#CC9902]/10",
        link:
          "text-[#007FA3] tracking-[0.3em] uppercase hover:text-[#CC232A]",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
