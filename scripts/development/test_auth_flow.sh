#!/bin/bash

echo "🔐 TESTANDO FLUXO DE AUTENTICAÇÃO COMPLETO"
echo "=========================================="

BASE_URL="http://localhost:4000"

echo ""
echo "1️⃣ Fazendo login (simulado)..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/google" \
  -H "Content-Type: application/json" \
  -d '{"credential":"token-google-simulado"}')

echo "$LOGIN_RESPONSE" | jq '.'

# Extrair o token da resposta
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [ "$TOKEN" != "null" ]; then
    echo ""
    echo "✅ Login bem-sucedido! Token obtido."
    echo ""
    echo "2️⃣ Usando token para acessar rota protegida..."
    
    curl -s -X PATCH "$BASE_URL/api/user/email" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{"email":"novo@email.com"}' | jq '.'
    
    echo ""
    echo "3️⃣ Testando atualização de role..."
    
    curl -s -X PATCH "$BASE_URL/api/user/role" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{"role":"admin"}' | jq '.'
    
    echo ""
    echo "4️⃣ Testando atualização de perfil..."
    
    curl -s -X PATCH "$BASE_URL/api/user/upgrade" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{"plan":"premium","features":["youtube-integration","analytics"]}' | jq '.'
    
    echo ""
    echo "✅ Fluxo completo testado com sucesso!"
else
    echo ""
    echo "❌ Falha no login - Token não obtido"
fi 