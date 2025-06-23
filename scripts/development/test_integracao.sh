#!/bin/bash

echo "🧪 TESTE DE INTEGRAÇÃO FRONTEND + BACKEND"
echo "========================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Verificar se o backend está rodando
echo "1️⃣ Verificando Backend..."
BACKEND_HEALTH=$(curl -s http://localhost:4000/health 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend rodando na porta 4000${NC}"
    echo "   Resposta: $BACKEND_HEALTH"
else
    echo -e "${RED}✗ Backend não está rodando!${NC}"
    echo -e "${YELLOW}Iniciando backend...${NC}"
    cd backend && DATABASE_URL="file:./dev.db" npm start &
    sleep 5
fi

echo ""

# 2. Verificar CORS
echo "2️⃣ Testando CORS..."
CORS_TEST=$(curl -s -H "Origin: http://localhost:5173" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type" \
    -X OPTIONS http://localhost:4000/api/auth/google -I 2>/dev/null | grep -i "access-control-allow-origin")

if [ ! -z "$CORS_TEST" ]; then
    echo -e "${GREEN}✓ CORS configurado corretamente${NC}"
    echo "   $CORS_TEST"
else
    echo -e "${RED}✗ CORS não está configurado!${NC}"
fi

echo ""

# 3. Testar endpoint de login simulado
echo "3️⃣ Testando Login Simulado..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/google \
    -H "Content-Type: application/json" \
    -d '{"credential":"fake-google-token"}' 2>/dev/null)

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    echo -e "${GREEN}✓ Login simulado funcionando${NC}"
    echo "   Resposta: $LOGIN_RESPONSE"
    
    # Extrair token
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
    echo "   Token gerado: ${TOKEN:0:20}..."
else
    echo -e "${RED}✗ Erro no login${NC}"
    echo "   Resposta: $LOGIN_RESPONSE"
fi

echo ""

# 4. Verificar se o frontend pode se conectar
echo "4️⃣ Verificando conexão Frontend → Backend..."
echo ""
echo "Para testar completamente:"
echo "1. Abra http://localhost:5173 no navegador"
echo "2. Abra o DevTools (F12)"
echo "3. Tente fazer login com Google"
echo "4. Verifique no Network tab se as requisições estão indo para http://localhost:4000"
echo ""

# 5. Mostrar status dos processos
echo "5️⃣ Status dos Processos:"
echo -e "${YELLOW}Backend:${NC}"
lsof -i :4000 | grep LISTEN || echo "   ❌ Não está rodando na porta 4000"
echo ""
echo -e "${YELLOW}Frontend:${NC}"
lsof -i :5173 | grep LISTEN || echo "   ❌ Não está rodando na porta 5173"

echo ""
echo "========================================"
echo "🎯 PRÓXIMOS PASSOS:"
echo "1. Se o frontend não estiver rodando: cd polymet-app && npm run dev"
echo "2. Se o backend não estiver rodando: cd backend && DATABASE_URL='file:./dev.db' npm start"
echo "3. Teste o login no navegador"
echo "" 