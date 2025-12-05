import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium",
        variant === "default" && "bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] text-white",
        className
      )}
      {...props}
    />
  )
}

export { Badge }


