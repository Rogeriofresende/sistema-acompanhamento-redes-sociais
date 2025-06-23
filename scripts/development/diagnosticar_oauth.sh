#!/bin/bash

echo "🔍 DIAGNÓSTICO COMPLETO DO OAUTH"
echo "================================"
echo ""

# 1. Verificar Client IDs
echo "1️⃣ CLIENT IDs CONFIGURADOS:"
echo ""
echo "Frontend:"
FRONTEND_CLIENT_ID=$(grep "VITE_GOOGLE_CLIENT_ID" polymet-app/.env | cut -d'=' -f2)
echo "  $FRONTEND_CLIENT_ID"
echo ""
echo "Backend:"
BACKEND_CLIENT_ID=$(grep "^GOOGLE_CLIENT_ID" backend/.env | cut -d'=' -f2)
echo "  $BACKEND_CLIENT_ID"
echo ""

# 2. Verificar se são iguais
if [ "$FRONTEND_CLIENT_ID" != "$BACKEND_CLIENT_ID" ]; then
    echo "❌ ERRO: Client IDs são diferentes!"
else
    echo "✅ Client IDs são iguais"
fi
echo ""

# 3. Verificar Client Secret
echo "2️⃣ CLIENT SECRET:"
SECRET=$(grep "^GOOGLE_CLIENT_SECRET" backend/.env | cut -d'=' -f2)
if [[ -z "$SECRET" || "$SECRET" == "ADICIONE_SEU_CLIENT_SECRET_AQUI" ]]; then
    echo "❌ Client Secret NÃO configurado!"
else
    echo "✅ Client Secret configurado"
fi
echo ""

# 4. Verificar JWT Secret
echo "3️⃣ JWT SECRET:"
JWT_SECRET=$(grep "^JWT_SECRET" backend/.env | cut -d'=' -f2)
echo "  $JWT_SECRET"
echo ""

# 5. Verificar URLs
echo "4️⃣ URLs CONFIGURADAS:"
echo "  Frontend URL: $(grep "FRONTEND_URL" backend/.env | cut -d'=' -f2)"
echo "  Redirect URI: $(grep "YOUTUBE_REDIRECT_URI" backend/.env | cut -d'=' -f2)"
echo ""

# 6. Verificar processos
echo "5️⃣ PROCESSOS RODANDO:"
ps aux | grep -E "vite" | grep -v grep > /dev/null && echo "  ✅ Frontend (Vite)" || echo "  ❌ Frontend não está rodando"
ps aux | grep -E "node.*server" | grep -v grep > /dev/null && echo "  ✅ Backend (Node)" || echo "  ❌ Backend não está rodando"
echo ""

# 7. Soluções
echo "🔧 POSSÍVEIS SOLUÇÕES:"
echo ""
echo "1. Se o erro é 'invalid_client':"
echo "   - Verifique se o Client ID existe no Google Cloud Console"
echo "   - Crie um novo OAuth Client se necessário"
echo "   - Certifique-se de que as APIs estão habilitadas:"
echo "     • Google Sign-In API"
echo "     • YouTube Data API v3"
echo ""
echo "2. Se o sign-in parou de funcionar:"
echo "   - Limpe os cookies do navegador"
echo "   - Use uma aba anônima"
echo "   - Verifique se o JWT_SECRET é o mesmo usado quando criou os tokens"
echo ""
echo "3. URLs que devem estar no Google Cloud Console:"
echo "   Authorized JavaScript origins:"
echo "     • http://localhost:5173"
echo "     • http://localhost:4000"
echo "   Authorized redirect URIs:"
echo "     • http://localhost:4000/auth/youtube/callback"
echo ""
echo "📋 Client ID atual: $BACKEND_CLIENT_ID" 