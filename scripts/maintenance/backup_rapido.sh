#!/bin/bash

echo "⚡ Backup Rápido - Sistema Lancei Essa"
echo "======================================"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="../backup_codigo_$TIMESTAMP"

echo "📁 Criando diretório: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

echo "📋 Copiando apenas código fonte..."

# Backend
echo "  → Backend..."
mkdir -p "$BACKUP_DIR/backend"
cp -r backend/src "$BACKUP_DIR/backend/"
cp -r backend/prisma "$BACKUP_DIR/backend/"
cp -r backend/controllers "$BACKUP_DIR/backend/" 2>/dev/null
cp backend/*.js backend/*.json "$BACKUP_DIR/backend/" 2>/dev/null

# Frontend
echo "  → Frontend..."
mkdir -p "$BACKUP_DIR/polymet-app"
cp -r polymet-app/src "$BACKUP_DIR/polymet-app/"
cp polymet-app/*.json polymet-app/*.js polymet-app/*.ts polymet-app/*.html "$BACKUP_DIR/polymet-app/" 2>/dev/null

# Documentação e configs
echo "  → Documentação..."
cp *.md *.sh .gitignore LICENSE "$BACKUP_DIR/" 2>/dev/null
cp -r .github "$BACKUP_DIR/" 2>/dev/null
cp -r scripts "$BACKUP_DIR/" 2>/dev/null
cp -r docs "$BACKUP_DIR/" 2>/dev/null

echo ""
echo "✅ Backup concluído em: $BACKUP_DIR"
echo "📊 Total: $(find "$BACKUP_DIR" -type f | wc -l) arquivos" 