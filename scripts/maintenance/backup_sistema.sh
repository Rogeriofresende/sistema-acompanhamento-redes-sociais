#!/bin/bash

# Script de Backup do Sistema Lancei Essa
# Criado em: $(date)

echo "🔄 Iniciando backup do Sistema Lancei Essa..."

# Criar diretório de backup com timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="../backups_lancei_essa/backup_$TIMESTAMP"

echo "📁 Criando diretório de backup: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Copiar todos os arquivos importantes (excluindo node_modules e outros desnecessários)
echo "📋 Copiando arquivos..."
rsync -av --progress \
  --exclude='node_modules' \
  --exclude='.git_backup*' \
  --exclude='*.log' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='.DS_Store' \
  . "$BACKUP_DIR/"

# Criar arquivo de informações do backup
echo "📝 Criando arquivo de informações..."
cat > "$BACKUP_DIR/backup_info.txt" << EOF
Backup do Sistema Lancei Essa
Data: $(date)
Diretório original: $(pwd)
Total de arquivos: $(find . -type f ! -path "./node_modules/*" ! -path "./.git_backup*/*" | wc -l)

Descrição: Backup completo do sistema antes de resolver problemas de versionamento
EOF

# Comprimir o backup
echo "🗜️ Comprimindo backup..."
cd ..
tar -czf "backups_lancei_essa/backup_$TIMESTAMP.tar.gz" "backups_lancei_essa/backup_$TIMESTAMP"

echo "✅ Backup concluído!"
echo "📍 Localização: $BACKUP_DIR"
echo "📦 Arquivo comprimido: ../backups_lancei_essa/backup_$TIMESTAMP.tar.gz" 