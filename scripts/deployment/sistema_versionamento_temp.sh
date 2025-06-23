#!/bin/bash

# Sistema de Versionamento Temporário - Lancei Essa
# Solução alternativa enquanto resolvemos problemas do Git

ACTION=$1
MESSAGE=$2

VERSIONS_DIR="../versoes_lancei_essa"
CURRENT_VERSION_FILE="$VERSIONS_DIR/current_version.txt"

# Criar diretório de versões se não existir
mkdir -p "$VERSIONS_DIR"

# Inicializar contador de versão se não existir
if [ ! -f "$CURRENT_VERSION_FILE" ]; then
    echo "0" > "$CURRENT_VERSION_FILE"
fi

case "$ACTION" in
    "save")
        # Incrementar versão
        CURRENT_VERSION=$(cat "$CURRENT_VERSION_FILE")
        NEW_VERSION=$((CURRENT_VERSION + 1))
        echo $NEW_VERSION > "$CURRENT_VERSION_FILE"
        
        # Criar diretório da versão
        VERSION_DIR="$VERSIONS_DIR/v$NEW_VERSION"
        mkdir -p "$VERSION_DIR"
        
        # Copiar apenas código fonte
        echo "💾 Salvando versão $NEW_VERSION..."
        
        # Backend
        mkdir -p "$VERSION_DIR/backend"
        cp -r backend/src backend/prisma backend/controllers "$VERSION_DIR/backend/" 2>/dev/null
        cp backend/*.js backend/*.json "$VERSION_DIR/backend/" 2>/dev/null
        
        # Frontend
        mkdir -p "$VERSION_DIR/polymet-app"
        cp -r polymet-app/src "$VERSION_DIR/polymet-app/" 2>/dev/null
        cp polymet-app/*.json polymet-app/*.js polymet-app/*.ts "$VERSION_DIR/polymet-app/" 2>/dev/null
        
        # Docs
        cp *.md *.sh LICENSE "$VERSION_DIR/" 2>/dev/null
        
        # Criar arquivo de info
        cat > "$VERSION_DIR/version_info.txt" << EOF
Versão: $NEW_VERSION
Data: $(date)
Mensagem: $MESSAGE
Arquivos: $(find "$VERSION_DIR" -type f | wc -l)
EOF
        
        echo "✅ Versão $NEW_VERSION salva!"
        echo "📍 Local: $VERSION_DIR"
        ;;
        
    "list")
        echo "📚 Versões disponíveis:"
        echo "======================="
        for dir in $VERSIONS_DIR/v*/; do
            if [ -d "$dir" ]; then
                VERSION=$(basename "$dir")
                INFO=$(grep "Data:" "$dir/version_info.txt" 2>/dev/null || echo "Data: N/A")
                MSG=$(grep "Mensagem:" "$dir/version_info.txt" 2>/dev/null || echo "Mensagem: N/A")
                echo "$VERSION - $INFO | $MSG"
            fi
        done
        ;;
        
    "restore")
        VERSION=$2
        if [ -d "$VERSIONS_DIR/$VERSION" ]; then
            echo "⚠️  ATENÇÃO: Isso sobrescreverá os arquivos atuais!"
            echo "Restaurando versão $VERSION..."
            
            # Fazer backup atual antes
            ./sistema_versionamento_temp.sh save "Backup antes de restaurar $VERSION"
            
            # Restaurar
            cp -r "$VERSIONS_DIR/$VERSION/"* . 2>/dev/null
            echo "✅ Versão $VERSION restaurada!"
        else
            echo "❌ Versão $VERSION não encontrada!"
        fi
        ;;
        
    *)
        echo "Sistema de Versionamento Temporário"
        echo "==================================="
        echo "Uso:"
        echo "  ./sistema_versionamento_temp.sh save \"mensagem\"  - Salvar nova versão"
        echo "  ./sistema_versionamento_temp.sh list              - Listar versões"
        echo "  ./sistema_versionamento_temp.sh restore vX        - Restaurar versão"
        ;;
esac 