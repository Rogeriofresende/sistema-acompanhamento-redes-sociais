import {
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  GlobeIcon,
  BriefcaseIcon,
  MapPinIcon,
  TagIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";

export interface SocialLink {
  platform: string;
  url: string;
  icon: any;
}

export interface PersonContact {
  email?: string;
  phone?: string;
  address?: string;
}

export interface PersonExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface PersonEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface PersonSkill {
  id: string;
  name: string;
  level?: "Básico" | "Intermediário" | "Avançado" | "Especialista";
}

export interface PersonAppearance {
  id: string;
  episodeTitle: string;
  date: string;
  status: string;
  url?: string;
}

export interface Person {
  id: string;
  name: string;
  avatarUrl?: string;
  title: string;
  company?: string;
  location?: string;
  bio?: string;
  tags: string[];
  contact: PersonContact;
  socialLinks: SocialLink[];
  experiences: PersonExperience[];
  education: PersonEducation[];
  skills: PersonSkill[];
  appearances: PersonAppearance[];
  notes?: string;
}

export const PEOPLE_DATA: Person[] = [
  {
    id: "1",
    name: "Ana Silva",
    avatarUrl: "https://github.com/yahyabedirhan.png",
    title: "Especialista em UX Design",
    company: "Design Solutions",
    location: "São Paulo, SP",
    bio: "Ana é uma especialista em UX Design com mais de 8 anos de experiência criando interfaces intuitivas e acessíveis. Ela é apaixonada por design centrado no usuário e já trabalhou com grandes empresas do setor de tecnologia.",
    tags: ["UX Design", "UI", "Pesquisa de Usuário", "Design Thinking"],
    contact: {
      email: "ana.silva@example.com",
      phone: "+55 11 98765-4321",
      address: "São Paulo, SP",
    },
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/anasilva",
        icon: LinkedinIcon,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/anasilvadesign",
        icon: InstagramIcon,
      },
      {
        platform: "Website",
        url: "https://anasilva.design",
        icon: GlobeIcon,
      },
    ],

    experiences: [
      {
        id: "exp1",
        title: "Lead UX Designer",
        company: "Design Solutions",
        startDate: "2020-03",
        current: true,
        description:
          "Lidera equipe de design e projetos de UX para clientes de grande porte.",
      },
      {
        id: "exp2",
        title: "UX Designer Senior",
        company: "TechCorp",
        startDate: "2017-05",
        endDate: "2020-02",
        current: false,
        description:
          "Responsável por pesquisa de usuário e criação de protótipos.",
      },
      {
        id: "exp3",
        title: "UI Designer",
        company: "StartApp",
        startDate: "2015-01",
        endDate: "2017-04",
        current: false,
        description: "Desenvolvimento de interfaces para aplicativos mobile.",
      },
    ],

    education: [
      {
        id: "edu1",
        institution: "Universidade de São Paulo",
        degree: "Mestrado",
        field: "Design de Interação",
        startDate: "2013",
        endDate: "2015",
        current: false,
      },
      {
        id: "edu2",
        institution: "Universidade Federal do Rio de Janeiro",
        degree: "Bacharelado",
        field: "Design Gráfico",
        startDate: "2009",
        endDate: "2013",
        current: false,
      },
    ],

    skills: [
      { id: "skill1", name: "Figma", level: "Especialista" },
      { id: "skill2", name: "Adobe XD", level: "Avançado" },
      { id: "skill3", name: "Sketch", level: "Avançado" },
      { id: "skill4", name: "Pesquisa de Usuário", level: "Especialista" },
      { id: "skill5", name: "Prototipagem", level: "Avançado" },
      { id: "skill6", name: "Design de Interação", level: "Especialista" },
    ],

    appearances: [
      {
        id: "app1",
        episodeTitle: "O Futuro do UX Design",
        date: "2023-05-15",
        status: "gravado",
        url: "https://example.com/podcast/ux-design-future",
      },
    ],

    notes:
      "Ana é muito articulada e tem ótimas ideias para futuros episódios sobre design.",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    avatarUrl: "https://github.com/furkanksl.png",
    title: "Desenvolvedor Full Stack",
    company: "TechInnovate",
    location: "Rio de Janeiro, RJ",
    bio: "Carlos é um desenvolvedor full stack com foco em tecnologias JavaScript modernas. Ele tem experiência em construir aplicações web escaláveis e é um entusiasta de código aberto.",
    tags: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
    contact: {
      email: "carlos.mendes@example.com",
      phone: "+55 21 98765-4321",
      address: "Rio de Janeiro, RJ",
    },
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/carlosmendes",
        icon: LinkedinIcon,
      },
      {
        platform: "GitHub",
        url: "https://github.com/carlosmendes",
        icon: GlobeIcon,
      },
      {
        platform: "Website",
        url: "https://carlosmendes.dev",
        icon: GlobeIcon,
      },
    ],

    experiences: [
      {
        id: "exp1",
        title: "Tech Lead",
        company: "TechInnovate",
        startDate: "2021-01",
        current: true,
        description:
          "Lidera equipe de desenvolvimento e arquitetura de projetos.",
      },
      {
        id: "exp2",
        title: "Desenvolvedor Senior",
        company: "WebSolutions",
        startDate: "2018-03",
        endDate: "2020-12",
        current: false,
        description: "Desenvolvimento de aplicações web com React e Node.js.",
      },
      {
        id: "exp3",
        title: "Desenvolvedor Frontend",
        company: "DigitalAgency",
        startDate: "2016-06",
        endDate: "2018-02",
        current: false,
        description: "Criação de interfaces responsivas e otimizadas.",
      },
    ],

    education: [
      {
        id: "edu1",
        institution: "PUC-Rio",
        degree: "Bacharelado",
        field: "Ciência da Computação",
        startDate: "2012",
        endDate: "2016",
        current: false,
      },
    ],

    skills: [
      { id: "skill1", name: "JavaScript", level: "Especialista" },
      { id: "skill2", name: "React", level: "Especialista" },
      { id: "skill3", name: "Node.js", level: "Avançado" },
      { id: "skill4", name: "TypeScript", level: "Avançado" },
      { id: "skill5", name: "AWS", level: "Intermediário" },
      { id: "skill6", name: "Docker", level: "Intermediário" },
    ],

    appearances: [
      {
        id: "app1",
        episodeTitle: "Arquitetura de Aplicações Modernas",
        date: "2023-03-10",
        status: "gravado",
        url: "https://example.com/podcast/modern-app-architecture",
      },
      {
        id: "app2",
        episodeTitle: "Tendências em JavaScript",
        date: "2023-08-22",
        status: "agendada gravação",
      },
    ],

    notes:
      "Carlos tem muito conhecimento técnico e é ótimo em explicar conceitos complexos de forma simples.",
  },
  {
    id: "3",
    name: "Mariana Costa",
    avatarUrl: "https://github.com/yahyabedirhan.png",
    title: "Especialista em Marketing Digital",
    company: "Growth Marketing",
    location: "Belo Horizonte, MG",
    bio: "Mariana é especialista em estratégias de marketing digital com foco em SEO e análise de dados. Ela ajuda empresas a aumentarem sua presença online e converterem mais leads.",
    tags: ["Marketing Digital", "SEO", "Analytics", "Growth Hacking"],
    contact: {
      email: "mariana.costa@example.com",
      address: "Belo Horizonte, MG",
    },
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/marianacosta",
        icon: LinkedinIcon,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/marianacosta",
        icon: InstagramIcon,
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/marianacosta",
        icon: YoutubeIcon,
      },
      {
        platform: "Website",
        url: "https://marianacosta.com.br",
        icon: GlobeIcon,
      },
    ],

    experiences: [
      {
        id: "exp1",
        title: "Diretora de Marketing",
        company: "Growth Marketing",
        startDate: "2019-06",
        current: true,
        description:
          "Responsável por estratégias de crescimento e aquisição de clientes.",
      },
      {
        id: "exp2",
        title: "Gerente de SEO",
        company: "DigitalBoost",
        startDate: "2017-02",
        endDate: "2019-05",
        current: false,
        description:
          "Implementação de estratégias de SEO para clientes de diversos segmentos.",
      },
    ],

    education: [
      {
        id: "edu1",
        institution: "UFMG",
        degree: "MBA",
        field: "Marketing Digital",
        startDate: "2016",
        endDate: "2018",
        current: false,
      },
      {
        id: "edu2",
        institution: "UFMG",
        degree: "Bacharelado",
        field: "Publicidade e Propaganda",
        startDate: "2012",
        endDate: "2016",
        current: false,
      },
    ],

    skills: [
      { id: "skill1", name: "SEO", level: "Especialista" },
      { id: "skill2", name: "Google Analytics", level: "Especialista" },
      { id: "skill3", name: "Content Marketing", level: "Avançado" },
      { id: "skill4", name: "Growth Hacking", level: "Avançado" },
      { id: "skill5", name: "Social Media", level: "Avançado" },
    ],

    appearances: [
      {
        id: "app1",
        episodeTitle: "Estratégias de SEO para 2023",
        date: "2023-02-20",
        status: "gravado",
        url: "https://example.com/podcast/seo-strategies-2023",
      },
      {
        id: "app2",
        episodeTitle: "Analytics e Tomada de Decisão",
        date: "2023-06-15",
        status: "gravado",
        url: "https://example.com/podcast/analytics-decision-making",
      },
    ],

    notes:
      "Mariana tem ótimos insights sobre marketing digital e é muito didática.",
  },
  {
    id: "4",
    name: "Pedro Alves",
    avatarUrl: "https://github.com/kdrnp.png",
    title: "Empreendedor e Investidor",
    company: "Startup Ventures",
    location: "Florianópolis, SC",
    bio: "Pedro é empreendedor serial e investidor anjo com foco em startups de tecnologia. Já fundou três empresas de sucesso e atualmente mentora empreendedores iniciantes.",
    tags: ["Empreendedorismo", "Startup", "Investimentos", "Inovação"],
    contact: {
      email: "pedro.alves@example.com",
      phone: "+55 48 98765-4321",
      address: "Florianópolis, SC",
    },
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/pedroalves",
        icon: LinkedinIcon,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/pedroalves",
        icon: InstagramIcon,
      },
      {
        platform: "Website",
        url: "https://pedroalves.com.br",
        icon: GlobeIcon,
      },
    ],

    experiences: [
      {
        id: "exp1",
        title: "CEO e Fundador",
        company: "Startup Ventures",
        startDate: "2018-01",
        current: true,
        description: "Fundo de investimento para startups em estágio inicial.",
      },
      {
        id: "exp2",
        title: "Co-fundador",
        company: "TechSolutions",
        startDate: "2014-03",
        endDate: "2017-12",
        current: false,
        description:
          "Startup de soluções tecnológicas para o setor financeiro. Adquirida em 2017.",
      },
      {
        id: "exp3",
        title: "Diretor de Produto",
        company: "FinTech Inc.",
        startDate: "2010-05",
        endDate: "2014-02",
        current: false,
        description:
          "Responsável pelo desenvolvimento e lançamento de produtos financeiros digitais.",
      },
    ],

    education: [
      {
        id: "edu1",
        institution: "Stanford University",
        degree: "MBA",
        field: "Business Administration",
        startDate: "2008",
        endDate: "2010",
        current: false,
      },
      {
        id: "edu2",
        institution: "UFSC",
        degree: "Bacharelado",
        field: "Engenharia de Produção",
        startDate: "2003",
        endDate: "2007",
        current: false,
      },
    ],

    skills: [
      { id: "skill1", name: "Gestão de Negócios", level: "Especialista" },
      {
        id: "skill2",
        name: "Captação de Investimentos",
        level: "Especialista",
      },
      { id: "skill3", name: "Desenvolvimento de Produto", level: "Avançado" },
      { id: "skill4", name: "Análise de Mercado", level: "Avançado" },
      { id: "skill5", name: "Mentoria", level: "Especialista" },
    ],

    appearances: [
      {
        id: "app1",
        episodeTitle: "Captação de Investimentos para Startups",
        date: "2023-04-05",
        status: "gravado",
        url: "https://example.com/podcast/startup-investments",
      },
      {
        id: "app2",
        episodeTitle: "Jornada do Empreendedor",
        date: "2023-07-12",
        status: "confirmação no dia",
      },
    ],

    notes:
      "Pedro tem uma rede de contatos muito valiosa e pode indicar outros convidados interessantes.",
  },
  {
    id: "5",
    name: "Juliana Martins",
    avatarUrl: "https://github.com/buyuktas18.png",
    title: "Psicóloga Organizacional",
    company: "Mente Corporativa",
    location: "Curitiba, PR",
    bio: "Juliana é psicóloga especializada em comportamento organizacional e desenvolvimento de lideranças. Ela trabalha com grandes empresas para melhorar o ambiente de trabalho e a produtividade das equipes.",
    tags: ["Psicologia", "Liderança", "RH", "Desenvolvimento Pessoal"],
    contact: {
      email: "juliana.martins@example.com",
      phone: "+55 41 98765-4321",
      address: "Curitiba, PR",
    },
    socialLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/julianamartins",
        icon: LinkedinIcon,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/julianamartins",
        icon: InstagramIcon,
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/julianamartins",
        icon: YoutubeIcon,
      },
      {
        platform: "Website",
        url: "https://julianamartins.com.br",
        icon: GlobeIcon,
      },
    ],

    experiences: [
      {
        id: "exp1",
        title: "Fundadora e CEO",
        company: "Mente Corporativa",
        startDate: "2017-08",
        current: true,
        description:
          "Consultoria em psicologia organizacional e desenvolvimento de lideranças.",
      },
      {
        id: "exp2",
        title: "Gerente de RH",
        company: "Multinacional Corp",
        startDate: "2013-04",
        endDate: "2017-07",
        current: false,
        description:
          "Responsável por programas de desenvolvimento de talentos e cultura organizacional.",
      },
      {
        id: "exp3",
        title: "Psicóloga Organizacional",
        company: "Consultoria RH",
        startDate: "2010-02",
        endDate: "2013-03",
        current: false,
        description:
          "Avaliação psicológica e desenvolvimento de programas de treinamento.",
      },
    ],

    education: [
      {
        id: "edu1",
        institution: "USP",
        degree: "Mestrado",
        field: "Psicologia Organizacional",
        startDate: "2008",
        endDate: "2010",
        current: false,
      },
      {
        id: "edu2",
        institution: "UFPR",
        degree: "Bacharelado",
        field: "Psicologia",
        startDate: "2003",
        endDate: "2007",
        current: false,
      },
    ],

    skills: [
      {
        id: "skill1",
        name: "Desenvolvimento de Lideranças",
        level: "Especialista",
      },
      { id: "skill2", name: "Gestão de Conflitos", level: "Especialista" },
      { id: "skill3", name: "Avaliação Psicológica", level: "Avançado" },
      {
        id: "skill4",
        name: "Treinamento e Desenvolvimento",
        level: "Especialista",
      },
      { id: "skill5", name: "Coaching", level: "Avançado" },
    ],

    appearances: [
      {
        id: "app1",
        episodeTitle: "Saúde Mental no Trabalho",
        date: "2023-01-25",
        status: "gravado",
        url: "https://example.com/podcast/mental-health-work",
      },
      {
        id: "app2",
        episodeTitle: "Desenvolvimento de Líderes",
        date: "2023-05-30",
        status: "gravado",
        url: "https://example.com/podcast/leadership-development",
      },
    ],

    notes:
      "Juliana é muito carismática e consegue explicar conceitos complexos de forma acessível.",
  },
];

export const getPersonById = (id: string): Person | undefined => {
  return PEOPLE_DATA.find((person) => person.id === id);
};

export const getPersonsByTag = (tag: string): Person[] => {
  return PEOPLE_DATA.filter((person) =>
    person.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getPersonsByStatus = (status: string): Person[] => {
  return PEOPLE_DATA.filter((person) =>
    person.appearances.some((appearance) => appearance.status === status)
  );
};
