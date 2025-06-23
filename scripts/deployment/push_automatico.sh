#!/bin/bash
# Script para automatizar push de alterações futuras

# Mensagem de commit passada como argumento, ou padrão
COMMIT_MSG="${1:-Commit automático}"

git add .
git commit -m "$COMMIT_MSG" || echo "Nada novo para commitar."
git pull origin main --rebase
git push origin main

echo "Push automático realizado com sucesso!" 