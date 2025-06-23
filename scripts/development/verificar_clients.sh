#!/bin/bash

echo "🔍 VERIFICANDO OAUTH CLIENTS"
echo "============================"
echo ""
echo "No Google Cloud Console você tem 2 OAuth Clients:"
echo ""
echo "1️⃣ 'Sing in Google':"
echo "   ID: 603127623499-i9rj..."
echo ""
echo "2️⃣ 'Sistema Lancei Essa Youtube':"
echo "   ID: 603127623499-n8tg..."
echo ""
echo "----------------------------"
echo ""
echo "📋 CONFIGURAÇÃO ATUAL:"
echo ""
echo "Frontend está usando:"
FRONTEND_ID=$(grep "VITE_GOOGLE_CLIENT_ID" polymet-app/.env | cut -d'=' -f2)
echo "  $FRONTEND_ID"
echo ""
echo "Backend está usando:"
BACKEND_ID=$(grep "^GOOGLE_CLIENT_ID" backend/.env | cut -d'=' -f2)
YOUTUBE_ID=$(grep "^YOUTUBE_CLIENT_ID" backend/.env | cut -d'=' -f2)
echo "  Google Sign-In: $BACKEND_ID"
echo "  YouTube OAuth:  $YOUTUBE_ID"
echo ""

# Verificar qual é qual
if [[ "$FRONTEND_ID" == *"i9rj"* ]]; then
    echo "⚠️  Frontend está usando o Client 'Sing in Google'"
elif [[ "$FRONTEND_ID" == *"n8tg"* ]]; then
    echo "⚠️  Frontend está usando o Client 'Sistema Lancei Essa Youtube'"
fi

echo ""
echo "🎯 RECOMENDAÇÃO:"
echo ""
echo "Para evitar confusão, use:"
echo "- 'Sing in Google' (i9rj...) para Sign-In do Google"
echo "- 'Sistema Lancei Essa Youtube' (n8tg...) para YouTube OAuth"
echo ""
echo "OU crie um único OAuth Client com todas as URLs configuradas." 