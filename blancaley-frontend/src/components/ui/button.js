import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 uppercase",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white font-bold hover:bg-orange-500/80 transition ease-in-out duration-500",
        primary: "bg-white text-orange-500 border border-orange-500 font-bold hover:text-white hover:bg-orange-500/80 transition easi-in-out duration-500",
        secondary:
          "bg-orange-500 text-white font-bold hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition ease-in-out duration-500",
        tertiary: "border border-orange-500 text-orange-500 font-bold hover:bg-orange-500/80 hover:text-white transition ease-in-out duration-500",
        outline:
          "border border-input border-orange-500 text-orange-500 font-bold bg-transparent hover:bg-white hover:text-orange-500 transition ease-in-out duration-500",
        ghost: "hover:bg-orange-500/50 hover:text-white transition ease-in-out duration-500",
        destructive:
          "bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90 transition ease-in-out duration-500",
        link: "text-primary underline-offset-4 hover:underline transition ease-in-out duration-500",
        pagination: "border border-orange-500 text-orange-500 transition ease-in-out duration-500"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
