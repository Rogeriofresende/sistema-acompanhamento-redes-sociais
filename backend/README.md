# Backend - Sistema Lancei Essa

API Node.js/Express para autenticação Google, integração com YouTube e gerenciamento de usuários.

---

## 🚀 Como rodar

```bash
cd backend
cp .env.example .env # Edite com seus dados
npm install
npx prisma migrate dev # Rodar migrations
npm start
# Backend em http://localhost:4000
```

---

## ⚙️ Variáveis de Ambiente
Veja `.env.example` para todos os campos necessários:

```
DATABASE_URL=...
JWT_SECRET=...
GOOGLE_CLIENT_ID=...
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REDIRECT_URI=...
```

---

## 🔐 Fluxo de Autenticação Google
1. O frontend obtém o `id_token` do Google.
2. Envia para `POST /api/auth/google`.
3. O backend valida, cadastra/autentica o usuário e retorna um JWT próprio do sistema.
4. Use o JWT para acessar rotas protegidas (header `Authorization: Bearer <token>`).

---

## 🔒 Segurança
- Nunca exponha secrets ou tokens em repositórios públicos.
- Use HTTPS em produção.
- O JWT expira em 7 dias por padrão.
- Tokens do YouTube nunca são enviados ao frontend.

---

## 📚 Mais informações
- Para detalhes de proxy, fluxo OAuth2, troubleshooting e dicas de segurança, veja o README principal e o `GUIA_DE_DESENVOLVIMENTO.md` na raiz do projeto.
- Consulte a documentação do Prisma, Express e Google Identity Services para integrações avançadas.

# Backend Polymet - Integração Google/YouTube

## Checklist de Segurança

- [x] **Variáveis de ambiente:**
  - Client ID, Client Secret e URIs sensíveis estão em `.env` e nunca são enviados ao frontend.
- [x] **Client Secret nunca exposto:**
  - O Client Secret do Google/YouTube só é usado no backend.
  - Nunca é retornado em nenhum endpoint ou resposta para o frontend.
- [x] **Tokens protegidos:**
  - Access token e refresh token do YouTube são salvos no banco, vinculados ao usuário.
  - Nunca são enviados ao frontend, apenas usados internamente para requisições à API do YouTube.
- [x] **HTTPS obrigatório em produção:**
  - Sempre use HTTPS em produção para proteger tokens e dados sensíveis em trânsito.
- [x] **Expiração e refresh automático:**
  - O backend faz refresh automático do access_token usando o refresh_token, sem expor lógica sensível ao frontend.
- [x] **Proteção de endpoints:**
  - Todos os endpoints sensíveis exigem autenticação JWT.
- [x] **Revisão de permissões:**
  - Escopos mínimos necessários são usados na autenticação YouTube (`youtube.readonly`).
- [x] **Logs e erros:**
  - Nunca logar tokens ou segredos em produção.

## Boas práticas recomendadas
- Rotacione segredos periodicamente no Google Cloud.
- Use variáveis de ambiente diferentes para desenvolvimento e produção.
- Monitore tentativas de acesso não autorizado e falhas de refresh.
- Documente o fluxo de autenticação e integração para novos desenvolvedores.

---

## Como rodar o sistema localmente (backend + frontend)

### Pré-requisitos
- Node.js 18+ (recomendado Node 20)
- npm 9+
- Banco de dados PostgreSQL rodando (ou SQLite, se configurado)
- Variáveis de ambiente configuradas nos arquivos `.env` de cada projeto

### 1. Rodando o Backend

```bash
# No terminal, navegue até a pasta do backend
cd ~/Desktop/Sistema\ Lancei\ Essa/Sistema_Lancei_Essa_unzipped/backend

# Instale as dependências
npm install

# Configure o arquivo .env (copie de .env.example se existir)
# Exemplo de variáveis necessárias:
# DATABASE_URL=...
# JWT_SECRET=...
# GOOGLE_CLIENT_ID=...
# YOUTUBE_CLIENT_ID=...
# YOUTUBE_CLIENT_SECRET=...
# YOUTUBE_REDIRECT_URI=...

# Rode as migrations do banco (se usar Prisma)
npx prisma migrate dev

# Inicie o backend
node index.js
# O backend deve rodar em http://localhost:4000
```

### 2. Rodando o Frontend

Abra um novo terminal e rode:

```bash
cd ~/Desktop/Sistema\ Lancei\ Essa/Sistema_Lancei_Essa_unzipped/polymet-app
npm install
npm run dev
# O frontend estará disponível em http://localhost:5173 (ou próxima porta livre)
```

### 3. Fluxo de autenticação
- Acesse o frontend pelo navegador.
- Faça login com Google.
- Clique em "Conectar com YouTube" para iniciar o fluxo OAuth2.
- Siga o consentimento do Google e aguarde o redirecionamento.
- O dashboard deve exibir os dados do canal conectado.

### Dicas e Resolução de Problemas
- Sempre rode o backend no diretório correto (`backend`).
- Se der erro de importação do nanoid, atualize o Node.js e use a versão mais recente do pacote.
- Se a porta 5173 estiver ocupada, o Vite usará a próxima porta livre (veja o terminal para o endereço correto).
- Se der erro 500 no callback do YouTube, veja o terminal do backend para detalhes do erro.
- Certifique-se de que as variáveis de ambiente estão corretas e o banco está acessível.

---

## Como facilitar o fluxo OAuth2 localmente: Proxy do Vite

Para garantir que o cookie `oauth_state` seja enviado corretamente entre frontend e backend durante o fluxo OAuth2, recomenda-se rodar ambos em localhost e usar o proxy do Vite para evitar problemas de cookies cross-origin.

### 1. Configure o proxy no Vite (frontend)

No arquivo `polymet-app/vite.config.ts`, adicione ou ajuste o proxy:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/auth': 'http://localhost:4000',
    },
  },
});
```

- Isso faz com que requisições para `/api` e `/auth` feitas pelo frontend sejam redirecionadas para o backend, mantendo o mesmo domínio/porta do frontend para o navegador.

### 2. Como rodar
- Rode o backend normalmente em `http://localhost:4000`.
- Rode o frontend com `npm run dev` (Vite), normalmente em `http://localhost:5173`.
- O frontend deve fazer requisições para `/api/...` e `/auth/...` sem especificar porta ou domínio (ex: `fetch('/api/youtube/auth')`).
- O Vite redireciona para o backend, e o navegador trata os cookies como same-origin.

### 3. Benefícios
- O cookie `oauth_state` será enviado corretamente no callback do OAuth2.
- Evita problemas de SameSite, CORS e cookies cross-origin.
- Facilita o desenvolvimento local do fluxo OAuth2.

### 4. Observação
- Em produção, o frontend e backend devem estar sob o mesmo domínio ou usar HTTPS e cookies configurados com `SameSite=None; Secure`.

---

## Fluxo de Login com Google (Guia Rápido)

### 1. Visão Geral
- O usuário clica em "Login com Google" no frontend.
- O frontend usa o Google One Tap ou popup para obter um `id_token` do Google.
- O frontend envia esse token para o backend (`POST /api/auth/google`).
- O backend valida o token, busca/cria o usuário e retorna um JWT próprio do sistema.
- O frontend armazena o JWT e usa para acessar rotas protegidas.

### 2. Variáveis de Ambiente Necessárias
- **Frontend:**
  - `VITE_GOOGLE_CLIENT_ID` (no arquivo `.env` do frontend)
- **Backend:**
  - `GOOGLE_CLIENT_ID` (no arquivo `.env` do backend, igual ao frontend)
  - `JWT_SECRET` (segredo para assinar o JWT do sistema)

### 3. Exemplo de Requisição do Frontend
```js
fetch('http://localhost:4000/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: idTokenDoGoogle })
})
```

### 4. Exemplo de Resposta do Backend
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "googleId": "...",
    "createdAt": "..."
  },
  "token": "JWT_DO_SISTEMA"
}
```

### 5. Como usar o JWT para acessar rotas protegidas
Inclua o token no header Authorization:
```http
Authorization: Bearer JWT_DO_SISTEMA
```

### 6. Observações
- O client ID do Google **deve ser igual** no frontend e backend.
- O backend nunca recebe ou armazena o client secret do Google Sign-In.
- O JWT do sistema é usado para autenticação nas rotas protegidas.
- Use HTTPS em produção para proteger os tokens.

--- 