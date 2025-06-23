import React from "react";

interface ChannelLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ChannelLogo({ className, size = "md" }: ChannelLogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {/* Microphone */}
        <div className="relative">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${sizeClasses[size]} w-auto`}
          >
            {/* Base */}
            <ellipse cx="100" cy="180" rx="30" ry="10" fill="#6D28D9" />

            {/* Stand */}
            <rect x="97" y="120" width="6" height="60" fill="#6D28D9" />

            {/* Microphone body */}
            <rect
              x="70"
              y="30"
              width="60"
              height="90"
              rx="30"
              fill="#000"
              stroke="#000"
              strokeWidth="4"
            />

            {/* Microphone inner */}
            <rect x="80" y="40" width="40" height="70" rx="20" fill="#8B5CF6" />

            {/* Microphone lines */}
            {[0, 1, 2, 3, 4, 5, 6].map((i, index) => (
              <rect
                key={i}
                x="85"
                y={50 + i * 10}
                width="30"
                height="2"
                fill="#000"
                fillOpacity="0.3"
              />
            ))}

            {/* Top details */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
              <rect
                key={i}
                x={82 + i * 4}
                y="30"
                width="2"
                height="10"
                fill="#8B5CF6"
              />
            ))}

            {/* Side details */}
            <ellipse cx="65" cy="75" rx="5" ry="15" fill="#8B5CF6" />

            <ellipse cx="135" cy="75" rx="5" ry="15" fill="#8B5CF6" />
          </svg>
        </div>
      </div>
      <div className="ml-2 font-bold text-2xl">
        <span className="text-black dark:text-white">Lancei</span>{" "}
        <span className="text-black dark:text-white">Essa</span>
      </div>
    </div>
  );
}

export default ChannelLogo;
