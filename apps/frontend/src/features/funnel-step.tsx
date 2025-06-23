import React from "react";
import { cn } from "@/lib/utils";

interface FunnelStepProps {
  id: string;
  name: string;
  value: number;
  description: string;
  icon: React.ElementType;
  color: string;
  percentage?: number;
  index: number;
  isFirst: boolean;
  relativeWidth?: number;
}

const colorVariants = {
  blue: "bg-blue-500 text-white",
  green: "bg-green-500 text-white",
  amber: "bg-amber-500 text-white",
  purple: "bg-purple-500 text-white",
  emerald: "bg-emerald-500 text-white",
};

const iconBackgroundVariants = {
  blue: "bg-blue-100 text-blue-500",
  green: "bg-green-100 text-green-500",
  amber: "bg-amber-100 text-amber-500",
  purple: "bg-purple-100 text-purple-500",
  emerald: "bg-emerald-100 text-emerald-500",
};

export function FunnelStep({
  id,
  name,
  value,
  description,
  icon: Icon,
  color,
  percentage,
  index,
  isFirst,
  relativeWidth = 100,
}: FunnelStepProps) {
  // Format the value with thousands separator
  const formattedValue = value.toLocaleString();

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mr-3",
              iconBackgroundVariants[
                color as keyof typeof iconBackgroundVariants
              ]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">{formattedValue}</div>
          {percentage !== undefined && !isFirst && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Taxa de conversão: {percentage}%
            </div>
          )}
        </div>
      </div>

      {/* Progress bar with dynamic width based on relative percentage */}
      <div
        className={cn(
          "h-8 rounded-md transition-all duration-500 ease-in-out",
          colorVariants[color as keyof typeof colorVariants]
        )}
        style={{ width: `${relativeWidth}%` }}
      ></div>
    </div>
  );
}

export default FunnelStep;
