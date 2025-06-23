#!/bin/bash

# Cria .env.example para o backend
cat > ../backend/.env.example <<EOL
# ---- Google Sign-In (Login do usuário no sistema) ----
GOOGLE_CLIENT_ID=seu_google_client_id_aqui
# Se você não usa o secret do Google Sign-In no backend, pode deixar sem o GOOGLE_CLIENT_SECRET

# ---- OAuth YouTube (Coleta de dados do canal) ----
YOUTUBE_CLIENT_ID=seu_youtube_client_id_aqui
YOUTUBE_CLIENT_SECRET=seu_youtube_client_secret_aqui
YOUTUBE_REDIRECT_URI=http://localhost:4000/auth/youtube/callback

# ---- Outros ----
JWT_SECRET=sua_chave_jwt_segura
DATABASE_URL=postgresql://usuario:senha@localhost:5432/lancei_essa_db
EOL

echo ".env.example criado em backend/.env.example"

# Cria .env.example para o frontend
cat > ../polymet-app/.env.example <<EOL
# Exemplo de variáveis de ambiente para o frontend (Vite)
VITE_GOOGLE_CLIENT_ID=seu_google_client_id_aqui
EOL

echo ".env.example criado em polymet-app/.env.example" 