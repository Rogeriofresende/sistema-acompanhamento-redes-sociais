#!/bin/bash

echo "🔍 Verificando configuração completa do OAuth..."
echo ""

# Verificar processos rodando
echo "📊 Processos rodando:"
ps aux | grep -E "(vite|node.*server)" | grep -v grep | wc -l | xargs -I {} echo "   {} processos ativos"
echo ""

# Verificar URLs
echo "🌐 URLs configuradas:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo "   Callback: http://localhost:4000/auth/youtube/callback"
echo ""

# Verificar Client IDs
echo "🔑 Client IDs:"
echo -n "   Frontend: "
grep "VITE_GOOGLE_CLIENT_ID" polymet-app/.env | cut -d'=' -f2
echo -n "   Backend:  "
grep "^GOOGLE_CLIENT_ID" backend/.env | cut -d'=' -f2
echo ""

# Verificar Client Secret
echo "🔐 Client Secret:"
SECRET=$(grep "^GOOGLE_CLIENT_SECRET" backend/.env | cut -d'=' -f2)
if [[ "$SECRET" == "ADICIONE_SEU_CLIENT_SECRET_AQUI" ]]; then
    echo "   ❌ Client Secret NÃO configurado!"
    echo "   Execute: ./adicionar_secret.sh"
else
    echo "   ✅ Client Secret configurado ($(echo $SECRET | cut -c1-10)...)"
fi
echo ""

# Verificar redirect URI
echo "🔗 Redirect URI configurada:"
grep "YOUTUBE_REDIRECT_URI" backend/.env | cut -d'=' -f2
echo ""

echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configure as URLs no Google Cloud Console:"
echo "   https://console.cloud.google.com/apis/credentials"
echo ""
echo "2. Adicione em 'Authorized redirect URIs':"
echo "   http://localhost:4000/auth/youtube/callback"
echo ""
echo "3. Se o Client Secret não estiver configurado:"
echo "   ./adicionar_secret.sh"
echo ""
echo "📖 Veja RESOLVER_REDIRECT_URI.md para instruções detalhadas" 