# 🏗️ **VISÃO GERAL DO SISTEMA - ARQUITETURA COMPLETA**

**Data de Criação:** 29/01/2025  
**Última Atualização:** 29/01/2025  
**Versão:** 1.0  
**Responsável:** AI Assistant  
**Status:** ✅ Ativo

---

## 🎯 **OBJETIVO**

Este documento apresenta uma visão abrangente da arquitetura do Sistema Lancei Essa através de diagramas visuais avançados, facilitando a compreensão da estrutura e fluxos do sistema.

---

## 🏗️ **ARQUITETURA GERAL DO SISTEMA**

### 🔧 **Diagrama de Alto Nível**
```mermaid
graph TB
    subgraph "Frontend Layer"
        React[React App<br/>Vite + TypeScript]
        UI[UI Components<br/>Shadcn/ui]
        Auth[Auth Context<br/>Google OAuth]
    end
    
    subgraph "API Gateway"
        Express[Express.js<br/>Node.js Server]
        CORS[CORS Middleware]
        AuthMW[Auth Middleware<br/>JWT Validation]
    end
    
    subgraph "Business Logic"
        AuthCtrl[Auth Controller<br/>Google OAuth]
        UserCtrl[User Controller<br/>Profile Management]
        YTCtrl[YouTube Controller<br/>Analytics API]
        GuestCtrl[Guest Controller<br/>Podcast Management]
    end
    
    subgraph "Data Layer"
        Prisma[Prisma ORM<br/>Database Interface]
        SQLite[(SQLite Database<br/>Development)]
        PostgreSQL[(PostgreSQL<br/>Production)]
    end
    
    subgraph "External Services"
        Google[Google OAuth 2.0<br/>Authentication]
        YouTube[YouTube Analytics API<br/>Channel Data]
        Gmail[Gmail API<br/>Notifications]
    end
    
    subgraph "Infrastructure"
        Nginx[Nginx<br/>Web Server]
        PM2[PM2<br/>Process Manager]
        Logger[Winston Logger<br/>Centralized Logs]
        Monitor[Prometheus<br/>Metrics Collection]
    end
    
    %% Connections
    React --> Express
    UI --> React
    Auth --> React
    
    Express --> CORS
    CORS --> AuthMW
    AuthMW --> AuthCtrl
    AuthMW --> UserCtrl
    AuthMW --> YTCtrl
    AuthMW --> GuestCtrl
    
    AuthCtrl --> Prisma
    UserCtrl --> Prisma
    YTCtrl --> Prisma
    GuestCtrl --> Prisma
    
    Prisma --> SQLite
    Prisma --> PostgreSQL
    
    AuthCtrl --> Google
    YTCtrl --> YouTube
    AuthCtrl --> Gmail
    
    Nginx --> Express
    PM2 --> Express
    Express --> Logger
    Express --> Monitor
    
    %% Styling
    classDef frontend fill:#e1f5fe
    classDef api fill:#f3e5f5
    classDef business fill:#e8f5e8
    classDef data fill:#fff3e0
    classDef external fill:#fce4ec
    classDef infra fill:#f1f8e9
    
    class React,UI,Auth frontend
    class Express,CORS,AuthMW api
    class AuthCtrl,UserCtrl,YTCtrl,GuestCtrl business
    class Prisma,SQLite,PostgreSQL data
    class Google,YouTube,Gmail external
    class Nginx,PM2,Logger,Monitor infra
```

---

## 🔄 **FLUXO DE DADOS PRINCIPAL**

### 📊 **Jornada Completa do Usuário**
```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant F as 🖥️ Frontend
    participant API as 🔌 API Gateway
    participant Auth as 🔐 Auth Service
    participant YT as 📺 YouTube API
    participant DB as 🗄️ Database
    participant UI as 📊 Dashboard
    
    Note over U,UI: 1. Autenticação
    U->>F: Acessa aplicação
    F->>U: Mostra tela de login
    U->>F: Clica "Login com Google"
    F->>Auth: Inicia OAuth flow
    Auth->>U: Redireciona para Google
    U->>Auth: Autoriza aplicação
    Auth->>API: Valida token Google
    API->>DB: Salva/atualiza usuário
    API->>F: Retorna JWT
    F->>UI: Redireciona para dashboard
    
    Note over U,UI: 2. Conexão YouTube
    U->>UI: Clica "Conectar YouTube"
    UI->>API: POST /api/youtube/connect
    API->>YT: Gera URL OAuth
    YT->>U: Tela autorização
    U->>YT: Autoriza canal
    YT->>API: Callback com code
    API->>YT: Troca code por tokens
    API->>DB: Salva tokens + canal
    API->>UI: Sucesso + dados canal
    
    Note over U,UI: 3. Visualização Analytics
    U->>UI: Acessa métricas
    UI->>API: GET /api/youtube/analytics
    API->>DB: Busca tokens usuário
    API->>YT: Solicita métricas
    YT->>API: Retorna dados analytics
    API->>DB: Cache dos dados
    API->>UI: Métricas formatadas
    UI->>U: Dashboard atualizado
```

---

## 🔐 **ARQUITETURA DE SEGURANÇA**

### 🛡️ **Camadas de Proteção**
```mermaid
graph TD
    subgraph "Frontend Security"
        CSP[Content Security Policy]
        HTTPS[HTTPS Enforcement]
        SameSite[SameSite Cookies]
    end
    
    subgraph "API Security"
        Helmet[Helmet.js Headers]
        RateLimit[Rate Limiting]
        CORS_SEC[CORS Policy]
        JWT_VAL[JWT Validation]
    end
    
    subgraph "Authentication Flow"
        GoogleOAuth[Google OAuth 2.0]
        TokenGen[JWT Generation]
        TokenRef[Token Refresh]
        Logout[Secure Logout]
    end
    
    subgraph "Data Protection"
        Encrypt[Data Encryption]
        Audit[Audit Logging]
        Backup[Secure Backups]
        Access[Access Control]
    end
    
    subgraph "Infrastructure Security"
        Firewall[Network Firewall]
        SSL[SSL Certificates]
        Monitor[Security Monitoring]
        Updates[Auto Updates]
    end
    
    %% Security Flow
    CSP --> Helmet
    HTTPS --> RateLimit
    SameSite --> CORS_SEC
    
    CORS_SEC --> GoogleOAuth
    JWT_VAL --> TokenGen
    RateLimit --> TokenRef
    
    TokenGen --> Encrypt
    GoogleOAuth --> Audit
    TokenRef --> Access
    
    Encrypt --> Firewall
    Audit --> SSL
    Access --> Monitor
    Backup --> Updates
    
    %% Styling
    classDef frontend fill:#ffebee
    classDef api fill:#e8f5e8
    classDef auth fill:#e3f2fd
    classDef data fill:#fff3e0
    classDef infra fill:#f1f8e9
    
    class CSP,HTTPS,SameSite frontend
    class Helmet,RateLimit,CORS_SEC,JWT_VAL api
    class GoogleOAuth,TokenGen,TokenRef,Logout auth
    class Encrypt,Audit,Backup,Access data
    class Firewall,SSL,Monitor,Updates infra
```

---

## 🗄️ **MODELO DE DADOS DETALHADO**

### 📊 **Relacionamentos entre Entidades**
```mermaid
erDiagram
    User {
        uuid id PK
        string email UK
        string name
        string googleId UK
        datetime createdAt
        datetime updatedAt
        boolean isActive
        json profile
    }
    
    YouTubeChannel {
        uuid id PK
        uuid userId FK
        string channelId UK
        string title
        string description
        int subscriberCount
        string thumbnailUrl
        datetime connectedAt
        datetime lastSyncAt
        boolean isActive
    }
    
    YouTubeToken {
        uuid id PK
        uuid userId FK
        text accessToken
        text refreshToken
        datetime expiresAt
        datetime createdAt
        boolean isValid
        json scopes
    }
    
    Guest {
        uuid id PK
        uuid userId FK
        string name
        string email
        string company
        string role
        text bio
        string status
        datetime createdAt
        datetime updatedAt
        json socialLinks
        json tags
    }
    
    PodcastEpisode {
        uuid id PK
        uuid userId FK
        uuid guestId FK
        string title
        text description
        string status
        datetime recordedAt
        datetime publishedAt
        string youtubeVideoId
        json analytics
        json metadata
    }
    
    Analytics {
        uuid id PK
        uuid channelId FK
        date date
        int views
        int subscribers
        int likes
        int comments
        float watchTime
        float engagement
        json demographics
        json trafficSources
    }
    
    AuditLog {
        uuid id PK
        uuid userId FK
        string action
        string resource
        json oldValues
        json newValues
        string ipAddress
        string userAgent
        datetime timestamp
    }
    
    %% Relationships
    User ||--o{ YouTubeChannel : owns
    User ||--|| YouTubeToken : has
    User ||--o{ Guest : manages
    User ||--o{ PodcastEpisode : creates
    User ||--o{ AuditLog : generates
    
    YouTubeChannel ||--o{ Analytics : generates
    YouTubeChannel ||--o{ PodcastEpisode : hosts
    
    Guest ||--o{ PodcastEpisode : participates
    
    PodcastEpisode ||--o{ Analytics : tracks
```

---

## 🚀 **FLUXO DE DEPLOYMENT**

### 📦 **Pipeline CI/CD**
```mermaid
graph LR
    subgraph "Development"
        Dev[👨‍💻 Developer]
        Git[📝 Git Commit]
        PR[🔄 Pull Request]
    end
    
    subgraph "CI Pipeline"
        GHA[⚙️ GitHub Actions]
        Test[🧪 Run Tests]
        Build[🏗️ Build App]
        Lint[✅ Code Quality]
    end
    
    subgraph "Staging"
        Deploy_STG[🚀 Deploy Staging]
        Test_STG[🔍 E2E Tests]
        Review[👁️ Manual Review]
    end
    
    subgraph "Production"
        Deploy_PROD[🌐 Deploy Production]
        Health[🏥 Health Checks]
        Monitor[📊 Monitoring]
        Rollback[⏪ Rollback Plan]
    end
    
    subgraph "Infrastructure"
        Docker[🐳 Docker Containers]
        Nginx[🌐 Nginx Proxy]
        DB[🗄️ Database]
        Logs[📝 Centralized Logs]
    end
    
    %% Flow
    Dev --> Git
    Git --> PR
    PR --> GHA
    
    GHA --> Test
    Test --> Build
    Build --> Lint
    Lint --> Deploy_STG
    
    Deploy_STG --> Test_STG
    Test_STG --> Review
    Review --> Deploy_PROD
    
    Deploy_PROD --> Health
    Health --> Monitor
    Monitor --> Rollback
    
    Deploy_PROD --> Docker
    Docker --> Nginx
    Nginx --> DB
    DB --> Logs
    
    %% Styling
    classDef dev fill:#e1f5fe
    classDef ci fill:#f3e5f5
    classDef staging fill:#e8f5e8
    classDef prod fill:#fff3e0
    classDef infra fill:#fce4ec
    
    class Dev,Git,PR dev
    class GHA,Test,Build,Lint ci
    class Deploy_STG,Test_STG,Review staging
    class Deploy_PROD,Health,Monitor,Rollback prod
    class Docker,Nginx,DB,Logs infra
```

---

## 📊 **MONITORAMENTO E OBSERVABILIDADE**

### 🔍 **Stack de Observabilidade**
```mermaid
graph TB
    subgraph "Application Layer"
        App[Sistema Lancei Essa]
        Metrics[Prometheus Metrics]
        Logs[Winston Logs]
        Traces[Request Tracing]
    end
    
    subgraph "Collection Layer"
        Prometheus[Prometheus Server]
        Loki[Loki Log Aggregation]
        Jaeger[Jaeger Tracing]
        Alertmanager[Alert Manager]
    end
    
    subgraph "Visualization Layer"
        Grafana[Grafana Dashboards]
        Kibana[Kibana Log Search]
        Alerts[Slack/Email Alerts]
    end
    
    subgraph "Storage Layer"
        PromDB[(Prometheus DB)]
        LokiDB[(Loki Storage)]
        JaegerDB[(Jaeger Storage)]
    end
    
    %% Connections
    App --> Metrics
    App --> Logs
    App --> Traces
    
    Metrics --> Prometheus
    Logs --> Loki
    Traces --> Jaeger
    
    Prometheus --> Alertmanager
    Prometheus --> Grafana
    Loki --> Kibana
    Jaeger --> Grafana
    
    Alertmanager --> Alerts
    
    Prometheus --> PromDB
    Loki --> LokiDB
    Jaeger --> JaegerDB
    
    %% Styling
    classDef app fill:#e1f5fe
    classDef collection fill:#f3e5f5
    classDef visualization fill:#e8f5e8
    classDef storage fill:#fff3e0
    
    class App,Metrics,Logs,Traces app
    class Prometheus,Loki,Jaeger,Alertmanager collection
    class Grafana,Kibana,Alerts visualization
    class PromDB,LokiDB,JaegerDB storage
```

---

## 🌐 **ARQUITETURA DE REDE**

### 🔧 **Infraestrutura de Produção**
```mermaid
graph TB
    subgraph "Internet"
        Users[👥 Users]
        CDN[🌐 CDN/CloudFlare]
    end
    
    subgraph "DMZ Zone"
        LB[⚖️ Load Balancer]
        WAF[🛡️ Web Application Firewall]
        SSL[🔒 SSL Termination]
    end
    
    subgraph "Application Zone"
        Nginx1[🌐 Nginx 1]
        Nginx2[🌐 Nginx 2]
        App1[⚙️ Node.js App 1]
        App2[⚙️ Node.js App 2]
        App3[⚙️ Node.js App 3]
    end
    
    subgraph "Data Zone"
        PostgreSQL[(🗄️ PostgreSQL Primary)]
        PostgreSQL_Read[(📖 PostgreSQL Replica)]
        Redis[(⚡ Redis Cache)]
        Backup[(💾 Backup Storage)]
    end
    
    subgraph "Monitoring Zone"
        Prometheus[📊 Prometheus]
        Grafana[📈 Grafana]
        Logs[📝 Log Aggregator]
    end
    
    %% Network Flow
    Users --> CDN
    CDN --> LB
    LB --> WAF
    WAF --> SSL
    
    SSL --> Nginx1
    SSL --> Nginx2
    
    Nginx1 --> App1
    Nginx1 --> App2
    Nginx2 --> App2
    Nginx2 --> App3
    
    App1 --> PostgreSQL
    App2 --> PostgreSQL
    App3 --> PostgreSQL
    
    App1 --> Redis
    App2 --> Redis
    App3 --> Redis
    
    PostgreSQL --> PostgreSQL_Read
    PostgreSQL --> Backup
    
    App1 --> Prometheus
    App2 --> Prometheus
    App3 --> Prometheus
    
    Prometheus --> Grafana
    App1 --> Logs
    App2 --> Logs
    App3 --> Logs
    
    %% Styling
    classDef internet fill:#e1f5fe
    classDef dmz fill:#fff3e0
    classDef app fill:#e8f5e8
    classDef data fill:#f3e5f5
    classDef monitoring fill:#fce4ec
    
    class Users,CDN internet
    class LB,WAF,SSL dmz
    class Nginx1,Nginx2,App1,App2,App3 app
    class PostgreSQL,PostgreSQL_Read,Redis,Backup data
    class Prometheus,Grafana,Logs monitoring
```

---

## 🔗 **LINKS RELACIONADOS**

### 📚 **Documentação Técnica**
- [Database Schema](database-schema.md)
- [API Authentication](../api/authentication.md)
- [YouTube Integration](../api/youtube-integration.md)

### 🛠️ **Código Fonte**
- [Backend Architecture](../../../backend/src/)
- [Frontend Components](../../../apps/frontend/src/)
- [Infrastructure Config](../../../config/)

### 📊 **Operações**
- [Deployment Guide](../../operations/deployment.md)
- [Monitoring Setup](../../operations/monitoring.md)

---

**🏗️ Uma arquitetura bem documentada é a base para um sistema escalável e mantível!** 