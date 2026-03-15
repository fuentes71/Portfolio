export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Course {
  name: string;
  institution: string;
}

export interface UIContent {
  hero: {
    im: string;
  };
  about: {
    title: string;
    hello: string;
    expert: string;
    download: string;
    fields: {
      name: string;
      age: string;
      address: string;
      email: string;
    };
    ageValue: string;
    addressValue: string;
  };
  services: {
    title: string;
    sub: string;
    items: {
      title: string;
      desc: string;
      color?: string;
    }[];
  };
  projects: {
    title: string;
    btn: string;
    items: {
      title: string;
      tech: string[];
      desc: string;
      image: string;
      size: 'small' | 'large';
      type: 'real' | 'study';
    }[];
  };
  experience: {
    title: string;
  };
  nav: {
    label: string;
    href: string;
  }[];
  terminal: {
    boot: string[];
    welcome: string;
    question: string;
    loading: string;
    abort: string;
    footer: {
      tab: string;
      click: string;
      esc: string;
    };
    labels: {
      email: string;
      phone: string;
      github: string;
      title: string;
    };
  };
  footer: {
    copyright: string;
  };
}

export interface LanguageContent {
  titles: string[];
  profile: string;
  experience: Experience[];
  education: Education[];
  courses: Course[];
  ui: UIContent;
}

export interface PortfolioData {
  name: string;
  contact: {
    phone: string;
    email: string;
  };
  pt: LanguageContent;
  en: LanguageContent;
}

export const portfolioData: PortfolioData = {
  name: "Matheus Fuentes Pereira",
  contact: {
    phone: "+55 53 99159-6496",
    email: "matheus.fu.p@hotmail.com"
  },
  pt: {
    titles: ["Engenheiro Full Stack", "Engenheiro de Software"],
    profile: `Engenheiro de Software com mais de 2 anos de experiência no desenvolvimento de sistemas distribuídos, APIs escaláveis e aplicações orientadas a dados, atuando principalmente com Node.js, TypeScript e Nest.JS.`,
    experience: [
      {
        role: "Engenheiro de Software",
        company: "Concert Technologies",
        period: "Mar 2025 — Dez 2025",
        description: [
          "Desenvolvimento de plataforma IoT para telemetria em tempo real de máquinas e frotas.",
          "Desenvolvimento de microserviços e APIs REST com Node.js, TypeScript e NestJS.",
          "Implementação de mensageria com Kafka e MQTT para integração com dispositivos IoT.",
          "Desenvolvimento de funcionalidades front-end com Angular, incluindo visualização geoespacial e mapas de calor.",
          "Utilização de PostgreSQL, MongoDB e Redis para persistência e otimização de performance de dados.",
          "Infraestrutura e deploy utilizando Docker, Kubernetes e AWS.",
          "Implementação de pipelines CI/CD e suporte a incidentes em produção."
        ]
      },
      {
        role: "Desenvolvedor Front-end",
        company: "Freelance",
        period: "Mar 2025 — Maio 2025",
        description: [
          "Desenvolvimento de landing page para plataforma de rastreamento de encomendas.",
          "Implementação com React.js e Tailwind CSS utilizando abordagem mobile-first.",
          "Componentização e arquitetura reutilizável de frontend.",
          "Integração com APIs REST para exibição de dados em tempo real."
        ]
      },
      {
        role: "Desenvolvedor Full Stack",
        company: "Growdev",
        period: "Fev 2024 — Mar 2025",
        description: [
          "Desenvolvimento de sistema MES para monitoramento de produção em tempo real.",
          "Backend com Node.js, TypeScript e NestJS utilizando arquitetura de microserviços.",
          "Implementação de Test Driven Development (TDD) with mais de 200 testes automatizados.",
          "Desenvolvimento de interfaces industriais utilizando Angular.",
          "Configuração de ambientes com Docker e otimização do fluxo de deploy.",
          "Desenvolvimento de APIs REST e integração entre sistemas."
        ]
      }
    ],

    education: [
      { institution: "Anhanguera", degree: "Engenharia de Software", period: "Maio 2025 — Dez 2028" }
    ],
    courses: [
      { name: "Desenvolvimento frontend React", institution: "Eureka & Origamid" }
    ],
    ui: {
      hero: { im: "Eu Sou" },
      about: {
        title: "Sobre Mim",
        hello: "Olá, Eu Sou",
        expert: "Especialista em construir sistemas de alta performance.",
        download: "Baixar CV",
        fields: { name: "Nome", age: "Idade", address: "Endereço", email: "E-mail" },
        ageValue: `${new Date().getFullYear() - 2000} Anos`,
        addressValue: "Pelotas-RS, Brasil"
      },
      services: {
        title: "Meus Serviços",
        sub: "Ofereço soluções modernas para web e sistemas distribuídos.",
        items: [
          { title: "Desenvolvimento Full-Stack", desc: "Aplicações de ponta a ponta com foco em performance." },
          { title: "Arquitetura de Sistemas", desc: "Design de infraestruturas robustas e escaláveis." },
          { title: "Cloud & DevOps", desc: "Deploy automatizado e gerenciamento de nuvem." }
        ]
      },
    projects: {
        title: "Projetos em Destaque",
        btn: "Ver Detalhes",
        items: [
          {
            title: "Sentinel Platform", tech: ["Node.js", "NestJS"], desc: "Monitoramento IoT em tempo real.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=800&q=80", size: "large", type: "real"
          },
          {
            title: "Cloud Streamer", tech: ["Kafka", "Docker"], desc: "Pipeline de streaming de dados.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=800&q=80", size: "small", type: "real"
          },
          {
            title: "Neural Mesh", tech: ["Python", "TensorFlow"], desc: "Rede neural para análise preditiva.",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?fit=crop&w=800&q=80", size: "small", type: "study"
          },
          {
            title: "Cyber Shield", tech: ["Go", "Kubernetes"], desc: "Sistema de defesa contra invasões.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fit=crop&w=800&q=80", size: "large", type: "real"
          },
          {
            title: "Data Vortex", tech: ["Spark", "Scala"], desc: "Processamento de Big Data em escala.",
            image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?fit=crop&w=800&q=80", size: "small", type: "study"
          },
          {
            title: "Quantum Ledger", tech: ["Rust", "Solidity"], desc: "Protocolo de finanças descentralizadas.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?fit=crop&w=800&q=80", size: "small", type: "study"
          }
        ]
      },
      experience: { title: "Experiência Profissional" },
      nav: [
        { label: "Início", href: "#home" },
        { label: "Sobre", href: "#about" },
        { label: "Serviços", href: "#services" },
        { label: "Projetos", href: "#projects" }
      ],
      terminal: {
        boot: [
          "Inicializando módulos do sistema...",
          "Carregando payload do portfólio...",
          "Estabelecendo conexão segura...",
          "Kernel 6.1.0-STABLE carregado com sucesso.",
          "Montando /dev/sda1 em /home/matheus...",
          "Iniciando interface... [OK]"
        ],
        welcome: "Bem-vindo ao terminal do portfólio do Matheus! Digite 'help' para comandos disponíveis.",
        question: "Deseja ver mais informações? (Y/n)",
        loading: "Iniciando carregamento da interface gráfica...",
        abort: "Operação cancelada. Comando não reconhecido.",
        footer: { tab: "Navegar", click: "Abrir Link", esc: "Sair" },
        labels: { email: "E-mail:", phone: "Telefone:", github: "GitHub:", title: "terminal — Portfólio" }
      },
      footer: { copyright: "Professional Portfolio GUI." }
    }
  },
  en: {
    titles: ["Full Stack Engineer", "Software Engineer"],
    profile: `Software Engineer with over 2 years of experience developing distributed systems, scalable APIs, and data-driven applications.`,
    experience: [
      {
        role: "Software Engineer",
        company: "Concert Technologies",
        period: "Mar 2025 — Dec 2025",
        description: [
          "Development of an IoT platform for real-time telemetry.",
          "Development of microservices and REST APIs with Node.js.",
          "Implementation of messaging with Kafka and MQTT."
        ]
      },
      {
        role: "Front-end Developer",
        company: "Freelance",
        period: "Mar 2025 — May 2025",
        description: [
          "Landing page development for parcel tracking.",
          "Implementation with React.js and Tailwind CSS."
        ]
      }
    ],
    education: [
      { institution: "Anhanguera", degree: "Software Engineering", period: "May 2025 — Dec 2028" }
    ],
    courses: [
      { name: "React Front-end Development", institution: "Eureka & Origamid" }
    ],
    ui: {
      hero: { im: "I Am" },
      about: {
        title: "About Me",
        hello: "Hello, I Am",
        expert: "Expert in building high-performance systems.",
        download: "Download CV",
        fields: { name: "Name", age: "Age", address: "Address", email: "Email" },
        ageValue: `${new Date().getFullYear() - 2000} Years`,
        addressValue: "Pelotas-RS, Brazil"
      },
      services: {
        title: "My Services",
        sub: "I provide modern web and distributed systems solutions.",
        items: [
          { title: "Full-Stack Development", desc: "End-to-end applications with performance focus." },
          { title: "System Architecture", desc: "Designing robust and scalable infrastructures." },
          { title: "Cloud & DevOps", desc: "Automated deployment and cloud management." }
        ]
      },
      projects: {
        title: "Featured Projects",
        btn: "View Details",
        items: [
          {
            title: "Sentinel Platform", tech: ["Node.js", "NestJS"], desc: "Real-time IoT monitoring.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=800&q=80", size: "large", type: "real"
          },
          {
            title: "Cloud Streamer", tech: ["Kafka", "Docker"], desc: "Data streaming pipeline.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?fit=crop&w=800&q=80", size: "small", type: "real"
          },
          {
            title: "Neural Mesh", tech: ["Python", "TensorFlow"], desc: "Neural network for predictive analysis.",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?fit=crop&w=800&q=80", size: "small", type: "study"
          },
          {
            title: "Cyber Shield", tech: ["Go", "Kubernetes"], desc: "Intrusion defense system.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fit=crop&w=800&q=80", size: "large", type: "real"
          },
          {
            title: "Data Vortex", tech: ["Spark", "Scala"], desc: "Scalable Big Data processing.",
            image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?fit=crop&w=800&q=80", size: "small", type: "study"
          },
          {
            title: "Quantum Ledger", tech: ["Rust", "Solidity"], desc: "Decentralized finance protocol.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?fit=crop&w=800&q=80", size: "small", type: "study"
          }
        ]
      },
      experience: { title: "Professional Experience" },
      nav: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" }
      ],
      terminal: {
        boot: [
          "Initializing system modules...",
          "Loading portfolio payload...",
          "Establishing secure connection...",
          "Kernel 6.1.0-STABLE loaded successfully.",
          "Mounting /dev/sda1 at /home/matheus...",
          "Starting interface... [OK]"
        ],
        welcome: "Welcome to Matheus's portfolio terminal! Type 'help' for available commands.",
        question: "Do you want to see more information? (Y/n)",
        loading: "Starting GUI interface loading...",
        abort: "Operation cancelled. Command not recognized.",
        footer: { tab: "Navigate", click: "Open Link", esc: "Exit" },
        labels: { email: "Email:", phone: "Phone:", github: "GitHub:", title: "terminal — Portfolio" }
      },
      footer: { copyright: "Professional Portfolio GUI." }
    }
  }
};
