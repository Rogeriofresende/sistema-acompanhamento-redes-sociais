import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  VideoIcon,
  ClockIcon,
  PlusIcon,
  EyeIcon,
  ThumbsUpIcon,
  MessageCircleIcon,
  ChevronDownIcon,
  SearchIcon,
  FilterIcon,
  ExternalLinkIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for videos with transcriptions
const allMockVideos = [
  {
    id: "video1",
    title: "Como aumentar seu engajamento no YouTube em 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D",
    views: 12500,
    likes: 1800,
    comments: 320,
    publishedAt: "2023-06-15",
    transcription: [
      {
        speaker: "João",
        time: "00:00:15",
        text: "Olá pessoal, hoje vamos falar sobre como aumentar o engajamento no YouTube em 2023.",
      },
      {
        speaker: "João",
        time: "00:00:30",
        text: "Primeiramente, é importante entender que o algoritmo do YouTube prioriza vídeos que mantêm a audiência por mais tempo.",
      },
      {
        speaker: "Maria",
        time: "00:01:05",
        text: "Exatamente, João! E criar conteúdo que prenda a atenção do início ao fim é fundamental.",
      },
      {
        speaker: "João",
        time: "00:01:25",
        text: "Além disso, incentivar comentários, curtidas e compartilhamentos também ajuda muito.",
      },
      {
        speaker: "Maria",
        time: "00:02:10",
        text: "Uma dica importante é criar thumbnails atraentes e títulos que despertem curiosidade.",
      },
      {
        speaker: "João",
        time: "00:02:45",
        text: "Outro ponto crucial é a consistência: postar regularmente ajuda a construir uma audiência fiel.",
      },
      {
        speaker: "Maria",
        time: "00:03:20",
        text: "Não esqueça de utilizar tags relevantes e descrições detalhadas para melhorar a descoberta do seu conteúdo.",
      },
      {
        speaker: "João",
        time: "00:04:00",
        text: "Por fim, interagir com sua audiência respondendo comentários cria uma comunidade engajada ao redor do seu canal.",
      },
    ],

    category: "Ecosystem of a Startup",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 5000 },
        { date: "08/04/2023", value: 7500 },
        { date: "15/04/2023", value: 10000 },
        { date: "22/04/2023", value: 12500 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 25000 },
        { date: "08/04/2023", value: 35000 },
        { date: "15/04/2023", value: 42000 },
        { date: "22/04/2023", value: 50000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 2500 },
        { date: "08/04/2023", value: 5000 },
        { date: "15/04/2023", value: 8500 },
        { date: "22/04/2023", value: 12500 },
      ],
    },
  },
  {
    id: "video2",
    title: "Dicas para editar vídeos como um profissional",
    thumbnail:
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHlvdXR1YmV8ZW58MHx8MHx8fDA%3D",
    views: 8700,
    likes: 1200,
    comments: 210,
    publishedAt: "2023-07-02",
    transcription: [
      {
        speaker: "Carlos",
        time: "00:00:10",
        text: "Bem-vindos a mais um vídeo! Hoje vou compartilhar dicas valiosas para você editar seus vídeos como um profissional.",
      },
      {
        speaker: "Carlos",
        time: "00:00:35",
        text: "Primeiro, planeje seu vídeo antes de começar a editar - isso economiza muito tempo.",
      },
      {
        speaker: "Ana",
        time: "00:01:15",
        text: "Segundo, aprenda os atalhos de teclado do seu software de edição, isso aumenta drasticamente sua produtividade.",
      },
      {
        speaker: "Carlos",
        time: "00:01:50",
        text: "Terceiro, preste atenção ao áudio - um bom áudio é mais importante que uma boa imagem.",
      },
      {
        speaker: "Ana",
        time: "00:02:30",
        text: "Quarto, use cortes dinâmicos para manter o ritmo do vídeo interessante.",
      },
      {
        speaker: "Carlos",
        time: "00:03:10",
        text: "Quinto, aprenda a usar correção de cor para dar um visual profissional.",
      },
      {
        speaker: "Ana",
        time: "00:03:45",
        text: "Sexto, não exagere nos efeitos - menos é mais.",
      },
      {
        speaker: "Carlos",
        time: "00:04:20",
        text: "E por último, assista muitos tutoriais e pratique constantemente. A edição de vídeo é uma habilidade que melhora com o tempo e dedicação.",
      },
    ],

    category: "Desgringolando",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 3000 },
        { date: "08/04/2023", value: 4500 },
        { date: "15/04/2023", value: 6000 },
        { date: "22/04/2023", value: 7500 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 15000 },
        { date: "08/04/2023", value: 22000 },
        { date: "15/04/2023", value: 30000 },
        { date: "22/04/2023", value: 38000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 1500 },
        { date: "08/04/2023", value: 3000 },
        { date: "15/04/2023", value: 5500 },
        { date: "22/04/2023", value: 8700 },
      ],
    },
  },
  {
    id: "video3",
    title: "Os melhores equipamentos para criadores de conteúdo",
    thumbnail:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHlvdXR1YmV8ZW58MHx8MHx8fDA%3D",
    views: 15300,
    likes: 2100,
    comments: 450,
    publishedAt: "2023-07-20",
    transcription: [
      {
        speaker: "Pedro",
        time: "00:00:12",
        text: "E aí, galera! No vídeo de hoje vou mostrar os equipamentos essenciais para quem está começando a criar conteúdo.",
      },
      {
        speaker: "Pedro",
        time: "00:00:40",
        text: "Vamos começar pelas câmeras: você não precisa de uma câmera super cara para começar, muitos smartphones modernos têm ótimas câmeras.",
      },
      {
        speaker: "Luiza",
        time: "00:01:15",
        text: "Mas se puder investir, recomendo a Sony ZV-1 ou a Canon M50 para iniciantes.",
      },
      {
        speaker: "Pedro",
        time: "00:01:45",
        text: "Para áudio, um bom microfone faz toda diferença - o Rode VideoMic Go é excelente custo-benefício.",
      },
      {
        speaker: "Luiza",
        time: "00:02:20",
        text: "Iluminação é fundamental: um ring light simples já resolve para começar, mas kits com softbox são ótimos para um resultado mais profissional.",
      },
      {
        speaker: "Pedro",
        time: "00:03:00",
        text: "Para edição, um computador com pelo menos 16GB de RAM e um bom processador vai facilitar seu trabalho.",
      },
      {
        speaker: "Luiza",
        time: "00:03:35",
        text: "Softwares como DaVinci Resolve (gratuito) ou Adobe Premiere são excelentes opções.",
      },
      {
        speaker: "Pedro",
        time: "00:04:10",
        text: "Lembre-se: o equipamento não faz o criador, mas boas ferramentas certamente ajudam a produzir conteúdo de qualidade.",
      },
    ],

    category: "Ecosystem of a Startup",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 6000 },
        { date: "08/04/2023", value: 9000 },
        { date: "15/04/2023", value: 12000 },
        { date: "22/04/2023", value: 15000 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 30000 },
        { date: "08/04/2023", value: 45000 },
        { date: "15/04/2023", value: 60000 },
        { date: "22/04/2023", value: 75000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 3000 },
        { date: "08/04/2023", value: 6000 },
        { date: "15/04/2023", value: 10000 },
        { date: "22/04/2023", value: 15300 },
      ],
    },
  },
  {
    id: "video4",
    title: "Como criar thumbnails que atraem mais cliques",
    thumbnail:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D",
    views: 9800,
    likes: 1500,
    comments: 280,
    publishedAt: "2023-08-05",
    transcription: [
      {
        speaker: "Mariana",
        time: "00:00:08",
        text: "Fala pessoal! Hoje vamos falar sobre como criar thumbnails irresistíveis para seus vídeos.",
      },
      {
        speaker: "Mariana",
        time: "00:00:30",
        text: "A thumbnail é a primeira impressão do seu conteúdo, então precisa ser impactante.",
      },
      {
        speaker: "Rafael",
        time: "00:01:00",
        text: "Primeiro, use imagens de alta qualidade e nítidas - nada de fotos borradas.",
      },
      {
        speaker: "Mariana",
        time: "00:01:35",
        text: "Segundo, adicione texto, mas mantenha curto e legível mesmo em telas pequenas.",
      },
      {
        speaker: "Rafael",
        time: "00:02:10",
        text: "Terceiro, use cores contrastantes que chamem atenção - vermelho, amarelo e laranja funcionam bem.",
      },
      {
        speaker: "Mariana",
        time: "00:02:45",
        text: "Quarto, mostre expressões faciais marcantes se você aparecer na thumbnail.",
      },
      {
        speaker: "Rafael",
        time: "00:03:20",
        text: "Quinto, mantenha uma identidade visual consistente para seu canal.",
      },
      {
        speaker: "Mariana",
        time: "00:03:55",
        text: "Sexto, use o Canva ou Photoshop para criar layouts profissionais.",
      },
      {
        speaker: "Rafael",
        time: "00:04:30",
        text: "E por último, teste diferentes estilos e analise quais geram mais cliques.",
      },
      {
        speaker: "Mariana",
        time: "00:05:00",
        text: "Lembre-se: sua thumbnail precisa ser chamativa, mas também honesta sobre o conteúdo do vídeo - clickbait pode gerar cliques iniciais, mas prejudica seu canal a longo prazo.",
      },
    ],

    category: "Desgringolando",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 4000 },
        { date: "08/04/2023", value: 6000 },
        { date: "15/04/2023", value: 8000 },
        { date: "22/04/2023", value: 10000 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 20000 },
        { date: "08/04/2023", value: 30000 },
        { date: "15/04/2023", value: 40000 },
        { date: "22/04/2023", value: 50000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 2000 },
        { date: "08/04/2023", value: 4000 },
        { date: "15/04/2023", value: 7000 },
        { date: "22/04/2023", value: 9800 },
      ],
    },
  },
  {
    id: "video5",
    title: "Estratégias de SEO para vídeos no YouTube",
    thumbnail:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D",
    views: 11200,
    likes: 1650,
    comments: 310,
    publishedAt: "2023-08-18",
    transcription: [
      {
        speaker: "Fernando",
        time: "00:00:10",
        text: "Olá a todos! No vídeo de hoje vamos explorar estratégias eficazes de SEO para seus vídeos no YouTube.",
      },
      {
        speaker: "Fernando",
        time: "00:00:40",
        text: "Primeiro, pesquise palavras-chave relevantes para o seu nicho usando ferramentas como VidIQ ou TubeBuddy.",
      },
      {
        speaker: "Camila",
        time: "00:01:15",
        text: "Inclua essas palavras-chave no título, mas de forma natural e atraente.",
      },
      {
        speaker: "Fernando",
        time: "00:01:50",
        text: "Na descrição, coloque as informações mais importantes nos primeiros 2-3 parágrafos, incluindo palavras-chave principais.",
      },
      {
        speaker: "Camila",
        time: "00:02:25",
        text: "Use tags relevantes, começando pelas mais específicas para as mais gerais.",
      },
      {
        speaker: "Fernando",
        time: "00:03:00",
        text: "Crie miniaturas personalizadas que se destaquem nas buscas.",
      },
      {
        speaker: "Camila",
        time: "00:03:35",
        text: "Organize seus vídeos em playlists temáticas para aumentar o tempo de visualização.",
      },
      {
        speaker: "Fernando",
        time: "00:04:10",
        text: "Adicione legendas e transcrições para melhorar a acessibilidade e o SEO.",
      },
      {
        speaker: "Camila",
        time: "00:04:45",
        text: "Promova engajamento pedindo likes, comentários e inscrições.",
      },
      {
        speaker: "Fernando",
        time: "00:05:20",
        text: "Por fim, analise regularmente o desempenho dos seus vídeos para refinar sua estratégia.",
      },
      {
        speaker: "Camila",
        time: "00:05:55",
        text: "Lembre-se que o SEO no YouTube é um processo contínuo e os resultados aparecem com consistência.",
      },
    ],

    category: "Ecosystem of a Startup",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 5000 },
        { date: "08/04/2023", value: 7500 },
        { date: "15/04/2023", value: 9500 },
        { date: "22/04/2023", value: 12000 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 25000 },
        { date: "08/04/2023", value: 37500 },
        { date: "15/04/2023", value: 47500 },
        { date: "22/04/2023", value: 60000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 2500 },
        { date: "08/04/2023", value: 5000 },
        { date: "15/04/2023", value: 8000 },
        { date: "22/04/2023", value: 11200 },
      ],
    },
  },
  {
    id: "video6",
    title: "Como monetizar seu canal de forma eficiente",
    thumbnail:
      "https://images.unsplash.com/photo-1610128114197-485d933885c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D",
    views: 13600,
    likes: 1950,
    comments: 420,
    publishedAt: "2023-09-01",
    transcription: [
      {
        speaker: "Lucas",
        time: "00:00:15",
        text: "E aí, pessoal! Hoje vamos falar sobre como monetizar seu canal do YouTube de forma eficiente.",
      },
      {
        speaker: "Lucas",
        time: "00:00:45",
        text: "Além do Programa de Parcerias do YouTube, que permite ganhar com anúncios, existem várias outras formas de monetização.",
      },
      {
        speaker: "Juliana",
        time: "00:01:20",
        text: "Parcerias com marcas e conteúdo patrocinado podem ser muito lucrativos - mas escolha apenas produtos que você realmente usaria.",
      },
      {
        speaker: "Lucas",
        time: "00:01:55",
        text: "Programas de afiliados são excelentes para recomendar produtos e ganhar comissões.",
      },
      {
        speaker: "Juliana",
        time: "00:02:30",
        text: "O YouTube Premium também gera receita baseada no tempo de visualização dos assinantes.",
      },
      {
        speaker: "Lucas",
        time: "00:03:05",
        text: "Não esqueça do Super Chat e Super Thanks, onde seus fãs podem fazer doações durante lives ou em vídeos normais.",
      },
      {
        speaker: "Juliana",
        time: "00:03:40",
        text: "Merchandising próprio é uma ótima opção quando você já tem uma comunidade engajada.",
      },
      {
        speaker: "Lucas",
        time: "00:04:15",
        text: "Plataformas como Patreon permitem que seus fãs mais dedicados contribuam mensalmente em troca de conteúdo exclusivo.",
      },
      {
        speaker: "Juliana",
        time: "00:04:50",
        text: "Por fim, diversifique suas fontes de renda - não dependa apenas de uma estratégia de monetização.",
      },
    ],

    category: "Desgringolando",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 5500 },
        { date: "08/04/2023", value: 8000 },
        { date: "15/04/2023", value: 11000 },
        { date: "22/04/2023", value: 14000 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 27500 },
        { date: "08/04/2023", value: 40000 },
        { date: "15/04/2023", value: 55000 },
        { date: "22/04/2023", value: 70000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 3000 },
        { date: "08/04/2023", value: 6000 },
        { date: "15/04/2023", value: 9500 },
        { date: "22/04/2023", value: 13600 },
      ],
    },
  },
  {
    id: "video7",
    title: "Técnicas avançadas de iluminação para vídeos",
    thumbnail: "https://v3.fal.media/files/tiger/VJyCHsv6F2htdFVXVYk9U.png",
    views: 7900,
    likes: 1100,
    comments: 190,
    publishedAt: "2023-09-15",
    transcription: [
      {
        speaker: "Gabriel",
        time: "00:00:12",
        text: "Olá, criadores de conteúdo! Hoje vamos explorar técnicas avançadas de iluminação para elevar a qualidade dos seus vídeos.",
      },
      {
        speaker: "Gabriel",
        time: "00:00:45",
        text: "Vamos começar com a iluminação de três pontos: luz principal, luz de preenchimento e contraluz.",
      },
      {
        speaker: "Beatriz",
        time: "00:01:20",
        text: "A luz principal é sua fonte primária, posicionada a 45 graus do sujeito.",
      },
      {
        speaker: "Gabriel",
        time: "00:01:55",
        text: "A luz de preenchimento, menos intensa, suaviza as sombras do lado oposto.",
      },
      {
        speaker: "Beatriz",
        time: "00:02:30",
        text: "A contraluz separa o sujeito do fundo, criando profundidade.",
      },
      {
        speaker: "Gabriel",
        time: "00:03:05",
        text: "Para um look cinematográfico, experimente iluminação de baixa intensidade com alto contraste.",
      },
      {
        speaker: "Beatriz",
        time: "00:03:40",
        text: "Luzes coloridas podem criar ambientes específicos - azul para cenas noturnas, laranja para aconchego.",
      },
      {
        speaker: "Gabriel",
        time: "00:04:15",
        text: "Difusores são essenciais para suavizar a luz e evitar sombras duras.",
      },
      {
        speaker: "Beatriz",
        time: "00:04:50",
        text: "Para externas, reflectores dobráveis ajudam a controlar a luz natural.",
      },
      {
        speaker: "Gabriel",
        time: "00:05:25",
        text: "Lembre-se que a temperatura de cor é crucial - misturar luzes quentes e frias sem ajustes pode arruinar seu vídeo.",
      },
      {
        speaker: "Beatriz",
        time: "00:06:00",
        text: "Por fim, invista em luzes LED ajustáveis que permitem controlar intensidade e temperatura de cor.",
      },
    ],

    category: "Ecosystem of a Startup",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 3000 },
        { date: "08/04/2023", value: 4500 },
        { date: "15/04/2023", value: 6000 },
        { date: "22/04/2023", value: 8000 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 15000 },
        { date: "08/04/2023", value: 22500 },
        { date: "15/04/2023", value: 30000 },
        { date: "22/04/2023", value: 40000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 1500 },
        { date: "08/04/2023", value: 3000 },
        { date: "15/04/2023", value: 5500 },
        { date: "22/04/2023", value: 7900 },
      ],
    },
  },
  {
    id: "video8",
    title: "Como fazer lives de sucesso no YouTube",
    thumbnail:
      "https://images.unsplash.com/photo-1580130732478-4e339fb6836f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvdXR1YmV8ZW58MHx8MHx8fDA%3D",
    views: 10500,
    likes: 1550,
    comments: 350,
    publishedAt: "2023-10-02",
    transcription: [
      {
        speaker: "Ricardo",
        time: "00:00:10",
        text: "Fala galera! No vídeo de hoje vou compartilhar dicas valiosas para fazer lives de sucesso no YouTube.",
      },
      {
        speaker: "Ricardo",
        time: "00:00:40",
        text: "Primeiro, anuncie sua live com antecedência - crie um evento e promova nas redes sociais.",
      },
      {
        speaker: "Amanda",
        time: "00:01:15",
        text: "Tenha uma conexão de internet estável e de preferência cabeada.",
      },
      {
        speaker: "Ricardo",
        time: "00:01:50",
        text: "Use equipamentos de qualidade, especialmente para o áudio.",
      },
      {
        speaker: "Amanda",
        time: "00:02:25",
        text: "Prepare um roteiro ou tópicos para guiar sua transmissão, mas mantenha espaço para improviso.",
      },
      {
        speaker: "Ricardo",
        time: "00:03:00",
        text: "Interaja constantemente com o chat - as pessoas assistem lives pela interação em tempo real.",
      },
      {
        speaker: "Amanda",
        time: "00:03:35",
        text: "Estabeleça um horário regular para suas lives, isso cria o hábito na sua audiência.",
      },
      {
        speaker: "Ricardo",
        time: "00:04:10",
        text: "Considere ter um moderador para o chat se sua audiência for grande.",
      },
      {
        speaker: "Amanda",
        time: "00:04:45",
        text: "Faça lives com duração adequada - comece com 30-60 minutos e ajuste conforme a resposta do público.",
      },
      {
        speaker: "Ricardo",
        time: "00:05:20",
        text: "Após a live, edite os melhores momentos para um vídeo de destaque.",
      },
      {
        speaker: "Amanda",
        time: "00:05:55",
        text: "Por fim, analise os dados de cada transmissão para entender o que funciona melhor com seu público.",
      },
      {
        speaker: "Ricardo",
        time: "00:06:30",
        text: "Com consistência e melhorias constantes, suas lives se tornarão um diferencial do seu canal!",
      },
    ],

    category: "Desgringolando",
    analyticsData: {
      impressions: [
        { date: "01/04/2023", value: 4500 },
        { date: "08/04/2023", value: 6500 },
        { date: "15/04/2023", value: 8500 },
        { date: "22/04/2023", value: 11000 },
      ],

      watchTime: [
        { date: "01/04/2023", value: 22500 },
        { date: "08/04/2023", value: 32500 },
        { date: "15/04/2023", value: 42500 },
        { date: "22/04/2023", value: 55000 },
      ],

      viewsOverTime: [
        { date: "01/04/2023", value: 2500 },
        { date: "08/04/2023", value: 5000 },
        { date: "15/04/2023", value: 7500 },
        { date: "22/04/2023", value: 10500 },
      ],
    },
  },
];

// YouTube podcast categories
const podcastCategories = [
  { id: "all", name: "Todos" },
  { id: "ecosystem", name: "Ecosystem of a Startup" },
  { id: "desgringolando", name: "Desgringolando" },
];

interface VideosPageProps {
  onBackToDashboard?: () => void;
}

export default function VideosPage({ onBackToDashboard }: VideosPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleVideos, setVisibleVideos] = useState<number>(3);
  const [expandedTranscriptions, setExpandedTranscriptions] = useState<
    Record<string, boolean>
  >({});
  const [sortOrder, setSortOrder] = useState<"recent" | "popular">("recent");
  const [filteredVideos, setFilteredVideos] = useState(allMockVideos);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort videos based on search term, category, and sort order
  useEffect(() => {
    let result = [...allMockVideos];

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(lowerSearchTerm) ||
          video.transcription.some((item) =>
            item.text.toLowerCase().includes(lowerSearchTerm)
          )
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      const categoryName =
        selectedCategory === "ecosystem"
          ? "Ecosystem of a Startup"
          : "Desgringolando";

      result = result.filter((video) => video.category === categoryName);
    }

    // Apply sorting
    if (sortOrder === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortOrder === "popular") {
      result.sort((a, b) => b.views - a.views);
    }

    setFilteredVideos(result);
    // Reset visible videos count when filters change
    setVisibleVideos(3);
  }, [searchTerm, selectedCategory, sortOrder]);

  const handleLoadMore = () => {
    setVisibleVideos((prev) => Math.min(prev + 3, filteredVideos.length));
  };

  const toggleTranscription = (videoId: string) => {
    setExpandedTranscriptions((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando seus vídeos do YouTube...
          </p>
        </div>
      </div>
    );
  }

  // Stats for the overview cards
  const totalVideos = filteredVideos.length;
  const newVideosThisMonth = 3;
  const totalViews = filteredVideos.reduce(
    (sum, video) => sum + video.views,
    0
  );
  const totalLikes = filteredVideos.reduce(
    (sum, video) => sum + video.likes,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Vídeos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie e analise os vídeos do seu canal
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <VideoIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total de Vídeos
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalVideos}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <PlusIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Novos Vídeos (Mês)
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {newVideosThisMonth}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <EyeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total de Visualizações
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalViews.toLocaleString()}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <ThumbsUpIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total de Likes
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalLikes.toLocaleString()}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Videos List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center">
              <VideoIcon className="mr-2 h-5 w-5 text-gray-500" />
              Todos os vídeos
            </CardTitle>
            <CardDescription>Seus vídeos e suas métricas</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Search input */}
            <div className="relative w-full sm:w-[220px]">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                placeholder="Buscar vídeos..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por podcast" />
              </SelectTrigger>
              <SelectContent>
                {podcastCategories.map((category, index) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center">
                      <FilterIcon className="mr-2 h-4 w-4" />

                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort order */}
            <Select
              defaultValue="recent"
              value={sortOrder}
              onValueChange={(value) =>
                setSortOrder(value as "recent" | "popular")
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    Mais recentes
                  </div>
                </SelectItem>
                <SelectItem value="popular">
                  <div className="flex items-center">
                    <EyeIcon className="mr-2 h-4 w-4" />
                    Mais visualizados
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredVideos.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Nenhum vídeo encontrado com os filtros atuais.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVideos.slice(0, visibleVideos).map((video, index) => (
                <div
                  key={video.id}
                  className="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-48 h-28 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {video.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                          {video.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Publicado em
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {video.publishedAt}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-gray-500 dark:text-gray-400">
                            Visualizações
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {video.views.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-gray-500 dark:text-gray-400">
                            Likes
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {video.likes.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-gray-500 dark:text-gray-400">
                            Comentários
                          </p>
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {video.comments.toLocaleString()}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 p-0 h-6"
                            >
                              <ExternalLinkIcon className="h-4 w-4 text-blue-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transcription section */}
                  <div className="mt-2">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium mb-1">Transcrição:</p>
                      <div className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                        {expandedTranscriptions[video.id] ? (
                          <div className="space-y-2">
                            {video.transcription.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex flex-col sm:flex-row"
                              >
                                <div className="sm:w-60 font-medium text-gray-700 dark:text-gray-300 flex-shrink-0 flex">
                                  <span className="text-blue-600 dark:text-blue-400 inline-block w-20 mr-4">
                                    {item.time}
                                  </span>
                                  <span className="text-purple-600 dark:text-purple-400 inline-block w-28">
                                    {item.speaker}
                                  </span>
                                  :
                                </div>
                                <div className="sm:ml-2">{item.text}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {video.transcription
                              .slice(0, 2)
                              .map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col sm:flex-row"
                                >
                                  <div className="sm:w-60 font-medium text-gray-700 dark:text-gray-300 flex-shrink-0 flex">
                                    <span className="text-blue-600 dark:text-blue-400 inline-block w-20 mr-4">
                                      {item.time}
                                    </span>
                                    <span className="text-purple-600 dark:text-purple-400 inline-block w-28">
                                      {item.speaker}
                                    </span>
                                    :
                                  </div>
                                  <div className="sm:ml-2">{item.text}</div>
                                </div>
                              ))}
                            <div className="text-gray-500 dark:text-gray-500">
                              ...
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTranscription(video.id)}
                      className="mt-2 text-blue-600 dark:text-blue-400 p-0 h-auto"
                    >
                      {expandedTranscriptions[video.id]
                        ? "Mostrar menos"
                        : "Expandir transcrição"}
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform ${
                          expandedTranscriptions[video.id] ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              ))}

              {visibleVideos < filteredVideos.length && (
                <div className="flex justify-center mt-4">
                  <Button onClick={handleLoadMore} variant="outline">
                    Carregar mais vídeos
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
