#!/bin/bash

echo "🔍 DEBUGANDO PROBLEMA DO FRONTEND"
echo "================================="
echo ""

# 1. Verificar se o backend está rodando
echo "1️⃣ Verificando backend..."
if curl -s http://localhost:4000 > /dev/null; then
    echo "✅ Backend está rodando em http://localhost:4000"
else
    echo "❌ Backend não está respondendo!"
    echo "   Execute: cd backend && node src/server.js"
fi

echo ""
echo "2️⃣ Verificando arquivo .env do frontend..."
if [ -f "polymet-app/.env" ]; then
    echo "✅ Arquivo .env existe"
    echo "Conteúdo:"
    cat polymet-app/.env
else
    echo "❌ Arquivo .env não encontrado!"
fi

echo ""
echo "3️⃣ Limpando cache do Vite..."
rm -rf polymet-app/node_modules/.vite
echo "✅ Cache limpo"

echo ""
echo "4️⃣ Verificando se há processos Vite rodando..."
if pgrep -f vite > /dev/null; then
    echo "⚠️  Processos Vite encontrados. Matando..."
    pkill -f vite
    sleep 2
    echo "✅ Processos finalizados"
else
    echo "✅ Nenhum processo Vite rodando"
fi

echo ""
echo "5️⃣ Iniciando frontend limpo..."
echo ""
echo "Execute agora:"
echo "cd polymet-app && npm run dev"
echo ""
echo "Se ainda não funcionar, tente:"
echo "1. Abra o DevTools (F12)"
echo "2. Vá na aba Console"
echo "3. Veja se há erros em vermelho"
echo "4. Compartilhe os erros comigo" 