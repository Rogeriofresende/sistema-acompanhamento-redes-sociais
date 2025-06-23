import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeRangeSelectorProps {
  value: "7d" | "28d" | "90d";
  onValueChange: (value: "7d" | "28d" | "90d") => void;
}

export function TimeRangeSelector({
  value,
  onValueChange,
}: TimeRangeSelectorProps) {
  return (
    <Tabs
      defaultValue="7d"
      value={value}
      onValueChange={(value) => onValueChange(value as "7d" | "28d" | "90d")}
      className="w-auto"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="7d">7 dias</TabsTrigger>
        <TabsTrigger value="28d">28 dias</TabsTrigger>
        <TabsTrigger value="90d">90 dias</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default TimeRangeSelector;
