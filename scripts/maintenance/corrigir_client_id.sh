#!/bin/bash

echo "🔧 Corrigindo Client ID inconsistente..."
echo ""
echo "❌ PROBLEMA ENCONTRADO:"
echo "   Frontend usa: l9rjg..."
echo "   Backend usa:  i9rjg..."
echo ""
echo "✅ Corrigindo para usar 'i9' em ambos..."

# Fazer backup
cp polymet-app/.env polymet-app/.env.backup

# Corrigir o Client ID no frontend
sed -i '' 's/603127623499-l9rjg/603127623499-i9rjg/g' polymet-app/.env

echo ""
echo "✅ Client ID corrigido!"
echo ""
echo "🔍 Verificando..."
grep "VITE_GOOGLE_CLIENT_ID" polymet-app/.env
echo ""
echo "🚀 Agora reinicie o frontend:"
echo "   cd polymet-app"
echo "   npm run dev" 