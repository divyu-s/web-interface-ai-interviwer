import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  label?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  id?: string
  className?: string
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, checked = false, onCheckedChange, id, className }, ref) => {
    return (
      <div className={cn("flex items-start gap-2", className)}>
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={checked}
          id={id}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-[#02563d] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#02563d] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-[#02563d] text-white" : "bg-white"
          )}
        >
          {checked && (
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          )}
        </button>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-normal leading-5 text-[#0a0a0a] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }


