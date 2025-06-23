import React, { useState, useEffect } from "react";
import { PageHeader } from "@/features/page-header";
import { StatCard } from "@/features/stat-card";
import { TimeRangeSelector } from "@/features/time-range-selector";
import { EngagementFunnel } from "@/features/engagement-funnel";
import { RecurringViewersCard } from "@/features/recurring-viewers-card";
import { MetricsTable } from "@/features/metrics-table";
import {
  FUNNEL_DATA,
  RECURRING_VIEWERS_DATA,
  METRICS_DATA,
  OVERVIEW_STATS,
  generateDates,
  generateMetricData,
} from "@/features/funnel-data";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { AlertCircle, Youtube, Eye, Users, ThumbsUp, MessageSquare } from "lucide-react";

// Função para decodificar JWT (sem verificar assinatura)
function parseJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Erro ao decodificar JWT:', e);
    return null;
  }
}

interface DashboardPageProps {
  onNavigateToVideos?: () => void;
}

interface AnalyticsData {
  channel: any;
  engagement: any;
  funnel: any;
  retention: any;
  recurringViewers: any;
  detailedMetrics: any;
}

export default function DashboardPage({
  onNavigateToVideos,
}: DashboardPageProps) {
  console.log('🚀 DashboardPage CARREGADO!');
  
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "28d" | "90d">("7d");
  const [activeMetric, setActiveMetric] = useState<string>("views");
  const [metricData, setMetricData] = useState(generateMetricData());
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const dates = generateDates();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [youtubeStatus, setYoutubeStatus] = useState<{ connected: boolean } | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  console.log('Dashboard montado - youtubeStatus inicial:', youtubeStatus);

  // Verificar status de conexão do YouTube
  useEffect(() => {
    async function checkYouTubeStatus() {
      try {
        setStatusLoading(true);
        console.log('🔍 Verificando status do YouTube com token:', token ? 'PRESENTE' : 'AUSENTE');
        
        // Decodificar o token para debug
        if (token) {
          const decoded = parseJWT(token);
          console.log('Token decodificado:', decoded);
          if (decoded && decoded.exp) {
            const expDate = new Date(decoded.exp * 1000);
            console.log('Token expira em:', expDate);
            console.log('Token expirado?', expDate < new Date());
          }
        }
        
        const res = await fetch("http://localhost:1717/api/youtube/status", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
        });
        
        console.log('📡 Resposta da API YouTube Status:');
        console.log('- Status Code:', res.status);
        console.log('- OK:', res.ok);
        console.log('- Headers:', Object.fromEntries(res.headers.entries()));
        
        if (!res.ok) {
          console.log('❌ YouTube NÃO conectado - resposta não ok (status:', res.status, ')');
          const errorText = await res.text().catch(() => 'Erro desconhecido');
          console.log('- Erro da API:', errorText);
          setYoutubeStatus({ connected: false });
          return;
        }
        
        const data = await res.json();
        console.log('✅ Dados do status recebidos:', JSON.stringify(data, null, 2));
        
        // Garantir que 'connected' seja explicitamente boolean
        const normalizedData = {
          ...data,
          connected: Boolean(data.connected)
        };
        
        console.log('📊 Status normalizado:', normalizedData);
        setYoutubeStatus(normalizedData);
      } catch (error) {
        console.error("❌ Erro ao verificar status do YouTube:", error);
        setYoutubeStatus({ connected: false });
      } finally {
        setStatusLoading(false);
      }
    }

    if (token) {
      console.log('🚀 Iniciando verificação do YouTube...');
      checkYouTubeStatus();
    } else {
      // Se não há token, YouTube não pode estar conectado
      console.log('🚫 Sem token - YouTube definido como não conectado');
      setYoutubeStatus({ connected: false });
      setStatusLoading(false);
    }
  }, [token]);

  // Buscar dados do YouTube Analytics
  useEffect(() => {
    async function fetchAnalyticsData() {
      if (!youtubeStatus?.connected || !token) {
        setIsLoading(false);
        return;
      }

      // IMPORTANTE: Se não tem permissões do Analytics, NÃO buscar dados
      if (youtubeStatus.connected && youtubeStatus.hasAnalytics === false) {
        setIsLoading(false);
        setFetchError('YouTube conectado mas sem permissões do Analytics. Reconecte para obter dados reais.');
        return;
      }

      // Verificar cache (evitar requisições em menos de 30 segundos)
      const now = Date.now();
      if (lastFetchTime && (now - lastFetchTime) < 30000) {
        console.log('Usando dados em cache');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setFetchError(null);
        
        // Buscar todos os dados em paralelo
        const [overviewRes, funnelRes, recurringRes, metricsRes] = await Promise.all([
          fetch(`http://localhost:1717/api/youtube/analytics/overview?period=${timeRange}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`http://localhost:1717/api/youtube/analytics/funnel?period=${timeRange}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`http://localhost:1717/api/youtube/analytics/recurring-viewers?period=${timeRange.replace('d', '')}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`http://localhost:1717/api/youtube/analytics/detailed-metrics?startDate=${getStartDate(timeRange)}&endDate=${getEndDate()}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        // Verificar se alguma resposta é 429 (Too Many Requests)
        if (overviewRes.status === 429 || funnelRes.status === 429 || 
            recurringRes.status === 429 || metricsRes.status === 429) {
          setFetchError('Muitas requisições. Por favor, aguarde alguns minutos.');
          return;
        }

        // Se alguma requisição falhou, NÃO usar dados mock - mostrar erro
        if (!overviewRes.ok || !funnelRes.ok || !recurringRes.ok || !metricsRes.ok) {
          setFetchError('Erro ao carregar dados do Analytics. Verifique se o YouTube está conectado com permissões corretas.');
          return;
        }

        const [overview, funnel, recurring, metrics] = await Promise.all([
          overviewRes.json(),
          funnelRes.json(),
          recurringRes.json(),
          metricsRes.json()
        ]);

        setAnalyticsData({
          channel: overview.channel,
          engagement: overview.engagement,
          funnel,
          retention: overview.retention,
          recurringViewers: recurring,
          detailedMetrics: metrics
        });
        
        setLastFetchTime(now);
      } catch (error) {
        console.error("Erro ao buscar dados do Analytics:", error);
        setFetchError('Erro de conexão. Verifique se o backend está rodando e se o YouTube está conectado corretamente.');
      } finally {
      setIsLoading(false);
      }
    }

    // Adicionar um pequeno delay antes de fazer as requisições
    const timeoutId = setTimeout(() => {
      fetchAnalyticsData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [youtubeStatus, token, timeRange, lastFetchTime]);

  // Helper functions para datas
  function getStartDate(range: string): string {
    const days = range === '90d' ? 90 : range === '28d' ? 28 : 7;
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  function getEndDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Formatar dados do funil para o componente
  function formatFunnelData() {
    if (!analyticsData?.funnel) {
      // NÃO retornar dados mock - retornar vazio
      return [];
    }

    return [
      {
        value: analyticsData.funnel.impressions.value,
        label: analyticsData.funnel.impressions.label,
        description: analyticsData.funnel.impressions.description,
        color: "blue",
        percentage: 100
      },
      {
        value: analyticsData.funnel.clicks.value,
        label: analyticsData.funnel.clicks.label,
        description: analyticsData.funnel.clicks.description,
        color: "green",
        percentage: analyticsData.funnel.clicks.percentage
      },
      {
        value: analyticsData.funnel.watchTime.value,
        label: analyticsData.funnel.watchTime.label,
        description: analyticsData.funnel.watchTime.description,
        color: "amber",
        percentage: analyticsData.funnel.watchTime.percentage
      },
      {
        value: analyticsData.funnel.engagement.value,
        label: analyticsData.funnel.engagement.label,
        description: analyticsData.funnel.engagement.description,
        color: "purple",
        percentage: analyticsData.funnel.engagement.percentage
      },
      {
        value: analyticsData.funnel.subscribers.value,
        label: analyticsData.funnel.subscribers.label,
        description: analyticsData.funnel.subscribers.description,
        color: "emerald",
        percentage: analyticsData.funnel.subscribers.percentage
      }
    ];
  }

  // Formatar dados de espectadores recorrentes
  function formatRecurringViewersData() {
    if (!analyticsData?.recurringViewers) {
      // NÃO retornar dados mock - retornar vazio
      return [];
    }

    const periods = ['7', '28', '90'];
    return periods.map(period => ({
      period: `${period} dias`,
      viewers: period === timeRange.replace('d', '') 
        ? analyticsData.recurringViewers.count 
        : Math.round(analyticsData.recurringViewers.count * (parseInt(period) / parseInt(timeRange.replace('d', '')))),
      description: `Espectadores que assistiram seu conteúdo múltiplas vezes nos últimos ${period} dias`,
      trend: period === timeRange.replace('d', '') 
        ? analyticsData.recurringViewers.trend 
        : analyticsData.recurringViewers.trend * 0.8,
      trendData: analyticsData.recurringViewers.trendData || []
    }));
  }

  // Formatar estatísticas gerais
  function formatOverviewStats() {
    if (!analyticsData?.channel || !analyticsData?.engagement) {
      // NÃO retornar dados mock - retornar vazio
      return [];
    }

    return [
      {
        title: "Total de Visualizações",
        values: {
          "7d": analyticsData.engagement.totalViews || 0,
          "28d": Math.round((analyticsData.engagement.totalViews || 0) * 4),
          "90d": Math.round((analyticsData.engagement.totalViews || 0) * 12)
        },
        icon: Eye,
        iconColor: "text-blue-600",
        iconBgColor: "bg-blue-100"
      },
      {
        title: "Inscritos Total",
        values: {
          "7d": analyticsData.channel.subscriberCount || 0,
          "28d": analyticsData.channel.subscriberCount || 0,
          "90d": analyticsData.channel.subscriberCount || 0
        },
        icon: Users,
        iconColor: "text-green-600",
        iconBgColor: "bg-green-100"
      },
      {
        title: "Total de Likes",
        values: {
          "7d": analyticsData.engagement.totalLikes || 0,
          "28d": Math.round((analyticsData.engagement.totalLikes || 0) * 4),
          "90d": Math.round((analyticsData.engagement.totalLikes || 0) * 12)
        },
        icon: ThumbsUp,
        iconColor: "text-purple-600",
        iconBgColor: "bg-purple-100"
      },
      {
        title: "Conteúdo Postado",
        values: {
          "7d": analyticsData.channel.videoCount || 0,
          "28d": analyticsData.channel.videoCount || 0,
          "90d": analyticsData.channel.videoCount || 0
        },
        icon: MessageSquare,
        iconColor: "text-yellow-600",
        iconBgColor: "bg-yellow-100"
      }
    ];
  }

  if (isLoading || statusLoading) {
    console.log('Mostrando spinner - isLoading:', isLoading, 'statusLoading:', statusLoading);
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando seus dados...
          </p>
        </div>
      </div>
    );
  }

  console.log('📊 ==> ESTADO ATUAL DO DASHBOARD <==');
  console.log('- youtubeStatus:', youtubeStatus);
  console.log('- youtubeStatus?.connected:', youtubeStatus?.connected);
  console.log('- Type of connected:', typeof youtubeStatus?.connected);
  console.log('- !youtubeStatus?.connected:', !youtubeStatus?.connected);
  console.log('- statusLoading:', statusLoading);
  console.log('- isLoading:', isLoading);
  
  // Se o YouTube não estiver conectado, mostrar mensagem e botão
  if (!youtubeStatus?.connected) {
    console.log('🟡 RENDERIZANDO: Aviso de YouTube não conectado');
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Visualize e analise os dados do seu canal do YouTube"
          onNavigateToVideos={onNavigateToVideos}
        />
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Canal do YouTube não conectado
              </h3>
              <p className="mt-2 text-yellow-700 dark:text-yellow-300">
                Para visualizar as estatísticas do seu canal, você precisa conectar sua conta do YouTube.
              </p>
              <Button 
                className="mt-4 flex items-center gap-2"
                disabled={isConnecting}
                onClick={async () => {
                  setIsConnecting(true);
                  try {
                    const jwt = localStorage.getItem("lanceiessa_token");
                    const res = await fetch("http://localhost:1717/api/youtube/auth", {
                      headers: { Authorization: `Bearer ${jwt}` },
                    });
                    const data = await res.json();
                    if (data.authUrl) {
                      window.location.href = data.authUrl;
                    }
                  } catch (err) {
                    console.error("Erro ao conectar com YouTube:", err);
                    alert("Erro ao conectar com o YouTube. Tente novamente.");
                    setIsConnecting(false);
                  }
                }}
              >
                <Youtube className="h-4 w-4" />
                {isConnecting ? "Conectando..." : "Conectar Canal do YouTube"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se o YouTube estiver conectado, mostrar o dashboard normal
  console.log('✅ YouTube conectado - verificando se há erros...');
  console.log('- fetchError:', fetchError);

  // Se há erro de fetch, mostrar mensagem de erro
  if (fetchError && youtubeStatus?.connected) {
    console.log('🟠 RENDERIZANDO: Erro de fetch mas YouTube conectado');
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Visualize e analise os dados do seu canal do YouTube"
          onNavigateToVideos={onNavigateToVideos}
        />

        {/* Indicador de conexão */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Youtube className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Canal do YouTube conectado
            </span>
          </div>
        </div>

        {/* Mensagem de erro principal */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Permissões do YouTube Analytics Necessárias
              </h3>
              <p className="text-orange-700 dark:text-orange-300 mb-4">
                {fetchError}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  Para ver dados reais do seu canal:
                </p>
                <ol className="text-sm text-orange-700 dark:text-orange-300 ml-4 list-decimal space-y-1">
                  <li>Vá em <strong>Configurações → Integrações</strong></li>
                  <li>Clique em <strong>"Desconectar"</strong> o YouTube</li>
                  <li>Clique em <strong>"Conectar"</strong> novamente</li>
                  <li>Na tela do Google, autorize <strong>TODAS as permissões</strong>, incluindo <strong>"Ver relatórios do YouTube Analytics"</strong></li>
                </ol>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => navigate("/settings")}
                  className="flex items-center gap-2"
                >
                  <Youtube className="h-4 w-4" />
                  Ir para Configurações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('🟢 RENDERIZANDO: Dashboard completo - YouTube conectado com sucesso!');
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visualize e analise os dados do seu canal do YouTube"
        onNavigateToVideos={onNavigateToVideos}
      />

      {/* Indicador de conexão */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Youtube className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            Canal do YouTube conectado com sucesso!
          </span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end">
        <TimeRangeSelector
          value={timeRange}
          onValueChange={(value) => setTimeRange(value)}
        />
      </div>

      {/* Overview Stats - só mostrar se tem dados */}
      {formatOverviewStats().length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formatOverviewStats().map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.values[timeRange]}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>
      )}

      {/* Engagement Funnel - só mostrar se tem dados */}
      {formatFunnelData().length > 0 && (
        <EngagementFunnel funnelData={formatFunnelData()} />
      )}

      {/* Espectadores Recorrentes - só mostrar se tem dados */}
      {formatRecurringViewersData().length > 0 && (
        <RecurringViewersCard viewersData={formatRecurringViewersData()} />
      )}

      {/* Metrics Table - só mostrar se tem dados */}
      {analyticsData?.detailedMetrics && (
      <MetricsTable
          metricsData={analyticsData.detailedMetrics}
        metricValues={metricData}
        dates={dates}
        activeMetric={activeMetric}
        onSelectMetric={setActiveMetric}
      />
      )}

      {/* Se não tem nenhum dado, mostrar mensagem */}
      {!analyticsData && !fetchError && youtubeStatus?.connected && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Carregando dados do seu canal...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
