#!/bin/bash

# =============================================================================
# SISTEMA LANCEI ESSA - AUTOMAÇÃO COMPLETA DA DOCUMENTAÇÃO  
# =============================================================================
# Descrição: Script mestre que orquestra toda a automação da documentação
# Autor: Sistema Automatizado de Documentação
# Data: $(date '+%d/%m/%Y')
# Versão: 1.0
# =============================================================================

set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Configurações
SCRIPTS_DIR="scripts/docs"
DOCS_DIR="docs"
LOG_FILE="$DOCS_DIR/project-management/automation-log.md"
NOTIFICATION_FILE="$DOCS_DIR/project-management/automation-alerts.json"

# Flags de controle
VALIDATE_DOCS=true
UPDATE_METRICS=true  
AUTO_VERSION=false
GENERATE_REPORTS=true
CLEAN_TEMP=true
SEND_NOTIFICATIONS=true

echo -e "${BLUE}🤖 SISTEMA LANCEI ESSA - AUTOMAÇÃO DA DOCUMENTAÇÃO${NC}"
echo "================================================================="
echo -e "📅 Executado em: ${YELLOW}$(date)${NC}"
echo -e "📂 Diretório: ${YELLOW}$(pwd)${NC}"
echo ""

# Função para logging
log_action() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%H:%M:%S')
    
    case "$level" in
        "INFO")
            echo -e "${BLUE}ℹ️  [$timestamp] $message${NC}"
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ [$timestamp] $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  [$timestamp] $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ [$timestamp] $message${NC}"
            ;;
    esac
    
    # Salvar em log file
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
}

# Função para verificar dependências
check_dependencies() {
    log_action "INFO" "Verificando dependências e scripts..."
    
    local scripts=(
        "$SCRIPTS_DIR/validate_docs.sh"
        "$SCRIPTS_DIR/metrics_dashboard.sh"
        "$SCRIPTS_DIR/auto_version.sh"
    )
    
    local missing_scripts=()
    
    for script in "${scripts[@]}"; do
        if [[ ! -f "$script" ]]; then
            missing_scripts+=("$script")
        elif [[ ! -x "$script" ]]; then
            chmod +x "$script"
            log_action "INFO" "Permissão de execução adicionada: $script"
        fi
    done
    
    if [[ ${#missing_scripts[@]} -gt 0 ]]; then
        log_action "ERROR" "Scripts faltando: ${missing_scripts[*]}"
        return 1
    fi
    
    log_action "SUCCESS" "Todas as dependências verificadas"
    return 0
}

# Função para executar validação da documentação
run_validation() {
    if [[ "$VALIDATE_DOCS" == true ]]; then
        log_action "INFO" "Executando validação da documentação..."
        
        if "$SCRIPTS_DIR/validate_docs.sh" > /dev/null 2>&1; then
            log_action "SUCCESS" "Validação concluída com sucesso"
            return 0
        else
            log_action "WARNING" "Validação encontrou problemas (verifique relatório)"
            return 1
        fi
    else
        log_action "INFO" "Validação pulada (flag desabilitada)"
        return 0
    fi
}

# Função para atualizar métricas e dashboard
update_metrics_dashboard() {
    if [[ "$UPDATE_METRICS" == true ]]; then
        log_action "INFO" "Atualizando métricas e dashboard..."
        
        if "$SCRIPTS_DIR/metrics_dashboard.sh" > /dev/null 2>&1; then
            log_action "SUCCESS" "Dashboard de métricas atualizado"
            return 0
        else
            log_action "ERROR" "Falha ao atualizar dashboard de métricas"
            return 1
        fi
    else
        log_action "INFO" "Atualização de métricas pulada (flag desabilitada)"
        return 0
    fi
}

# Função para versionamento automático (apenas se solicitado)
run_auto_versioning() {
    if [[ "$AUTO_VERSION" == true ]]; then
        log_action "INFO" "Executando versionamento automático..."
        
        # Verificar se há mudanças significativas
        if git diff --cached --quiet -- "$DOCS_DIR" 2>/dev/null; then
            log_action "INFO" "Nenhuma mudança detectada, pulando versionamento"
            return 0
        fi
        
        if echo "y" | "$SCRIPTS_DIR/auto_version.sh" auto > /dev/null 2>&1; then
            log_action "SUCCESS" "Versionamento automático concluído"
            return 0
        else
            log_action "WARNING" "Versionamento não executado (pode ser normal)"
            return 1
        fi
    else
        log_action "INFO" "Versionamento automático pulado (flag desabilitada)"
        return 0
    fi
}

# Função para gerar relatórios consolidados
generate_reports() {
    if [[ "$GENERATE_REPORTS" == true ]]; then
        log_action "INFO" "Gerando relatórios consolidados..."
        
        local report_file="$DOCS_DIR/project-management/automation-report-$(date +%Y%m%d-%H%M%S).md"
        
        cat > "$report_file" << EOF
# 🤖 **Relatório de Automação da Documentação**

**Data:** $(date '+%d/%m/%Y %H:%M:%S')  
**Versão:** $(cat "$DOCS_DIR/VERSION" 2>/dev/null || echo "1.0.0")  
**Executado por:** Automação do Sistema  

---

## 📊 **Resumo da Execução**

### ✅ **Tarefas Executadas**
$(if [[ "$VALIDATE_DOCS" == true ]]; then echo "- 🔍 Validação da documentação"; fi)
$(if [[ "$UPDATE_METRICS" == true ]]; then echo "- 📊 Atualização de métricas e dashboard"; fi)
$(if [[ "$AUTO_VERSION" == true ]]; then echo "- 📋 Versionamento automático"; fi)
$(if [[ "$GENERATE_REPORTS" == true ]]; then echo "- 📝 Geração de relatórios"; fi)
$(if [[ "$CLEAN_TEMP" == true ]]; then echo "- 🧹 Limpeza de arquivos temporários"; fi)

### 📈 **Métricas Atuais**
$(if [[ -f "$DOCS_DIR/project-management/docs-metrics.json" ]]; then
    local quality_score=$(jq -r '.validation.qualityScore // "N/A"' "$DOCS_DIR/project-management/docs-metrics.json")
    local broken_links=$(jq -r '.validation.brokenLinks // "N/A"' "$DOCS_DIR/project-management/docs-metrics.json")
    echo "- **Score de Qualidade:** $quality_score%"
    echo "- **Links Quebrados:** $broken_links"
    echo "- **Status:** $(jq -r '.status // "N/A"' "$DOCS_DIR/project-management/docs-metrics.json")"
else
    echo "- **Métricas:** Execute validação para obter dados atuais"
fi)

### 🎯 **Status dos Componentes**
$(check_component_status)

---

## 🔗 **Links Úteis**

- 📊 **[Dashboard de Métricas](metrics/quality-dashboard.md)** - Qualidade atual
- 📋 **[Status do Projeto](project-management/status.md)** - Progresso geral  
- 🏠 **[Documentação Principal](README.md)** - Página inicial

---

## ⏰ **Próxima Execução**

**Recomendada:** $(date -d '+7 days' '+%d/%m/%Y')  
**Comando:** \`scripts/docs/docs_automation.sh --auto\`

---

*Relatório gerado automaticamente pelo Sistema de Automação*
EOF

        log_action "SUCCESS" "Relatório gerado: $report_file"
        return 0
    else
        log_action "INFO" "Geração de relatórios pulada (flag desabilitada)"
        return 0
    fi
}

# Função para verificar status dos componentes
check_component_status() {
    local components=(
        "README.md:Documentação principal"
        "user-guide/:Guia do usuário"
        "developer-guide/:Guia do desenvolvedor"
        "operations/:Documentação operacional"
        "templates/:Templates de documentação"
    )
    
    for component in "${components[@]}"; do
        local path="${component%%:*}"
        local name="${component##*:}"
        
        if [[ -e "$DOCS_DIR/$path" ]]; then
            echo "- ✅ **$name:** OK"
        else
            echo "- ❌ **$name:** Ausente"
        fi
    done
}

# Função para limpeza de arquivos temporários
clean_temporary_files() {
    if [[ "$CLEAN_TEMP" == true ]]; then
        log_action "INFO" "Limpando arquivos temporários..."
        
        # Encontrar e remover arquivos temporários
        local temp_files_found=0
        
        # Limpar arquivos .bak
        find "$DOCS_DIR" -name "*.bak" -type f -delete 2>/dev/null && temp_files_found=$((temp_files_found + 1)) || true
        
        # Limpar arquivos .tmp
        find "$DOCS_DIR" -name "*.tmp" -type f -delete 2>/dev/null && temp_files_found=$((temp_files_found + 1)) || true
        
        # Limpar diretórios vazios (exceto archived)
        find "$DOCS_DIR" -type d -empty ! -path "*/archived/*" -delete 2>/dev/null || true
        
        log_action "SUCCESS" "Limpeza concluída ($temp_files_found arquivos temporários removidos)"
        return 0
    else
        log_action "INFO" "Limpeza de arquivos temporários pulada (flag desabilitada)"
        return 0
    fi
}

# Função para gerar notificações/alertas
generate_notifications() {
    if [[ "$SEND_NOTIFICATIONS" == true ]]; then
        log_action "INFO" "Gerando notificações e alertas..."
        
        local alerts=()
        local timestamp=$(date -Iseconds)
        
        # Verificar se há problemas críticos
        if [[ -f "$DOCS_DIR/project-management/docs-metrics.json" ]]; then
            local broken_links=$(jq -r '.validation.brokenLinks // 0' "$DOCS_DIR/project-management/docs-metrics.json")
            local missing_files=$(jq -r '.validation.missingFiles // 0' "$DOCS_DIR/project-management/docs-metrics.json")
            local quality_score=$(jq -r '.validation.qualityScore // 85' "$DOCS_DIR/project-management/docs-metrics.json")
            
            if [[ $broken_links -gt 0 ]]; then
                alerts+=("CRÍTICO: $broken_links links quebrados encontrados")
            fi
            
            if [[ $missing_files -gt 5 ]]; then
                alerts+=("ATENÇÃO: $missing_files arquivos importantes ausentes")
            fi
            
            if [[ $quality_score -lt 70 ]]; then
                alerts+=("QUALIDADE: Score baixo de $quality_score% (meta: 95%)")
            fi
        fi
        
        # Gerar arquivo de notificações
        local notification_data=$(cat << EOF
{
  "timestamp": "$timestamp",
  "date": "$(date '+%Y-%m-%d')",
  "time": "$(date '+%H:%M:%S')",
  "automation_run": {
    "status": "completed",
    "tasks_executed": [
      $(if [[ "$VALIDATE_DOCS" == true ]]; then echo "\"validation\""; fi)
      $(if [[ "$UPDATE_METRICS" == true ]]; then echo ", \"metrics\""; fi)
      $(if [[ "$AUTO_VERSION" == true ]]; then echo ", \"versioning\""; fi)
      $(if [[ "$GENERATE_REPORTS" == true ]]; then echo ", \"reports\""; fi)
    ],
    "alerts": [
      $(printf '"%s",' "${alerts[@]}" | sed 's/,$//')
    ],
    "next_run_recommended": "$(date -d '+7 days' -Iseconds)"
  }
}
EOF
)
        
        echo "$notification_data" > "$NOTIFICATION_FILE"
        
        if [[ ${#alerts[@]} -gt 0 ]]; then
            log_action "WARNING" "${#alerts[@]} alertas gerados (verifique $NOTIFICATION_FILE)"
        else
            log_action "SUCCESS" "Nenhum alerta - sistema funcionando bem"
        fi
        
        return 0
    else
        log_action "INFO" "Geração de notificações pulada (flag desabilitada)"
        return 0
    fi
}

# Função para inicializar log
initialize_log() {
    mkdir -p "$(dirname "$LOG_FILE")"
    
    cat > "$LOG_FILE" << EOF
# 📋 **Log de Automação da Documentação**

**Início da Execução:** $(date '+%d/%m/%Y %H:%M:%S')  
**Versão:** $(cat "$DOCS_DIR/VERSION" 2>/dev/null || echo "1.0.0")  
**Sistema:** $(uname -s)  
**Usuário:** $(whoami)  

---

## 📊 **Log de Atividades**

EOF
}

# Função para finalizar execução
finalize_execution() {
    local total_errors="$1"
    local total_warnings="$2"
    
    # Adicionar resumo ao log
    cat >> "$LOG_FILE" << EOF

---

## 📊 **Resumo da Execução**

**Finalizado em:** $(date '+%d/%m/%Y %H:%M:%S')  
**Duração:** $SECONDS segundos  
**Erros:** $total_errors  
**Avisos:** $total_warnings  
**Status:** $(if [[ $total_errors -eq 0 ]]; then echo "✅ Sucesso"; else echo "⚠️ Com problemas"; fi)

### 🔗 **Arquivos Gerados**
- 📊 Dashboard: docs/metrics/quality-dashboard.md
- 📋 Métricas: docs/project-management/docs-metrics.json  
- 🔔 Notificações: docs/project-management/automation-alerts.json

### ⏰ **Próxima Execução Recomendada**
$(date -d '+7 days' '+%d/%m/%Y')

---

*Automação concluída com $(if [[ $total_errors -eq 0 ]]; then echo "sucesso"; else echo "$total_errors problema(s)"; fi)*
EOF

    echo ""
    echo -e "${BLUE}📊 RESUMO FINAL${NC}"
    echo "================================================================="
    echo -e "⏱️  Duração: ${YELLOW}${SECONDS}s${NC}"
    echo -e "❌ Erros: ${YELLOW}$total_errors${NC}"
    echo -e "⚠️  Avisos: ${YELLOW}$total_warnings${NC}"
    echo -e "📋 Log completo: ${CYAN}$LOG_FILE${NC}"
    
    if [[ $total_errors -eq 0 ]]; then
        echo -e "${GREEN}🎉 Automação concluída com sucesso!${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Automação concluída com $total_errors problema(s)${NC}"
        return 1
    fi
}

# Função principal
main() {
    local mode="${1:-full}"
    local errors=0
    local warnings=0
    
    # Configurar flags baseado no modo
    case "$mode" in
        "quick")
            AUTO_VERSION=false
            GENERATE_REPORTS=false
            ;;
        "validate-only")
            UPDATE_METRICS=false
            AUTO_VERSION=false
            GENERATE_REPORTS=false
            CLEAN_TEMP=false
            ;;
        "metrics-only")
            VALIDATE_DOCS=false
            AUTO_VERSION=false
            GENERATE_REPORTS=false
            ;;
        "version")
            AUTO_VERSION=true
            ;;
        "full"|"auto")
            # Usar configurações padrão
            ;;
    esac
    
    # Inicializar
    initialize_log
    log_action "INFO" "Iniciando automação da documentação (modo: $mode)"
    
    # Verificar dependências
    if ! check_dependencies; then
        ((errors++))
        log_action "ERROR" "Falha na verificação de dependências"
        finalize_execution $errors $warnings
        return 1
    fi
    
    # Executar tarefas
    echo -e "${BLUE}🚀 Executando tarefas de automação...${NC}"
    echo ""
    
    # 1. Validação
    if ! run_validation; then
        ((warnings++))
    fi
    
    # 2. Métricas e Dashboard
    if ! update_metrics_dashboard; then
        ((errors++))
    fi
    
    # 3. Versionamento (se solicitado)
    if ! run_auto_versioning; then
        ((warnings++))
    fi
    
    # 4. Relatórios
    if ! generate_reports; then
        ((warnings++))
    fi
    
    # 5. Limpeza
    if ! clean_temporary_files; then
        ((warnings++))
    fi
    
    # 6. Notificações
    if ! generate_notifications; then
        ((warnings++))
    fi
    
    # Finalizar
    finalize_execution $errors $warnings
}

# Função para ajuda
show_help() {
    cat << EOF
🤖 **Sistema de Automação da Documentação**

USO:
    $0 [MODO]

MODOS:
    full             Execução completa (padrão)
    auto             Alias para 'full' (para uso em cron)
    quick            Execução rápida (sem versionamento/relatórios)
    validate-only    Apenas validação da documentação
    metrics-only     Apenas atualização de métricas
    version          Forçar versionamento automático

FUNCIONALIDADES:
    🔍 Validação automática da documentação
    📊 Atualização de métricas e dashboard
    📋 Versionamento automático (quando apropriado)
    📝 Geração de relatórios consolidados
    🧹 Limpeza de arquivos temporários
    🔔 Sistema de notificações e alertas

EXEMPLOS:
    $0                    # Execução completa
    $0 quick              # Execução rápida  
    $0 validate-only      # Apenas validação
    $0 metrics-only       # Apenas métricas

AUTOMAÇÃO:
    # Adicionar ao crontab para execução semanal:
    0 8 * * 1 /path/to/scripts/docs/docs_automation.sh auto

ARQUIVOS GERADOS:
    - docs/project-management/automation-log.md
    - docs/project-management/automation-alerts.json
    - docs/metrics/quality-dashboard.md
    - docs/project-management/docs-metrics.json

EOF
}

# Processamento de argumentos
case "${1:-full}" in
    -h|--help)
        show_help
        ;;
    full|auto|quick|validate-only|metrics-only|version)
        main "$1"
        ;;
    *)
        echo -e "${RED}❌ Modo inválido: $1${NC}"
        echo -e "${YELLOW}   Use -h para ajuda${NC}"
        exit 1
        ;;
esac 