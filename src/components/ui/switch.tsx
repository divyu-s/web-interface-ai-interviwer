"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked = false, onCheckedChange, disabled = false, label, className },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={handleClick}
      >
        {label && (
          <span className="text-xs text-[#0a0a0a] flex-1">{label}</span>
        )}
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#02563d] focus-visible:ring-offset-2",
            checked ? "bg-[#02563d]" : "bg-[#e5e5e5]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform",
              checked ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };

