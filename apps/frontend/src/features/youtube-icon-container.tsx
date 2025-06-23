import React from "react";
import { YoutubeIcon } from "lucide-react";

interface YoutubeIconContainerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function YoutubeIconContainer({
  size = "lg",
  className,
}: YoutubeIconContainerProps) {
  const containerSizes = {
    sm: "p-2",
    md: "p-2.5",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex justify-center ${className || ""}`}>
      <div
        className={`${containerSizes[size]} bg-red-100 dark:bg-red-900/30 rounded-full`}
      >
        <YoutubeIcon
          className={`${iconSizes[size]} text-red-600 dark:text-red-500`}
        />
      </div>
    </div>
  );
}
