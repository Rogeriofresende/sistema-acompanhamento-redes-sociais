#!/bin/bash

echo "🔍 Verificando configurações OAuth..."
echo ""

# Verificar Client ID no frontend
echo "📱 Frontend (.env):"
if [ -f "polymet-app/.env" ]; then
    grep "VITE_GOOGLE_CLIENT_ID" polymet-app/.env || echo "❌ VITE_GOOGLE_CLIENT_ID não encontrado"
else
    echo "❌ Arquivo polymet-app/.env não encontrado"
fi

echo ""
echo "🖥️  Backend (.env):"
if [ -f "backend/.env" ]; then
    grep "GOOGLE_CLIENT_ID" backend/.env || echo "❌ GOOGLE_CLIENT_ID não encontrado"
    grep "YOUTUBE_CLIENT_ID" backend/.env || echo "❌ YOUTUBE_CLIENT_ID não encontrado"
    grep "YOUTUBE_REDIRECT_URI" backend/.env || echo "❌ YOUTUBE_REDIRECT_URI não encontrado"
else
    echo "❌ Arquivo backend/.env não encontrado"
fi

echo ""
echo "📋 Client ID atual sendo usado:"
echo "603127623499-i9rjg4qsrq2ftccmfv9mnuhsb91ugbkn.apps.googleusercontent.com"
echo ""
echo "⚠️  Este Client ID está retornando erro 'invalid_client'"
echo ""
echo "✅ SOLUÇÃO:"
echo "1. Crie um novo OAuth Client ID em: https://console.cloud.google.com/apis/credentials"
echo "2. Atualize os arquivos .env com o novo Client ID"
echo "3. Reinicie os servidores"
echo ""
echo "📖 Veja o arquivo ATUALIZAR_CREDENCIAIS_GOOGLE.md para instruções detalhadas" 