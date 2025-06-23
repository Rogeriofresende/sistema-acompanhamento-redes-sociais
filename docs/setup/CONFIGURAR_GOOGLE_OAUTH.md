# 🔐 ATUALIZAR GOOGLE CLIENT ID

## 1. No Frontend (`apps/frontend/.env`)

Substitua o Client ID no arquivo `.env`:

```env
VITE_GOOGLE_CLIENT_ID=SEU-NOVO-CLIENT-ID-AQUI.apps.googleusercontent.com
VITE_API_URL=http://localhost:4000
VITE_AUTH_URL=http://localhost:4000
VITE_BACKEND_URL=http://localhost:4000
```

## 2. No Backend (`backend/.env`)

Crie ou atualize o arquivo `.env`:

```env
# Configurações do Servidor
PORT=4000
NODE_ENV=development

# Segurança
JWT_SECRET=desenvolvimento-temporario-123456-MUDE-ISSO
JWT_EXPIRES_IN=7d

# Google OAuth (ATUALIZE COM SEUS VALORES)
GOOGLE_CLIENT_ID=SEU-NOVO-CLIENT-ID-AQUI.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SEU-CLIENT-SECRET-AQUI

# YouTube API (para depois)
YOUTUBE_API_KEY=sua-youtube-api-key
YOUTUBE_CLIENT_ID=SEU-NOVO-CLIENT-ID-AQUI.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=SEU-CLIENT-SECRET-AQUI
YOUTUBE_REDIRECT_URI=http://localhost:4000/api/youtube/callback

# URLs do Frontend
FRONTEND_URL=http://localhost:5173
FRONTEND_PROD_URL=https://sistema-lancei-essa.vercel.app
```

## 3. Reinicie os Servidores

Após atualizar os arquivos .env, você precisa reiniciar ambos os servidores:

```bash
# Mate os processos atuais
pkill -f vite
pkill -f "node.*server"

# Reinicie o frontend (em um terminal)
cd apps/frontend
npm run dev

# Reinicie o backend (em outro terminal)
cd backend
npm start
```

## ⚠️ IMPORTANTE

- Use o MESMO Client ID em ambos os arquivos
- Guarde o Client Secret com segurança
- Nunca compartilhe ou faça commit desses valores 