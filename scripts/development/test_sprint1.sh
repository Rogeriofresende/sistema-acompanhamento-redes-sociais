#!/bin/bash

echo "🧪 TESTANDO IMPLEMENTAÇÃO DA SPRINT 1"
echo "====================================="
echo ""

# Verificar se PostgreSQL está rodando
echo "1️⃣ Verificando PostgreSQL..."
if pg_isready > /dev/null 2>&1; then
    echo "✅ PostgreSQL está rodando"
else
    echo "❌ PostgreSQL não está rodando. Inicie o PostgreSQL primeiro!"
    exit 1
fi

# Verificar se o banco existe
echo ""
echo "2️⃣ Verificando banco de dados..."
if psql -lqt | cut -d \| -f 1 | grep -qw lanceiessa_dev; then
    echo "✅ Banco de dados 'lanceiessa_dev' existe"
else
    echo "❌ Banco de dados não encontrado. Execute: createdb lanceiessa_dev"
    exit 1
fi

# Verificar tabelas
echo ""
echo "3️⃣ Verificando tabelas criadas..."
TABLES=$(psql -d lanceiessa_dev -c "\dt" 2>/dev/null | grep -E "(users|youtube_tokens|youtube_channels|guests)" | wc -l)
if [ "$TABLES" -eq "4" ]; then
    echo "✅ Todas as 4 tabelas foram criadas"
    psql -d lanceiessa_dev -c "\dt" | grep -E "(users|youtube_tokens|youtube_channels|guests)"
else
    echo "❌ Tabelas faltando. Execute: cd backend && node src/test-db.js"
    exit 1
fi

echo ""
echo "4️⃣ Instruções para testar o fluxo completo:"
echo ""
echo "BACKEND:"
echo "  cd backend && node src/server.js"
echo ""
echo "FRONTEND:"
echo "  cd polymet-app && npm run dev"
echo ""
echo "TESTE:"
echo "  1. Acesse http://localhost:5173"
echo "  2. Faça login com Google"
echo "  3. Conecte o YouTube"
echo "  4. Pare e reinicie o backend"
echo "  5. Verifique se ainda está conectado ao YouTube"
echo ""
echo "✅ Se a conexão persistir, a Sprint 1 está completa!" 