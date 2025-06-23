#!/bin/bash

echo "🔐 Adicionando Client Secret ao backend..."
echo ""
echo "📝 INSTRUÇÕES:"
echo ""
echo "1. Acesse: https://console.cloud.google.com/apis/credentials"
echo ""
echo "2. Clique no seu OAuth Client:"
echo "   603127623499-i9rjg4qsrq2ftccmfv9mnuhsb91ugbkn.apps.googleusercontent.com"
echo ""
echo "3. Copie o Client Secret"
echo ""
echo "4. Cole o Client Secret quando solicitado:"
echo ""
read -p "Cole o Client Secret aqui: " CLIENT_SECRET

if [ -z "$CLIENT_SECRET" ]; then
    echo "❌ Client Secret não pode ser vazio!"
    exit 1
fi

# Fazer backup
cp backend/.env backend/.env.backup

# Atualizar o arquivo .env
sed -i '' "s/GOOGLE_CLIENT_SECRET=.*/GOOGLE_CLIENT_SECRET=$CLIENT_SECRET/g" backend/.env
sed -i '' "s/YOUTUBE_CLIENT_SECRET=.*/YOUTUBE_CLIENT_SECRET=$CLIENT_SECRET/g" backend/.env

echo ""
echo "✅ Client Secret adicionado com sucesso!"
echo ""
echo "🔍 Verificando..."
echo "GOOGLE_CLIENT_SECRET=$(grep GOOGLE_CLIENT_SECRET backend/.env | cut -d'=' -f2 | cut -c1-10)..."
echo ""
echo "🚀 Agora reinicie o backend:"
echo "   cd backend"
echo "   npm start" 