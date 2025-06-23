import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, CartesianGrid } from "recharts";

interface RecurringViewersChartProps {
  data: Array<{ date: string; viewers: number }>;
  period: string;
}

export function RecurringViewersChart({
  data,
  period,
}: RecurringViewersChartProps) {
  // Format the data for the chart
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  // Calculate percentage change from first to last data point
  const percentageChange =
    data.length > 1
      ? ((data[data.length - 1].viewers - data[0].viewers) / data[0].viewers) *
        100
      : 0;

  const isPositiveChange = percentageChange >= 0;

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">Tendência ({period})</h4>
          <span
            className={`text-xs font-medium ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
          >
            {isPositiveChange ? "+" : ""}
            {percentageChange.toFixed(1)}%
          </span>
        </div>
        <ChartContainer config={{}} className="aspect-[none] h-[120px] w-full">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.2}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value}
            />

            <Line
              type="monotone"
              dataKey="viewers"
              stroke={`hsl(var(--chart-${period === "7 dias" ? "1" : period === "28 dias" ? "2" : "3"}))`}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default RecurringViewersChart;
