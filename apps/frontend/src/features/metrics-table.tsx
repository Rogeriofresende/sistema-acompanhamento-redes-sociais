import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface MetricData {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface MetricsTableProps {
  metricsData: MetricData[];
  metricValues: Record<string, { values: number[]; percentages: number[] }>;
  dates: string[];
  activeMetric: string;
  onSelectMetric: (metricId: string) => void;
}

export function MetricsTable({
  metricsData,
  metricValues,
  dates,
  activeMetric,
  onSelectMetric,
}: MetricsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas por data</CardTitle>
        <CardDescription>
          Visualize as métricas disponíveis por data (segundas-feiras)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Métrica</TableHead>
                {dates.map((date, index) => (
                  <TableHead key={index}>{date}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {metricsData.map((metric, index) => (
                <TableRow
                  key={metric.id}
                  className={
                    activeMetric === metric.id
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }
                  onClick={() => onSelectMetric(metric.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-2 rounded-full bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}
                      >
                        <metric.icon
                          className={`h-4 w-4 text-${metric.color}-600 dark:text-${metric.color}-400`}
                        />
                      </div>
                      <span>{metric.name}</span>
                    </div>
                  </TableCell>
                  {metricValues[metric.id].values.map((value, i) => (
                    <TableCell key={i}>
                      <div className="flex flex-col">
                        <span>{value.toLocaleString()}</span>
                        {i > 0 && (
                          <div className="flex items-center text-xs mt-1">
                            {metricValues[metric.id].percentages[i] > 0 ? (
                              <>
                                <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />

                                <span className="text-green-500">
                                  {metricValues[metric.id].percentages[i]}%
                                </span>
                              </>
                            ) : metricValues[metric.id].percentages[i] < 0 ? (
                              <>
                                <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />

                                <span className="text-red-500">
                                  {Math.abs(
                                    metricValues[metric.id].percentages[i]
                                  )}
                                  %
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-400">0%</span>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default MetricsTable;
