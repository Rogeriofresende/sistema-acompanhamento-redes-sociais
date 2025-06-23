#!/bin/bash

# =============================================================================
# SISTEMA LANCEI ESSA - DASHBOARD DE MÉTRICAS DA DOCUMENTAÇÃO
# =============================================================================
# Descrição: Sistema automatizado de métricas e dashboard para documentação
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
DOCS_DIR="docs"
METRICS_DIR="$DOCS_DIR/metrics"
DASHBOARD_FILE="$METRICS_DIR/quality-dashboard.md"
METRICS_JSON="$DOCS_DIR/project-management/docs-metrics.json"
HISTORY_FILE="$METRICS_DIR/metrics-history.json"

# Variáveis de métricas
TOTAL_FILES=0
TOTAL_LINES=0
TOTAL_SIZE=0
BROKEN_LINKS=0
MISSING_FILES=0
FORMAT_ISSUES=0
COVERAGE_SCORE=0
QUALITY_SCORE=0

echo -e "${BLUE}📊 SISTEMA LANCEI ESSA - DASHBOARD DE MÉTRICAS${NC}"
echo "================================================================="
echo -e "📅 Executado em: ${YELLOW}$(date)${NC}"
echo -e "📂 Diretório: ${YELLOW}$(pwd)${NC}"
echo ""

# Função para criar diretórios necessários
setup_directories() {
    mkdir -p "$METRICS_DIR"
    echo -e "${GREEN}✅ Diretório de métricas configurado${NC}"
}

# Função para coletar métricas básicas
collect_basic_metrics() {
    echo -e "${BLUE}📋 Coletando métricas básicas...${NC}"
    
    # Contar arquivos markdown
    TOTAL_FILES=$(find "$DOCS_DIR" -name "*.md" -not -path "*/archived/*" | wc -l)
    
    # Contar linhas de documentação
    TOTAL_LINES=$(find "$DOCS_DIR" -name "*.md" -not -path "*/archived/*" -exec wc -l {} + | tail -1 | awk '{print $1}')
    
    # Calcular tamanho total
    TOTAL_SIZE=$(du -sh "$DOCS_DIR" | cut -f1)
    
    echo -e "${CYAN}   📄 Arquivos markdown: ${YELLOW}$TOTAL_FILES${NC}"
    echo -e "${CYAN}   📝 Total de linhas: ${YELLOW}$TOTAL_LINES${NC}"
    echo -e "${CYAN}   💾 Tamanho total: ${YELLOW}$TOTAL_SIZE${NC}"
}

# Função para analisar cobertura da documentação
analyze_coverage() {
    echo -e "${BLUE}🔍 Analisando cobertura da documentação...${NC}"
    
    local required_docs=(
        "README.md"
        "user-guide/getting-started.md"
        "user-guide/faq.md"
        "developer-guide/quick-start.md"
        "developer-guide/architecture/overview.md"
        "operations/deployment/production-setup.md"
        "project-management/status.md"
        "templates/style-guide.md"
    )
    
    local existing_docs=0
    local total_required=${#required_docs[@]}
    
    for doc in "${required_docs[@]}"; do
        if [[ -f "$DOCS_DIR/$doc" ]]; then
            ((existing_docs++))
        fi
    done
    
    COVERAGE_SCORE=$((existing_docs * 100 / total_required))
    
    echo -e "${CYAN}   📊 Documentos obrigatórios: ${existing_docs}/${total_required}${NC}"
    echo -e "${CYAN}   🎯 Score de cobertura: ${YELLOW}$COVERAGE_SCORE%${NC}"
}

# Função para verificar qualidade do conteúdo
analyze_content_quality() {
    echo -e "${BLUE}📝 Analisando qualidade do conteúdo...${NC}"
    
    local quality_issues=0
    local total_checks=0
    
    # Verificar arquivos sem headers
    local files_without_headers=$(find "$DOCS_DIR" -name "*.md" -not -path "*/archived/*" -exec grep -L "^# " {} \; | wc -l)
    ((total_checks++))
    if [[ $files_without_headers -gt 0 ]]; then
        ((quality_issues++))
    fi
    
    # Verificar arquivos muito curtos (< 10 linhas)
    local short_files=$(find "$DOCS_DIR" -name "*.md" -not -path "*/archived/*" -exec wc -l {} \; | awk '$1 < 10 {print $2}' | wc -l)
    ((total_checks++))
    if [[ $short_files -gt 2 ]]; then  # Tolerar até 2 arquivos curtos
        ((quality_issues++))
    fi
    
    # Verificar README principal
    ((total_checks++))
    if [[ -f "README.md" ]] && [[ $(wc -l < "README.md") -gt 50 ]]; then
        # README tem tamanho adequado
        :
    else
        ((quality_issues++))
    fi
    
    # Verificar se há TOC nos documentos longos
    local long_docs_without_toc=$(find "$DOCS_DIR" -name "*.md" -not -path "*/archived/*" -exec sh -c 'wc -l < "$1" | awk "(\$1 > 100)" && ! grep -q "## " "$1" && echo "$1"' _ {} \; | wc -l)
    ((total_checks++))
    if [[ $long_docs_without_toc -gt 0 ]]; then
        ((quality_issues++))
    fi
    
    # Calcular score de qualidade do conteúdo
    local content_quality_score=$((100 - (quality_issues * 100 / total_checks)))
    
    echo -e "${CYAN}   📊 Verificações de qualidade: $((total_checks - quality_issues))/${total_checks}${NC}"
    echo -e "${CYAN}   🎯 Score de qualidade: ${YELLOW}$content_quality_score%${NC}"
    
    # Atualizar contadores globais
    FORMAT_ISSUES=$quality_issues
}

# Função para analisar estrutura e navegação
analyze_navigation() {
    echo -e "${BLUE}🗺️ Analisando navegação e estrutura...${NC}"
    
    local nav_score=100
    
    # Verificar se README principal tem navegação
    if [[ -f "$DOCS_DIR/README.md" ]]; then
        if ! grep -qE "\[.*\]\(.*\.md\)" "$DOCS_DIR/README.md"; then
            nav_score=$((nav_score - 20))
        fi
    else
        nav_score=$((nav_score - 30))
    fi
    
    # Verificar estrutura de diretórios
    local required_dirs=("user-guide" "developer-guide" "operations" "templates")
    local missing_dirs=0
    
    for dir in "${required_dirs[@]}"; do
        if [[ ! -d "$DOCS_DIR/$dir" ]]; then
            ((missing_dirs++))
        fi
    done
    
    nav_score=$((nav_score - (missing_dirs * 15)))
    
    # Limitar score mínimo
    if [[ $nav_score -lt 0 ]]; then
        nav_score=0
    fi
    
    echo -e "${CYAN}   🗂️ Diretórios estruturais: $((${#required_dirs[@]} - missing_dirs))/${#required_dirs[@]}${NC}"
    echo -e "${CYAN}   🧭 Score de navegação: ${YELLOW}$nav_score%${NC}"
    
    return $nav_score
}

# Função para carregar métricas de validação
load_validation_metrics() {
    echo -e "${BLUE}📊 Carregando métricas de validação...${NC}"
    
    if [[ -f "$METRICS_JSON" ]]; then
        BROKEN_LINKS=$(jq -r '.validation.brokenLinks // 0' "$METRICS_JSON")
        MISSING_FILES=$(jq -r '.validation.missingFiles // 0' "$METRICS_JSON")
        QUALITY_SCORE=$(jq -r '.validation.qualityScore // 85' "$METRICS_JSON")
        
        echo -e "${CYAN}   🔗 Links quebrados: ${YELLOW}$BROKEN_LINKS${NC}"
        echo -e "${CYAN}   📄 Arquivos ausentes: ${YELLOW}$MISSING_FILES${NC}"
        echo -e "${CYAN}   🎯 Score validação: ${YELLOW}$QUALITY_SCORE%${NC}"
    else
        echo -e "${YELLOW}⚠️  Métricas de validação não encontradas. Execute validate_docs.sh primeiro${NC}"
        QUALITY_SCORE=85  # Score padrão conservador
    fi
}

# Função para calcular score geral
calculate_overall_score() {
    echo -e "${BLUE}🎯 Calculando score geral de qualidade...${NC}"
    
    # Pesos para diferentes aspectos
    local coverage_weight=25
    local quality_weight=30
    local navigation_weight=20
    local validation_weight=25
    
    # Obter score de navegação
    analyze_navigation
    local nav_score=$?
    
    # Calcular score ponderado
    QUALITY_SCORE=$(( 
        (COVERAGE_SCORE * coverage_weight + 
         (100 - FORMAT_ISSUES * 10) * quality_weight + 
         nav_score * navigation_weight + 
         QUALITY_SCORE * validation_weight) / 100
    ))
    
    # Limitar entre 0 e 100
    if [[ $QUALITY_SCORE -gt 100 ]]; then
        QUALITY_SCORE=100
    elif [[ $QUALITY_SCORE -lt 0 ]]; then
        QUALITY_SCORE=0
    fi
    
    echo -e "${CYAN}   🏆 Score geral: ${YELLOW}$QUALITY_SCORE%${NC}"
}

# Função para salvar histórico de métricas
save_metrics_history() {
    echo -e "${BLUE}💾 Salvando histórico de métricas...${NC}"
    
    local timestamp=$(date -Iseconds)
    local new_entry=$(cat << EOF
{
  "timestamp": "$timestamp",
  "date": "$(date '+%Y-%m-%d')",
  "time": "$(date '+%H:%M:%S')",
  "metrics": {
    "totalFiles": $TOTAL_FILES,
    "totalLines": $TOTAL_LINES,
    "totalSize": "$TOTAL_SIZE",
    "coverageScore": $COVERAGE_SCORE,
    "qualityScore": $QUALITY_SCORE,
    "brokenLinks": $BROKEN_LINKS,
    "missingFiles": $MISSING_FILES,
    "formatIssues": $FORMAT_ISSUES
  }
}
EOF
)
    
    # Criar ou atualizar histórico
    if [[ -f "$HISTORY_FILE" ]]; then
        # Adicionar nova entrada ao array existente
        local temp_file=$(mktemp)
        jq ". += [$new_entry]" "$HISTORY_FILE" > "$temp_file"
        mv "$temp_file" "$HISTORY_FILE"
    else
        # Criar novo arquivo de histórico
        echo "[$new_entry]" > "$HISTORY_FILE"
    fi
    
    echo -e "${GREEN}✅ Histórico salvo em: ${CYAN}$HISTORY_FILE${NC}"
}

# Função para gerar dashboard HTML-like em markdown
generate_dashboard() {
    echo -e "${BLUE}📊 Gerando dashboard de qualidade...${NC}"
    
    # Calcular tendência se há histórico
    local trend=""
    local trend_icon=""
    if [[ -f "$HISTORY_FILE" ]] && [[ $(jq 'length' "$HISTORY_FILE") -gt 1 ]]; then
        local previous_score=$(jq -r '.[-2].metrics.qualityScore // 85' "$HISTORY_FILE")
        local current_score=$QUALITY_SCORE
        local diff=$((current_score - previous_score))
        
        if [[ $diff -gt 0 ]]; then
            trend="↗️ +$diff%"
            trend_icon="📈"
        elif [[ $diff -lt 0 ]]; then
            trend="↘️ $diff%"
            trend_icon="📉"
        else
            trend="→ Estável"
            trend_icon="📊"
        fi
    else
        trend="📊 Primeira medição"
        trend_icon="🆕"
    fi
    
    # Determinar status geral
    local status_color=""
    local status_text=""
    local status_icon=""
    
    if [[ $QUALITY_SCORE -ge 95 ]]; then
        status_color="🟢"
        status_text="EXCELENTE"
        status_icon="🏆"
    elif [[ $QUALITY_SCORE -ge 85 ]]; then
        status_color="🟡"
        status_text="BOM"
        status_icon="✅"
    elif [[ $QUALITY_SCORE -ge 70 ]]; then
        status_color="🟠"
        status_text="REGULAR"
        status_icon="⚠️"
    else
        status_color="🔴"
        status_text="PRECISA MELHORAR"
        status_icon="❌"
    fi
    
    cat > "$DASHBOARD_FILE" << EOF
# 📊 **Dashboard de Qualidade da Documentação**

**Última Atualização:** $(date '+%d/%m/%Y %H:%M:%S')  
**Versão:** $(cat "$DOCS_DIR/VERSION" 2>/dev/null || echo "1.0.0")  
**Status Geral:** $status_color **$status_text** $status_icon  

---

## 🎯 **Score Geral de Qualidade**

<div align="center">

### $status_icon **$QUALITY_SCORE%** $trend_icon

$trend

</div>

---

## 📊 **Métricas Principais**

<table>
<tr>
<td width="25%" align="center">

### 📄 **Arquivos**
**$TOTAL_FILES**  
documentos

</td>
<td width="25%" align="center">

### 📝 **Linhas**
**$TOTAL_LINES**  
de conteúdo

</td>
<td width="25%" align="center">

### 💾 **Tamanho**
**$TOTAL_SIZE**  
total

</td>
<td width="25%" align="center">

### 🎯 **Cobertura**
**$COVERAGE_SCORE%**  
documentos obrigatórios

</td>
</tr>
</table>

---

## 🔍 **Análise Detalhada**

### ✅ **Pontos Fortes**
$(if [[ $QUALITY_SCORE -ge 95 ]]; then
    echo "- 🏆 **Qualidade excepcional** - Documentação de nível internacional"
    echo "- 📚 **Cobertura completa** - Todos os aspectos documentados"
    echo "- 🎯 **Navegação otimizada** - Experiência do usuário excelente"
elif [[ $QUALITY_SCORE -ge 85 ]]; then
    echo "- ✅ **Boa qualidade geral** - Documentação bem estruturada"
    echo "- 📊 **Cobertura adequada** - Principais aspectos cobertos"
    echo "- 🗺️ **Navegação funcional** - Usuários conseguem encontrar informações"
else
    echo "- 📝 **Base sólida** - Estrutura básica estabelecida"
    echo "- 🔧 **Potencial identificado** - Áreas de melhoria mapeadas"
fi)

### 🔧 **Áreas de Melhoria**
$(if [[ $BROKEN_LINKS -gt 0 ]]; then
    echo "- 🔗 **$BROKEN_LINKS links quebrados** precisam ser corrigidos"
fi
if [[ $MISSING_FILES -gt 0 ]]; then
    echo "- 📄 **$MISSING_FILES arquivos ausentes** devem ser criados"
fi
if [[ $FORMAT_ISSUES -gt 0 ]]; then
    echo "- 📝 **$FORMAT_ISSUES problemas de formatação** para revisar"
fi
if [[ $COVERAGE_SCORE -lt 90 ]]; then
    echo "- 📊 **Cobertura pode ser expandida** para $((90 - COVERAGE_SCORE))% adicional"
fi)

$(if [[ $BROKEN_LINKS -eq 0 && $MISSING_FILES -eq 0 && $FORMAT_ISSUES -eq 0 && $COVERAGE_SCORE -ge 90 ]]; then
    echo "- 🎉 **Nenhuma melhoria crítica identificada!**"
    echo "- 🚀 **Continue mantendo a qualidade atual**"
fi)

---

## 📈 **Histórico de Qualidade**

$(if [[ -f "$HISTORY_FILE" ]] && [[ $(jq 'length' "$HISTORY_FILE") -gt 1 ]]; then
    echo "### 📊 **Últimas 5 Medições**"
    echo ""
    echo "| Data | Score | Tendência |"
    echo "|------|-------|-----------|"
    
    jq -r '.[-5:] | reverse | .[] | "| \(.date) | \(.metrics.qualityScore)% | \(if .metrics.qualityScore > 90 then "🟢" elif .metrics.qualityScore > 80 then "🟡" else "🔴" end) |"' "$HISTORY_FILE" 2>/dev/null || echo "| $(date '+%Y-%m-%d') | $QUALITY_SCORE% | $status_color |"
else
    echo "### 🆕 **Primeira Medição**"
    echo ""
    echo "Esta é a primeira vez que as métricas são coletadas."
    echo "Execute o dashboard novamente em alguns dias para ver tendências."
fi)

---

## 🎯 **Metas e Objetivos**

### 🏆 **Metas de Qualidade**
- **Target Score:** 95%+ (Excelência)
- **Score Atual:** $QUALITY_SCORE%
- **Distância da meta:** $((95 - QUALITY_SCORE))%

### 📋 **Próximas Ações Recomendadas**
$(if [[ $QUALITY_SCORE -ge 95 ]]; then
    echo "1. 🎉 **Manter excelência atual**"
    echo "2. 📊 **Monitorar métricas semanalmente**"
    echo "3. 🔄 **Revisar e atualizar conteúdo regularmente**"
elif [[ $QUALITY_SCORE -ge 85 ]]; then
    echo "1. 🔗 **Corrigir links quebrados** (se houver)"
    echo "2. 📝 **Melhorar formatação** dos documentos"
    echo "3. 📊 **Expandir cobertura** para 100%"
else
    echo "1. 🚨 **Prioridade: Corrigir problemas críticos**"
    echo "2. 📄 **Completar documentos ausentes**"
    echo "3. 🏗️ **Reestruturar navegação** se necessário"
fi)

---

## 🔧 **Ferramentas de Manutenção**

### 📋 **Scripts Disponíveis**
- **\`scripts/docs/validate_docs.sh\`** - Validação completa da documentação
- **\`scripts/docs/auto_version.sh\`** - Versionamento automático
- **\`scripts/docs/metrics_dashboard.sh\`** - Este dashboard (execute periodicamente)

### ⏰ **Cronograma Recomendado**
- **Diário:** Verificação visual rápida
- **Semanal:** Execução do dashboard de métricas
- **Mensal:** Validação completa + versionamento
- **Trimestral:** Revisão estrutural e melhorias

---

## 📞 **Suporte e Recursos**

### 🆘 **Em Caso de Problemas**
- 📋 **[Guia de Troubleshooting](troubleshooting/)** - Resolução de problemas
- 🎨 **[Style Guide](templates/style-guide.md)** - Padrões de documentação
- 📊 **[Status do Projeto](project-management/status.md)** - Progresso atual

### 🔗 **Links Úteis**
- 🏠 **[Documentação Principal](README.md)** - Início
- 👥 **[Guia do Usuário](user-guide/getting-started.md)** - Como usar
- 👨‍💻 **[Guia do Desenvolvedor](developer-guide/quick-start.md)** - Como contribuir

---

<div align="center">

### 🎯 **Objetivo: Documentação de Classe Mundial**

*Medindo, monitorando e melhorando continuamente*

**Próxima execução recomendada:** $(date -d '+7 days' '+%d/%m/%Y')

</div>

---

*Dashboard gerado automaticamente em $(date '+%d/%m/%Y %H:%M:%S')*
EOF

    echo -e "${GREEN}✅ Dashboard gerado em: ${CYAN}$DASHBOARD_FILE${NC}"
}

# Função para mostrar resumo no terminal
show_terminal_summary() {
    echo ""
    echo -e "${BLUE}📊 RESUMO EXECUTIVO${NC}"
    echo "================================================================="
    echo -e "🎯 Score Geral: ${YELLOW}$QUALITY_SCORE%${NC}"
    echo -e "📄 Total de Arquivos: ${YELLOW}$TOTAL_FILES${NC}"
    echo -e "📝 Total de Linhas: ${YELLOW}$TOTAL_LINES${NC}"
    echo -e "💾 Tamanho Total: ${YELLOW}$TOTAL_SIZE${NC}"
    echo -e "📊 Cobertura: ${YELLOW}$COVERAGE_SCORE%${NC}"
    echo ""
    
    if [[ $QUALITY_SCORE -ge 95 ]]; then
        echo -e "${GREEN}🏆 EXCELENTE! Documentação de alta qualidade${NC}"
    elif [[ $QUALITY_SCORE -ge 85 ]]; then
        echo -e "${YELLOW}✅ BOM! Qualidade aceitável com espaço para melhorias${NC}"
    else
        echo -e "${RED}⚠️  ATENÇÃO! Documentação precisa de melhorias${NC}"
    fi
    
    echo ""
    echo -e "📊 Dashboard completo: ${CYAN}$DASHBOARD_FILE${NC}"
}

# Função principal
main() {
    echo -e "${BLUE}🚀 Iniciando coleta de métricas...${NC}"
    echo ""
    
    # Setup
    setup_directories
    echo ""
    
    # Coletar métricas
    collect_basic_metrics
    echo ""
    
    analyze_coverage
    echo ""
    
    analyze_content_quality
    echo ""
    
    load_validation_metrics
    echo ""
    
    calculate_overall_score
    echo ""
    
    # Salvar e gerar relatórios
    save_metrics_history
    echo ""
    
    generate_dashboard
    echo ""
    
    show_terminal_summary
    
    echo -e "${GREEN}✅ Métricas coletadas e dashboard atualizado!${NC}"
}

# Ajuda
show_help() {
    cat << EOF
📊 **Dashboard de Métricas da Documentação**

USO:
    $0 [OPÇÃO]

OPÇÕES:
    (sem argumentos)  Executar coleta completa de métricas
    -h, --help       Mostrar esta ajuda

FUNCIONALIDADES:
    📊 Coleta automática de métricas de qualidade
    📈 Histórico de evolução da documentação  
    🎯 Score geral de qualidade calculado
    📋 Dashboard visual em markdown
    🔍 Análise de cobertura e estrutura
    💾 Persistência de dados históricos

MÉTRICAS COLETADAS:
    📄 Número total de arquivos
    📝 Total de linhas de documentação
    💾 Tamanho total da documentação
    🎯 Score de cobertura dos documentos obrigatórios
    🔗 Links quebrados (requer validação prévia)
    📊 Problemas de formatação
    🏆 Score geral de qualidade

ARQUIVOS GERADOS:
    - $DASHBOARD_FILE
    - $HISTORY_FILE
    - $METRICS_JSON (se validate_docs.sh foi executado)

FREQUÊNCIA RECOMENDADA:
    - Semanal: Para acompanhar tendências
    - Após mudanças: Para medir impacto
    - Mensal: Para relatórios de qualidade

EOF
}

# Processamento de argumentos
case "${1:-}" in
    -h|--help)
        show_help
        ;;
    "")
        main
        ;;
    *)
        echo -e "${RED}❌ Argumento inválido: $1${NC}"
        echo -e "${YELLOW}   Use -h para ajuda${NC}"
        exit 1
        ;;
esac 