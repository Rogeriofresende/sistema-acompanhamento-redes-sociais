#!/bin/bash

# Sistema de Desenvolvimento Seguro - Lancei Essa
# Protege contra perda de código com auto-save e versões

echo "🛡️  Sistema de Desenvolvimento Seguro"
echo "===================================="

ACTION=$1

case "$ACTION" in
    "antes-editar")
        FILE=$2
        echo "📸 Criando snapshot antes de editar: $FILE"
        
        # Criar diretório de snapshots
        SNAPSHOT_DIR="../snapshots_dev/$(date +%Y%m%d)"
        mkdir -p "$SNAPSHOT_DIR"
        
        # Copiar arquivo
        if [ -f "$FILE" ]; then
            TIMESTAMP=$(date +%H%M%S)
            cp "$FILE" "$SNAPSHOT_DIR/$(basename $FILE).$TIMESTAMP.snapshot"
            echo "✅ Snapshot salvo: $SNAPSHOT_DIR/$(basename $FILE).$TIMESTAMP.snapshot"
        fi
        
        # Salvar versão completa a cada 10 edições
        EDIT_COUNT_FILE="../snapshots_dev/.edit_count"
        EDIT_COUNT=$(cat "$EDIT_COUNT_FILE" 2>/dev/null || echo "0")
        EDIT_COUNT=$((EDIT_COUNT + 1))
        echo $EDIT_COUNT > "$EDIT_COUNT_FILE"
        
        if [ $((EDIT_COUNT % 10)) -eq 0 ]; then
            echo "🔄 Auto-save completo (10 edições)"
            ./sistema_versionamento_temp.sh save "Auto-save após $EDIT_COUNT edições"
        fi
        ;;
        
    "check")
        echo "🔍 Verificando integridade do sistema..."
        
        # Verificar arquivos críticos
        CRITICAL_FILES=(
            "backend/package.json"
            "backend/src/server.js"
            "backend/src/app.js"
            "polymet-app/package.json"
            "polymet-app/src/App.tsx"
            "polymet-app/src/main.tsx"
        )
        
        ISSUES=0
        for FILE in "${CRITICAL_FILES[@]}"; do
            if [ ! -f "$FILE" ] || [ ! -s "$FILE" ]; then
                echo "❌ Problema: $FILE vazio ou não existe"
                ISSUES=$((ISSUES + 1))
            else
                echo "✅ OK: $FILE"
            fi
        done
        
        if [ $ISSUES -gt 0 ]; then
            echo ""
            echo "⚠️  Encontrados $ISSUES problemas!"
            echo "Use './dev_seguro.sh fix' para tentar corrigir"
        else
            echo ""
            echo "✅ Sistema íntegro!"
        fi
        ;;
        
    "monitorar")
        echo "👁️  Monitorando alterações..."
        echo "Pressione Ctrl+C para parar"
        
        # Criar versão inicial
        ./sistema_versionamento_temp.sh save "Início do monitoramento"
        
        # Monitorar mudanças
        while true; do
            sleep 300  # 5 minutos
            echo ""
            echo "🔄 Auto-save periódico..."
            ./sistema_versionamento_temp.sh save "Auto-save periódico"
        done
        ;;
        
    *)
        echo "Comandos disponíveis:"
        echo "  ./dev_seguro.sh antes-editar <arquivo>  - Snapshot antes de editar"
        echo "  ./dev_seguro.sh check                   - Verificar integridade"
        echo "  ./dev_seguro.sh monitorar               - Auto-save a cada 5 min"
        ;;
esac 