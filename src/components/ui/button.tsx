import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "social";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        "bg-[#02563d] text-white hover:bg-[#034d35] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
      secondary:
        "bg-[#f5f5f5] text-[#171717] hover:bg-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
      ghost: "bg-transparent text-[#02563d] hover:bg-[#f5f5f5]",
      social:
        "bg-white border border-[rgba(0,0,0,0.1)] text-neutral-950 hover:bg-[#f5f5f5]",
    };

    const sizes = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-6 py-3 text-base",
    };

    const Comp = asChild ? React.Fragment : "button";
    const childProps = asChild ? {} : { ref, ...props };

    const className_final = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#02563d] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className
    );

    if (asChild && React.Children.count(props.children) === 1) {
      const child = React.Children.only(props.children) as React.ReactElement;
      return React.cloneElement(child, {
        className: cn(className_final, child.props.className),
        ref,
      });
    }

    return (
      <Comp {...childProps}>
        <button
          className={className_final}
          ref={asChild ? undefined : ref}
          {...props}
        />
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
