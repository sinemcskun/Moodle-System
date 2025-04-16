import * as React from "react"
import { cn } from "@/lib/utils" // Eğer shadcn/ui kullanıyorsanız

// Card Component Props
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

// CardContent Component Props
type CardContentProps = React.HTMLAttributes<HTMLDivElement>

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6", className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardContent }