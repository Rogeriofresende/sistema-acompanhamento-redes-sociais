import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilterIcon } from "lucide-react";
import {
  MonitorIcon,
  EyeIcon,
  TimerIcon,
  ThumbsUpIcon,
  UsersIcon,
} from "lucide-react";
import FunnelStep from "@/features/funnel-step";

interface EngagementFunnelProps {
  funnelData: Array<{
    id?: string;
    name?: string;
    value: number;
    label?: string;
    description: string;
    icon?: React.ElementType;
    color: string;
    percentage?: number;
  }>;
}

export function EngagementFunnel({ funnelData }: EngagementFunnelProps) {
  // Mapear ícones baseado no índice ou tipo
  const icons = [MonitorIcon, EyeIcon, TimerIcon, ThumbsUpIcon, UsersIcon];
  
  // Calcular métricas adicionais dos dados
  const retentionRate = funnelData[3]?.percentage || 68;
  const avgWatchTime = funnelData[2]?.value ? formatWatchTime(funnelData[2].value) : "4:32";
  const shareRate = funnelData[4]?.percentage ? (funnelData[4].percentage * 0.1).toFixed(1) : "5.2";
  
  return (
    <Card id="engagement-funnel">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FilterIcon className="mr-2 h-5 w-5 text-gray-500" />
          Dashboard de Engajamento
        </CardTitle>
        <CardDescription>
          Análise do caminho de engajamento dos espectadores com seu conteúdo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Funnel Visualization */}
          <div className="space-y-4">
            {funnelData.map((step, index) => {
              // Calcular largura relativa baseada na porcentagem
              const currentPercentage = step.percentage || (index === 0 ? 100 : Math.round((step.value / funnelData[0].value) * 100));
              
              return (
                <FunnelStep
                  key={step.id || index}
                  id={step.id || `step-${index}`}
                  name={step.name || step.label || `Etapa ${index + 1}`}
                  value={step.value}
                  description={step.description}
                  icon={step.icon || icons[index]}
                  color={step.color}
                  percentage={currentPercentage}
                  index={index}
                  isFirst={index === 0}
                  relativeWidth={currentPercentage}
                />
              );
            })}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Taxa de Retenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{retentionRate}%</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Espectadores que assistem mais de um vídeo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Tempo Médio de Visualização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{avgWatchTime}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Minutos por visualização
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Taxa de Compartilhamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{shareRate}%</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Visualizações que resultam em compartilhamentos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatWatchTime(minutes: number): string {
  if (minutes < 1) return "0:30";
  if (minutes < 60) {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}

export default EngagementFunnel;
