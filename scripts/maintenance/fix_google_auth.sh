#!/bin/bash

echo "🔧 CORRIGINDO ERRO DE AUTENTICAÇÃO GOOGLE"
echo "========================================"
echo ""
echo "Este script irá configurar os Client IDs corretos"
echo ""

# Verificar se as variáveis de ambiente estão definidas
if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$YOUTUBE_CLIENT_ID" ] || [ -z "$YOUTUBE_CLIENT_SECRET" ]; then
    echo "❌ ERRO: Variáveis de ambiente não configuradas!"
    echo ""
    echo "Configure as seguintes variáveis antes de executar:"
    echo "export GOOGLE_CLIENT_ID='seu-google-client-id'"
    echo "export YOUTUBE_CLIENT_ID='seu-youtube-client-id'"
    echo "export YOUTUBE_CLIENT_SECRET='seu-youtube-client-secret'"
    echo ""
    exit 1
fi

# Criar .env do frontend
echo "📝 Criando arquivo .env do frontend..."
cat > polymet-app/.env << EOF
# Frontend Environment Variables

# Google OAuth - Client ID do "Sign in Google"
VITE_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

# Backend API URL
VITE_API_URL=http://localhost:4000
EOF

# Criar/atualizar .env do backend
echo ""
echo "📝 Criando arquivo .env do backend..."
cat > backend/.env << EOF
# Backend Environment Variables

# JWT Secret
JWT_SECRET=sistema-lancei-essa-jwt-secret-2025

# Google OAuth - Para Sign-In
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}

# YouTube OAuth - Cliente separado
YOUTUBE_CLIENT_ID=${YOUTUBE_CLIENT_ID}
YOUTUBE_CLIENT_SECRET=${YOUTUBE_CLIENT_SECRET}
YOUTUBE_REDIRECT_URI=http://localhost:4000/auth/youtube/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=lanceiessa_dev
DB_HOST=localhost

# Encryption Key for sensitive data
ENCRYPTION_KEY=\$(openssl rand -hex 32)
EOF

echo ""
echo "✅ Arquivos .env criados com sucesso!"
echo ""
echo "📋 Client IDs configurados a partir das variáveis de ambiente"
echo ""
echo "🚀 Agora:"
echo "1. Reinicie o frontend: cd polymet-app && npm run dev"
echo "2. Reinicie o backend: cd backend && node src/server.js"
echo "3. O login com Google deve funcionar!" 