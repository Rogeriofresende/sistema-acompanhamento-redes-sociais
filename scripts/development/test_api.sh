#!/bin/bash

echo "🧪 TESTANDO APIs - SISTEMA LANCEI ESSA"
echo "====================================="

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# URL base
BASE_URL="http://localhost:4000"

echo ""
echo "1️⃣ Testando Health Check..."
curl -s "$BASE_URL/health" | jq '.' || echo -e "${RED}❌ Health check falhou${NC}"

echo ""
echo "2️⃣ Testando Rota de Auth Test..."
curl -s "$BASE_URL/api/auth/test" | jq '.' || echo -e "${RED}❌ Auth test falhou${NC}"

echo ""
echo "3️⃣ Testando Login Google (simulado)..."
curl -s -X POST "$BASE_URL/api/auth/google" \
  -H "Content-Type: application/json" \
  -d '{"credential":"token-simulado-123"}' | jq '.' || echo -e "${RED}❌ Login falhou${NC}"

echo ""
echo "4️⃣ Testando Rota Protegida (sem token)..."
curl -s -X PATCH "$BASE_URL/api/user/email" \
  -H "Content-Type: application/json" \
  -d '{"email":"novo@email.com"}' | jq '.' || echo -e "${RED}❌ Esperado: deve falhar${NC}"

echo ""
echo "5️⃣ Simulando Rota Protegida (com token fake)..."
curl -s -X PATCH "$BASE_URL/api/user/email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token-fake-123" \
  -d '{"email":"novo@email.com"}' | jq '.' || echo -e "${RED}❌ Esperado: deve falhar${NC}"

echo ""
echo "✅ Testes concluídos!" 