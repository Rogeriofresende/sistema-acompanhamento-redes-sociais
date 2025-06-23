#!/bin/bash

echo "🔐 Adicionando Client Secret ao backend..."

# Client Secret do Google Cloud Console
CLIENT_SECRET="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"

# Fazer backup
cp backend/.env backend/.env.backup

# Atualizar o arquivo .env
sed -i '' "s/GOOGLE_CLIENT_SECRET=.*/GOOGLE_CLIENT_SECRET=$CLIENT_SECRET/g" backend/.env
sed -i '' "s/YOUTUBE_CLIENT_SECRET=.*/YOUTUBE_CLIENT_SECRET=$CLIENT_SECRET/g" backend/.env

echo "✅ Client Secret adicionado com sucesso!"
echo ""
echo "🔍 Verificando configuração atualizada..."
echo ""
grep "GOOGLE_CLIENT_SECRET" backend/.env
grep "YOUTUBE_CLIENT_SECRET" backend/.env
echo ""
echo "🚀 Pronto! Agora vamos reiniciar o backend..." 