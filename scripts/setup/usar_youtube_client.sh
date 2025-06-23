#!/bin/bash

echo "🔄 AJUSTANDO PARA USAR O CLIENT CORRETO DO YOUTUBE"
echo "================================================="
echo ""
echo "Vamos usar o OAuth Client 'Sistema Lancei Essa Youtube' para YouTube OAuth"
echo ""

# Client ID do YouTube (o que tem as URLs configuradas)
YOUTUBE_CLIENT_ID="603127623499-n8tguni1369tqv6lota40lrktdic7n9p.apps.googleusercontent.com"

# Fazer backup
cp backend/.env backend/.env.backup.youtube

# Atualizar apenas o YOUTUBE_CLIENT_ID no backend
sed -i '' "s/YOUTUBE_CLIENT_ID=.*/YOUTUBE_CLIENT_ID=$YOUTUBE_CLIENT_ID/g" backend/.env

echo "✅ Backend atualizado para usar o Client correto do YouTube"
echo ""
echo "🔍 Verificando configuração:"
echo ""
echo "Backend agora tem:"
echo "  Google Sign-In: $(grep '^GOOGLE_CLIENT_ID' backend/.env | cut -d'=' -f2 | cut -c1-20)..."
echo "  YouTube OAuth:  $(grep '^YOUTUBE_CLIENT_ID' backend/.env | cut -d'=' -f2 | cut -c1-20)..."
echo ""
echo "📋 IMPORTANTE:"
echo "- Google Sign-In continuará usando o Client 'Sing in Google'"
echo "- YouTube OAuth agora usará o Client 'Sistema Lancei Essa Youtube'"
echo ""
echo "🚀 Agora reinicie o backend:"
echo "   cd backend && npm start" 