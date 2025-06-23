import {
  MonitorIcon,
  EyeIcon,
  TimerIcon,
  ThumbsUpIcon,
  UsersIcon,
} from "lucide-react";

export const FUNNEL_DATA = [
  {
    id: "impressions",
    name: "Impressões",
    value: 100000,
    description: "Número de vezes que seu conteúdo foi exibido",
    icon: MonitorIcon,
    color: "blue",
  },
  {
    id: "clickRate",
    name: "Taxa de Clique",
    value: 15000,
    percentage: 15,
    description: "Pessoas que clicaram para assistir seus vídeos",
    icon: EyeIcon,
    color: "green",
  },
  {
    id: "watchTime",
    name: "Tempo de Visualização",
    value: 7500,
    percentage: 50,
    description: "Pessoas que assistiram pelo menos metade do vídeo",
    icon: TimerIcon,
    color: "amber",
  },
  {
    id: "engagement",
    name: "Engajamento",
    value: 3000,
    percentage: 40,
    description: "Pessoas que interagiram (likes, comentários)",
    icon: ThumbsUpIcon,
    color: "purple",
  },
  {
    id: "subscribers",
    name: "Novos Inscritos",
    value: 450,
    percentage: 15,
    description: "Pessoas que se inscreveram após assistir",
    icon: UsersIcon,
    color: "emerald",
  },
];

export const RECURRING_VIEWERS_DATA = {
  "7 dias": 1200,
  "28 dias": 3500,
  "90 dias": 8000,
};

export const METRICS_DATA = [
  { id: "views", name: "Visualizações", icon: EyeIcon, color: "blue" },
  {
    id: "impressionsVideo",
    name: "Impressões (Vídeos)",
    icon: VideoIcon,
    color: "indigo",
  },
  {
    id: "impressionsShorts",
    name: "Impressões (Shorts)",
    icon: MonitorIcon,
    color: "purple",
  },
  {
    id: "viewRateVideo",
    name: "Taxa de visualização (Vídeos)",
    icon: PercentIcon,
    color: "green",
  },
  {
    id: "viewRateShorts",
    name: "Taxa de visualização (Shorts)",
    icon: PercentIcon,
    color: "emerald",
  },
  {
    id: "clickRate",
    name: "Taxa de cliques de impressões",
    icon: PercentIcon,
    color: "teal",
  },
  {
    id: "watchTimeVideo",
    name: "Tempo de visualização (Vídeos)",
    icon: TimerIcon,
    color: "amber",
  },
  {
    id: "watchTimeShorts",
    name: "Tempo de visualização (Shorts)",
    icon: TimerIcon,
    color: "orange",
  },
  {
    id: "watchTimeLive",
    name: "Tempo de visualização (Live)",
    icon: TimerIcon,
    color: "red",
  },
  {
    id: "avgWatchTimeVideo",
    name: "Tempo médio de visualização (Vídeo)",
    icon: ClockIcon,
    color: "yellow",
  },
  {
    id: "avgWatchTimeShorts",
    name: "Tempo médio de visualização (Shorts)",
    icon: ClockIcon,
    color: "lime",
  },
  {
    id: "avgWatchTimeLive",
    name: "Tempo médio de visualização (Live)",
    icon: ClockIcon,
    color: "pink",
  },
  {
    id: "comments",
    name: "Comentários Adicionados",
    icon: MessageCircleIcon,
    color: "cyan",
  },
  {
    id: "commentsLive",
    name: "Comentários Live",
    icon: MessageCircleIcon,
    color: "sky",
  },
  {
    id: "likes",
    name: "Likes (Curtidas)",
    icon: ThumbsUpIcon,
    color: "rose",
  },
  {
    id: "newSubscribers",
    name: "Novos inscritos semanal",
    icon: UsersIcon,
    color: "green",
  },
  {
    id: "totalSubscribers",
    name: "Inscritos total",
    icon: UsersIcon,
    color: "emerald",
  },
  {
    id: "recurringViewers90d",
    name: "Espectadores Recorrentes 90 dias",
    icon: UserCheckIcon,
    color: "violet",
  },
  {
    id: "recurringViewers28d",
    name: "Espectadores Recorrentes 28 dias",
    icon: UserCheckIcon,
    color: "fuchsia",
  },
  {
    id: "recurringViewers7d",
    name: "Espectadores Recorrentes 7 dias",
    icon: UserCheckIcon,
    color: "purple",
  },
];

import {
  VideoIcon,
  ClockIcon,
  MessageCircleIcon,
  PercentIcon,
  UserCheckIcon,
} from "lucide-react";

// Generate dates for the table (Mondays for the last 4 weeks)
export const generateDates = () => {
  const dates = [];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ...

  // Find the most recent Monday
  const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysToLastMonday);

  // Generate 4 Mondays (current and 3 previous)
  for (let i = 0; i < 4; i++) {
    const monday = new Date(lastMonday);
    monday.setDate(lastMonday.getDate() - i * 7);

    // Format date as DD/MM/YYYY
    const day = monday.getDate().toString().padStart(2, "0");
    const month = (monday.getMonth() + 1).toString().padStart(2, "0");
    const year = monday.getFullYear();

    dates.unshift(`${day}/${month}/${year}`);
  }

  return dates;
};

// Generate mock data for each metric and date with percentage changes
export const generateMetricData = () => {
  const data = {};

  METRICS_DATA.forEach((metric) => {
    // Generate random values for each date
    const values = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10000));

    // Calculate percentage changes (comparing to previous week)
    const percentages = values.map((value, index) => {
      if (index === 0) return 0; // No previous week for the first value
      const prevValue = values[index - 1];
      if (prevValue === 0) return 0; // Avoid division by zero
      return Math.round(((value - prevValue) / prevValue) * 100);
    });

    data[metric.id] = { values, percentages };
  });

  return data;
};

export const OVERVIEW_STATS = [
  {
    title: "Total de Visualizações",
    values: { "7d": "12.5K", "28d": "50.5K", "90d": "135K" },
    icon: EyeIcon,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "Inscritos Total",
    values: { "7d": "2.4K", "28d": "2.4K", "90d": "2.4K" },
    icon: UsersIcon,
    iconColor: "text-green-600 dark:text-green-400",
    iconBgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "Total de Likes",
    values: { "7d": "1.9K", "28d": "8.4K", "90d": "27K" },
    icon: ThumbsUpIcon,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    title: "Conteúdo Postado",
    values: { "7d": "3", "28d": "12", "90d": "35" },
    icon: VideoIcon,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
];
