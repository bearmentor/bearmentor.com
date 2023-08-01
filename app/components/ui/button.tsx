import * as React from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/libs"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-primary bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "border-2 border-destructive bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border-2 border-secondary bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "border-2 border-background hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-base",
        xs: "h-6 rounded px-2 text-xs",
        sm: "h-8 rounded px-3 text-sm",
        lg: "h-10 rounded px-8 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
)
Button.displayName = "Button"

export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: React.ReactNode
  isDisabledWhenLoading?: boolean
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      type = "button",
      variant = "default",
      size = "default",
      className,
      children,
      isLoading = false,
      loadingText = "",
      isDisabledWhenLoading = true,
      name,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        name={name}
        value={value}
        disabled={isDisabledWhenLoading ? isLoading : isDisabledWhenLoading}
        className={cn(
          buttonVariants({ variant, size, className }),
          "flex gap-2",
        )}
        {...props}
      >
        {isLoading && <ReloadIcon className="h-4 w-4 animate-spin" />}
        {isLoading ? loadingText : children}
      </button>
    )
  },
)
ButtonLoading.displayName = "ButtonLoading"

export { Button, ButtonLoading, buttonVariants }
