import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  active?: boolean;
  to?: string;
  children: React.ReactNode;
}

export function BrandButton({
  className,
  variant = "default",
  size = "default",
  active = false,
  to,
  children,
  ...props
}: BrandButtonProps) {
  // Base classes for all variants
  const baseClasses = cn(
    "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    {
      // Active state classes for different variants
      "bg-violet-600 text-white hover:bg-violet-700":
        variant === "default" && active,
      "border-violet-600 text-violet-600 hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950":
        variant === "outline" && active,
      "bg-violet-100 text-violet-900 dark:bg-violet-900 dark:text-violet-100":
        variant === "ghost" && active,
    },
    className
  );

  // If a 'to' prop is provided, render as a Link
  if (to) {
    return (
      <Button
        variant={variant}
        size={size}
        className={baseClasses}
        asChild
        {...props}
      >
        <Link to={to}>{children}</Link>
      </Button>
    );
  }

  // Otherwise, render as a regular button
  return (
    <Button variant={variant} size={size} className={baseClasses} {...props}>
      {children}
    </Button>
  );
}
