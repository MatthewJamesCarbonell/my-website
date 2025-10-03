import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        success:
          "bg-emerald-500 text-white hover:bg-emerald-500/90 focus-visible:ring-emerald-500/30 dark:bg-emerald-500/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        cta:
          "group relative overflow-hidden bg-[linear-gradient(140deg,#4338ca,35%,#0ea5e9)] text-primary-foreground shadow-[0_18px_40px_-18px_rgba(14,165,233,0.65)] transition-[transform,shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-18px_rgba(14,165,233,0.75)] active:translate-y-0 after:absolute after:inset-0 after:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] after:-translate-x-full after:transition-transform after:duration-500 after:ease-out group-hover:after:translate-x-full before:absolute before:inset-[-1px] before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_58%)] before:opacity-70 before:transition-opacity before:duration-300 before:pointer-events-none group-hover:before:opacity-90",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        cta: "h-12 rounded-lg px-7 text-[1.05rem] font-semibold tracking-tight",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
