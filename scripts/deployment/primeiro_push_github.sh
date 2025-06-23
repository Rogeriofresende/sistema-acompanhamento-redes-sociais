#!/bin/bash
# Script para automatizar o primeiro push do projeto para o GitHub
# Uso: bash primeiro_push_github.sh

REPO_URL="https://github.com/Rogeriofresende/sistema-acompanhamento-redes-sociais.git"

# Navega até a raiz do projeto
PROJECT_ROOT="/Users/rogerioresende/Desktop/Sistema Lancei Essa"
cd "$PROJECT_ROOT"

echo "🚀 Iniciando processo de push para GitHub..."
echo "📁 Diretório atual: $(pwd)"
echo "🔗 Repositório destino: $REPO_URL"

# Verifica se já é um repositório git
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositório Git..."
    git init -b main
else
    echo "✅ Repositório Git já existe"
fi

# Remove remote origin existente (se houver)
git remote remove origin 2>/dev/null || echo "ℹ️  Nenhum remote origin anterior encontrado"

# Adiciona o novo remote
echo "🔗 Configurando remote origin..."
git remote add origin "$REPO_URL"

# Adiciona todos os arquivos
echo "📝 Adicionando arquivos ao stage..."
git add .

# Verifica se há mudanças para commitar
if git diff --staged --quiet; then
    echo "ℹ️  Nenhuma mudança para commitar"
else
    echo "💾 Fazendo commit inicial..."
    git commit -m "feat: adiciona sistema completo de acompanhamento de redes sociais

- Backend com autenticação e integração YouTube Analytics
- Frontend React com dashboard moderno e responsivo
- Sistema de documentação completo
- Scripts de automação e deployment
- Configuração CI/CD com GitHub Actions"
fi

# Faz o push
echo "🚀 Enviando para GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Projeto enviado para GitHub com sucesso!"
echo "🌐 Acesse: $REPO_URL"
echo ""
echo "📋 Próximos passos recomendados:"
echo "   1. Configure as secrets do GitHub para CI/CD"
echo "   2. Configure as credenciais do Google OAuth"
echo "   3. Configure o banco de dados em produção" 