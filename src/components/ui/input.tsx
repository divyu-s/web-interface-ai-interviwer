import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-medium text-[#0a0a0a]">{label}</label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-lg border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#737373] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#02563d] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
