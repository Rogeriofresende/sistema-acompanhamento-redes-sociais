#!/bin/bash

# =============================================================================
# SISTEMA LANCEI ESSA - VALIDADOR AUTOMÁTICO DE DOCUMENTAÇÃO
# =============================================================================
# Descrição: Script que valida automaticamente a documentação
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
NC='\033[0m' # No Color

# Contadores
TOTAL_FILES=0
BROKEN_LINKS=0
MISSING_FILES=0
FORMAT_ISSUES=0
VALIDATION_ERRORS=0

echo -e "${BLUE}🔍 SISTEMA LANCEI ESSA - VALIDADOR DE DOCUMENTAÇÃO${NC}"
echo "================================================================="
echo -e "📅 Executado em: ${YELLOW}$(date)${NC}"
echo -e "📂 Diretório: ${YELLOW}$(pwd)${NC}"
echo ""

# Função para verificar se arquivo existe
check_file_exists() {
    local file_path="$1"
    if [[ ! -f "$file_path" ]]; then
        echo -e "${RED}❌ Arquivo não encontrado: $file_path${NC}"
        ((MISSING_FILES++))
        return 1
    fi
    return 0
}

# Função para validar links markdown
validate_markdown_links() {
    local file="$1"
    echo -e "${BLUE}🔗 Validando links em: ${file}${NC}"
    
    # Extrair links markdown [texto](link)
    grep -oP '\[.*?\]\(\K[^)]*' "$file" 2>/dev/null | while read -r link; do
        # Pular âncoras e links externos
        if [[ "$link" =~ ^#.*$ ]] || [[ "$link" =~ ^https?://.*$ ]]; then
            continue
        fi
        
        # Normalizar caminho relativo
        local full_path
        if [[ "$link" =~ ^\/.*$ ]]; then
            full_path="docs${link}"
        else
            full_path="$(dirname "$file")/$link"
        fi
        
        # Verificar se arquivo existe
        if [[ ! -f "$full_path" ]]; then
            echo -e "${RED}❌ Link quebrado em $file: $link -> $full_path${NC}"
            ((BROKEN_LINKS++))
        fi
    done
}

# Função para verificar estrutura obrigatória
check_required_structure() {
    local file="$1"
    local filename=$(basename "$file")
    
    # README.md deve ter certas seções
    if [[ "$filename" == "README.md" ]]; then
        if ! grep -q "^# " "$file"; then
            echo -e "${RED}❌ README sem título principal em: $file${NC}"
            ((FORMAT_ISSUES++))
        fi
        
        if ! grep -q "## " "$file"; then
            echo -e "${YELLOW}⚠️  README sem seções em: $file${NC}"
            ((FORMAT_ISSUES++))
        fi
    fi
    
    # Verificar se arquivos .md têm extensão correta
    if [[ "$file" =~ \.md$ ]]; then
        # Verificar se não há tabs (deve usar espaços)
        if grep -P '\t' "$file" >/dev/null 2>&1; then
            echo -e "${YELLOW}⚠️  Arquivo com tabs (use espaços): $file${NC}"
            ((FORMAT_ISSUES++))
        fi
        
        # Verificar se linhas não são muito longas (> 100 chars para markdown)
        local long_lines=$(awk 'length > 120 {print NR ": " $0}' "$file" | head -5)
        if [[ -n "$long_lines" ]]; then
            echo -e "${YELLOW}⚠️  Linhas muito longas em $file:${NC}"
            echo "$long_lines" | while read -r line; do
                echo -e "    ${YELLOW}→ $line${NC}"
            done
            ((FORMAT_ISSUES++))
        fi
    fi
}

# Função para verificar templates
validate_templates() {
    echo -e "${BLUE}📋 Validando templates...${NC}"
    
    local templates_dir="docs/templates"
    local required_templates=("style-guide.md" "feature-doc.md" "api-endpoint.md" "troubleshooting.md")
    
    for template in "${required_templates[@]}"; do
        local template_path="$templates_dir/$template"
        if check_file_exists "$template_path"; then
            echo -e "${GREEN}✅ Template encontrado: $template${NC}"
        fi
    done
}

# Função para validar estrutura de diretórios
validate_directory_structure() {
    echo -e "${BLUE}📂 Validando estrutura de diretórios...${NC}"
    
    local required_dirs=(
        "docs/user-guide"
        "docs/developer-guide" 
        "docs/operations"
        "docs/project-management"
        "docs/templates"
        "docs/troubleshooting"
        "docs/archived"
    )
    
    for dir in "${required_dirs[@]}"; do
        if [[ -d "$dir" ]]; then
            echo -e "${GREEN}✅ Diretório existe: $dir${NC}"
        else
            echo -e "${RED}❌ Diretório ausente: $dir${NC}"
            ((MISSING_FILES++))
        fi
    done
}

# Função para verificar arquivos importantes
validate_core_files() {
    echo -e "${BLUE}📄 Validando arquivos principais...${NC}"
    
    local core_files=(
        "README.md"
        "docs/README.md"
        "docs/user-guide/getting-started.md"
        "docs/developer-guide/quick-start.md"
        "docs/project-management/status.md"
    )
    
    for file in "${core_files[@]}"; do
        if check_file_exists "$file"; then
            echo -e "${GREEN}✅ Arquivo principal: $file${NC}"
            validate_markdown_links "$file"
            check_required_structure "$file"
            ((TOTAL_FILES++))
        fi
    done
}

# Função para gerar relatório de métricas
generate_metrics_report() {
    echo ""
    echo -e "${BLUE}📊 RELATÓRIO DE VALIDAÇÃO${NC}"
    echo "================================================================="
    echo -e "📁 Total de arquivos validados: ${YELLOW}$TOTAL_FILES${NC}"
    echo -e "🔗 Links quebrados encontrados: ${RED}$BROKEN_LINKS${NC}"
    echo -e "📄 Arquivos ausentes: ${RED}$MISSING_FILES${NC}"
    echo -e "📝 Problemas de formatação: ${YELLOW}$FORMAT_ISSUES${NC}"
    echo ""
    
    # Calcular score de qualidade
    local total_issues=$((BROKEN_LINKS + MISSING_FILES + FORMAT_ISSUES))
    local quality_score=100
    
    if [[ $total_issues -gt 0 ]]; then
        quality_score=$((100 - (total_issues * 5)))
        if [[ $quality_score -lt 0 ]]; then
            quality_score=0
        fi
    fi
    
    echo -e "🎯 Score de Qualidade: ${GREEN}$quality_score%${NC}"
    
    if [[ $quality_score -ge 95 ]]; then
        echo -e "${GREEN}🏆 EXCELENTE! Documentação de alta qualidade${NC}"
    elif [[ $quality_score -ge 80 ]]; then
        echo -e "${YELLOW}✅ BOM! Algumas melhorias podem ser feitas${NC}"
    else
        echo -e "${RED}⚠️  ATENÇÃO! Documentação precisa de melhorias${NC}"
    fi
    
    # Salvar métricas em arquivo
    local metrics_file="docs/project-management/docs-metrics.json"
    cat > "$metrics_file" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "validation": {
    "totalFiles": $TOTAL_FILES,
    "brokenLinks": $BROKEN_LINKS,
    "missingFiles": $MISSING_FILES,
    "formatIssues": $FORMAT_ISSUES,
    "qualityScore": $quality_score
  },
  "status": "$([ $quality_score -ge 95 ] && echo "excellent" || [ $quality_score -ge 80 ] && echo "good" || echo "needs_improvement")"
}
EOF
    
    echo -e "💾 Métricas salvas em: ${BLUE}$metrics_file${NC}"
}

# EXECUÇÃO PRINCIPAL
echo -e "${BLUE}🚀 Iniciando validação da documentação...${NC}"
echo ""

# 1. Validar estrutura de diretórios
validate_directory_structure

echo ""

# 2. Validar templates
validate_templates

echo ""

# 3. Validar arquivos principais
validate_core_files

echo ""

# 4. Validar todos os arquivos .md
echo -e "${BLUE}📚 Validando todos os arquivos markdown...${NC}"
find docs -name "*.md" -type f | while read -r file; do
    if [[ ! "$file" =~ archived/ ]]; then  # Pular arquivos arquivados
        validate_markdown_links "$file"
        check_required_structure "$file"
        ((TOTAL_FILES++))
    fi
done

# 5. Gerar relatório final
generate_metrics_report

echo ""
echo -e "${GREEN}✅ Validação concluída!${NC}"

# Retornar código de erro se houver problemas críticos
if [[ $BROKEN_LINKS -gt 0 ]] || [[ $MISSING_FILES -gt 5 ]]; then
    echo -e "${RED}❌ Validação falhou devido a problemas críticos${NC}"
    exit 1
fi

exit 0 