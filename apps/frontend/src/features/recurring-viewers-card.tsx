import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCheckIcon } from "lucide-react";
import { RECURRING_VIEWERS_HISTORY } from "@/features/recurring-viewers-history-data";
import RecurringViewersChart from "@/features/recurring-viewers-chart";

interface RecurringViewersCardProps {
  viewersData: Record<string, number>;
}

export function RecurringViewersCard({
  viewersData,
}: RecurringViewersCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheckIcon className="mr-2 h-5 w-5 text-gray-500" />
          Espectadores Recorrentes
        </CardTitle>
        <CardDescription>
          Número de espectadores que retornam ao seu canal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(viewersData).map(([period, count], index) => (
            <Card key={period}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{period}</h3>
                    <div className="flex items-center">
                      <UserCheckIcon className="h-5 w-5 text-blue-500 mr-2" />

                      <span className="text-2xl font-bold">
                        {count.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Espectadores que assistiram seu conteúdo múltiplas vezes
                      nos últimos {period}
                    </p>
                  </div>

                  {/* Chart showing trend over time */}
                  <div className="pt-2">
                    <RecurringViewersChart
                      data={RECURRING_VIEWERS_HISTORY[period]}
                      period={period}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecurringViewersCard;
