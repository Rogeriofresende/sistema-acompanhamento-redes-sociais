# Sistema Lancei Essa

[![Test Backend](https://github.com/Lancei-Essa/Sistema-Lancei-Essa/actions/workflows/test.yml/badge.svg)](https://github.com/Lancei-Essa/Sistema-Lancei-Essa/actions/workflows/test.yml)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/rogerioresende/sistema-lancei-essa/actions) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) 
[![Contribua](https://img.shields.io/badge/contribua-GitHub-blue)](./CONTRIBUTING.md)

Um sistema fullstack para integração com Google/YouTube, autenticação via Google e dashboard de dados.

> **Obs.:** Os badges acima são exemplos. Adapte a URL do badge de build conforme o CI/CD do seu repositório (GitHub Actions, GitLab CI, etc).

---

## ✨ Visão Geral

- **Frontend:** React + Vite + TypeScript (pasta `polymet-app`)
- **Backend:** Node.js + Express + Prisma (pasta `backend`)
- **Banco:** PostgreSQL (padrão, mas pode ser adaptado)
- **Autenticação:** Google OAuth2 (One Tap)
- **Integração:** API do YouTube

---

## 📁 Estrutura de Pastas

```
/Sistema_Lancei_Essa_unzipped
  /backend           # API, autenticação, integração YouTube, Prisma
    /src
      /controllers
      /routes
      /middlewares
      /services
      app.js
      server.js
    /prisma
    /generated
    package.json
    .env.example
  /polymet-app       # Frontend React
    /src
      /components/ui # Componentes genéricos de UI
      /features      # Features, páginas, componentes de domínio
      /hooks
      /lib
      /assets
      App.tsx
      main.tsx
    package.json
    .env.example
  /scripts           # Scripts utilitários
  README.md
  GUIA_DE_DESENVOLVIMENTO.md
```

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- npm 9+
- PostgreSQL rodando (ou SQLite, se preferir)

### 1. Backend
```bash
cd Sistema_Lancei_Essa_unzipped/backend
cp .env.example .env # Edite com seus dados
npm install
npx prisma migrate dev # Rodar migrations
npm start
# Backend em http://localhost:4000
```

### 2. Frontend
```bash
cd Sistema_Lancei_Essa_unzipped/polymet-app
cp .env.example .env # Edite com seu GOOGLE_CLIENT_ID
npm install
npm run dev
# Frontend em http://localhost:5173
```

---

## 🚀 Deploy

### URLs de Produção
- **Frontend:** https://sistema-lancei-essa-9jra357as-lancei-essas-projects.vercel.app
- **Backend:** https://lancei-essa-sistema-front.onrender.com

### Configuração do Google OAuth
1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. No projeto, vá em "Credentials" > "OAuth 2.0 Client IDs"
3. Edite o Client ID usado no frontend
4. Em "Authorized JavaScript origins", adicione:
   ```
   https://sistema-lancei-essa-9jra357as-lancei-essas-projects.vercel.app
   ```
5. Em "Authorized redirect URIs", adicione:
   ```
   https://sistema-lancei-essa-9jra357as-lancei-essas-projects.vercel.app/auth/callback
   ```

### Deploy Automático
- **Backend:** Configurado no Render, dispara a cada push no branch main
- **Frontend:** Configurado no Vercel, dispara a cada push no branch main
- Use o script `push_automatico.sh` para fazer deploy:
  ```bash
  ./push_automatico.sh "Sua mensagem de commit"
  ```

### Variáveis de Ambiente em Produção
- **Backend (Render):**
  ```
  DATABASE_URL=
  JWT_SECRET=
  GOOGLE_CLIENT_ID=
  YOUTUBE_CLIENT_ID=
  YOUTUBE_CLIENT_SECRET=
  YOUTUBE_REDIRECT_URI=
  ```

- **Frontend (Vercel):**
  ```
  VITE_GOOGLE_CLIENT_ID=
  VITE_API_URL=https://lancei-essa-sistema-front.onrender.com
  VITE_AUTH_URL=https://lancei-essa-sistema-front.onrender.com
  ```

---

## ⚙️ Variáveis de Ambiente

### Backend (`backend/.env`)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lancei_essa_db"
JWT_SECRET="sua-chave-secreta"
GOOGLE_CLIENT_ID="seu-google-client-id"
YOUTUBE_CLIENT_ID="seu-youtube-client-id"
YOUTUBE_CLIENT_SECRET="seu-youtube-client-secret"
YOUTUBE_REDIRECT_URI="http://localhost:4000/api/auth/youtube/callback"
```

### Frontend (`polymet-app/.env`)
```
VITE_GOOGLE_CLIENT_ID="seu-google-client-id"
```

---

## 🛠️ Boas práticas
- Nunca exponha secrets em repositórios públicos.
- Use `.env.example` para facilitar onboarding.
- Separe lógica de domínio em `features` no frontend.
- Use controllers, services e middlewares no backend.
- Rode sempre o backend e frontend em localhost para evitar problemas de CORS/cookies.
- Atualize a documentação conforme o projeto evoluir.

---

## 📚 Documentação e Dicas
- Veja `GUIA_DE_DESENVOLVIMENTO.md` para detalhes de autenticação Google, proxy Vite, dicas de segurança e troubleshooting.
- Para dúvidas sobre integração Google/YouTube, consulte a documentação oficial do Google Identity Services e YouTube API.

---

## 🤝 Contribuição
Pull requests são bem-vindos! Siga as boas práticas de commit, branches e documentação.

---

## 📝 Licença
Defina a licença do projeto conforme sua necessidade. 

---

## 🩺 Operação e Monitoramento

### Healthcheck
- O backend expõe o endpoint `/health` para monitoramento de saúde.
- Exemplo de uso:
  ```sh
  curl http://localhost:4000/health
  # Resposta esperada: { "status": "ok", "timestamp": "..." }
  ```
- Use este endpoint para healthchecks em load balancer, Prometheus, etc.

### Métricas Prometheus
- O backend expõe o endpoint `/metrics` com métricas básicas (CPU, memória, requests).
- Exemplo de uso:
  ```sh
  curl http://localhost:4000/metrics
  # Resposta: métricas no formato Prometheus
  ```
- Para monitorar com Prometheus:
  1. Instale Prometheus localmente.
  2. Adicione ao seu `prometheus.yml`:
     ```yaml
     scrape_configs:
       - job_name: 'lancei_essa_backend'
         static_configs:
           - targets: ['localhost:4000']
     ```
  3. Acesse o dashboard do Prometheus em `http://localhost:9090`.

### Backup e Restauração do Banco
- Backup automático sugerido (cron):
  ```sh
  0 2 * * * pg_dump -U postgres -h localhost lancei_essa_db > /backups/lancei_essa_db_$(date +\%F).sql
  ```
- Para restaurar:
  ```sh
  psql -U postgres -d lancei_essa_db_restored < /backups/lancei_essa_db_2024-05-25.sql
  ```

### Segurança e Limites
- O backend já está protegido com:
  - Rate limiting (`express-rate-limit`)
  - Headers de segurança (`helmet`)
  - CORS configurado
- Dependabot/Snyk ativados para alertas de vulnerabilidades de dependências.

### Testes de Healthcheck no CI
- Recomenda-se adicionar testes automatizados para `/health` e `/metrics` no pipeline de CI.

---
