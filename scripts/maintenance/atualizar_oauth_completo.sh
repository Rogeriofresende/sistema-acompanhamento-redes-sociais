#!/bin/bash

echo "🔄 ATUALIZAÇÃO COMPLETA DO OAUTH"
echo "================================"
echo ""
echo "Este script vai atualizar seu Client ID e Secret em todos os arquivos necessários."
echo ""

# Solicitar novo Client ID
echo "📝 Cole o NOVO Client ID do Google Cloud Console:"
read -p "Client ID: " NEW_CLIENT_ID

if [ -z "$NEW_CLIENT_ID" ]; then
    echo "❌ Client ID não pode ser vazio!"
    exit 1
fi

# Solicitar novo Client Secret
echo ""
echo "📝 Cole o NOVO Client Secret:"
read -p "Client Secret: " NEW_CLIENT_SECRET

if [ -z "$NEW_CLIENT_SECRET" ]; then
    echo "❌ Client Secret não pode ser vazio!"
    exit 1
fi

echo ""
echo "🔧 Atualizando arquivos..."

# Fazer backups
cp polymet-app/.env polymet-app/.env.backup.$(date +%s)
cp backend/.env backend/.env.backup.$(date +%s)

# Atualizar Frontend
sed -i '' "s/VITE_GOOGLE_CLIENT_ID=.*/VITE_GOOGLE_CLIENT_ID=$NEW_CLIENT_ID/g" polymet-app/.env
echo "✅ Frontend atualizado"

# Atualizar Backend
sed -i '' "s/GOOGLE_CLIENT_ID=.*/GOOGLE_CLIENT_ID=$NEW_CLIENT_ID/g" backend/.env
sed -i '' "s/YOUTUBE_CLIENT_ID=.*/YOUTUBE_CLIENT_ID=$NEW_CLIENT_ID/g" backend/.env
sed -i '' "s/GOOGLE_CLIENT_SECRET=.*/GOOGLE_CLIENT_SECRET=$NEW_CLIENT_SECRET/g" backend/.env
sed -i '' "s/YOUTUBE_CLIENT_SECRET=.*/YOUTUBE_CLIENT_SECRET=$NEW_CLIENT_SECRET/g" backend/.env
echo "✅ Backend atualizado"

echo ""
echo "🔍 Verificando atualizações..."
echo ""
echo "Frontend:"
grep "VITE_GOOGLE_CLIENT_ID" polymet-app/.env
echo ""
echo "Backend:"
grep "GOOGLE_CLIENT_ID\|CLIENT_SECRET" backend/.env | grep -v "VITE"
echo ""

echo "🚀 Reiniciando servidores..."
echo ""

# Parar processos
pkill -f vite
pkill -f "node.*server"

echo "✅ Processos parados"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo ""
echo "1. Certifique-se de que no Google Cloud Console você tem:"
echo "   - Authorized JavaScript origins:"
echo "     • http://localhost:5173"
echo "     • http://localhost:4000"
echo "   - Authorized redirect URIs:"
echo "     • http://localhost:4000/auth/youtube/callback"
echo ""
echo "2. Habilite as APIs necessárias:"
echo "   • Google Identity Toolkit API"
echo "   • YouTube Data API v3"
echo ""
echo "3. Execute em terminais separados:"
echo "   Terminal 1: cd backend && npm start"
echo "   Terminal 2: cd polymet-app && npm run dev"
echo ""
echo "4. Use uma aba anônima/privada do navegador"
echo ""
echo "✅ Atualização concluída!" 