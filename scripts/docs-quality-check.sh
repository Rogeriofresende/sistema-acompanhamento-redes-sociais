#!/bin/bash

# 📊 Script de Verificação de Qualidade da Documentação
# Sistema Lancei Essa
# Data: 29/01/2025

set -e

echo "📚 Verificação de Qualidade da Documentação - Sistema Lancei Essa"
echo "================================================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
ERRORS=0
WARNINGS=0
SUCCESS=0

# Função para log colorido
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((SUCCESS++))
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Verificar estrutura de pastas
echo "🏗️ Verificando estrutura de pastas..."
echo "------------------------------------"

required_dirs=("docs/user-guide" "docs/developer-guide" "docs/operations" "docs/templates" "docs/project-management")

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        log_success "Pasta $dir existe"
    else
        log_error "Pasta $dir não encontrada"
    fi
done

echo ""

# 2. Verificar arquivos obrigatórios
echo "📋 Verificando arquivos obrigatórios..."
echo "--------------------------------------"

required_files=(
    "README.md"
    "docs/README.md"
    "docs/user-guide/getting-started.md"
    "docs/user-guide/faq.md"
    "docs/developer-guide/quick-start.md"
    "docs/developer-guide/architecture/overview.md"
    "docs/operations/deployment/production-setup.md"
    "docs/operations/monitoring/setup.md"
    "docs/project-management/status.md"
    "docs/templates/style-guide.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "Arquivo $file existe"
    else
        log_error "Arquivo $file não encontrado"
    fi
done

echo ""

# 3. Verificar formato dos READMEs
echo "📝 Verificando formato dos READMEs..."
echo "------------------------------------"

check_readme_format() {
    local file=$1
    local filename=$(basename "$file")
    
    if [ -f "$file" ]; then
        # Verificar se tem título
        if head -5 "$file" | grep -q "^#"; then
            log_success "$filename tem título principal"
        else
            log_error "$filename não tem título principal (H1)"
        fi
        
        # Verificar metadados
        if head -10 "$file" | grep -q -E "(Data:|Versão:|Status:)"; then
            log_success "$filename tem metadados"
        else
            log_warning "$filename poderia ter metadados (Data, Versão, Status)"
        fi
        
        # Verificar links
        link_count=$(grep -c "\[.*\](" "$file" || echo "0")
        if [ "$link_count" -gt 0 ]; then
            log_success "$filename tem $link_count links"
        else
            log_warning "$filename não tem links internos"
        fi
    fi
}

check_readme_format "README.md"
check_readme_format "docs/README.md"

echo ""

# 4. Verificar consistência de links
echo "🔗 Verificando links internos..."
echo "-------------------------------"

total_links=0
broken_links=0

# Encontrar todos os links internos
while IFS= read -r -d '' file; do
    while IFS= read -r line; do
        if echo "$line" | grep -q '\]\(\./\|docs/\|#\)'; then
            links=$(echo "$line" | grep -o '\]\([^)]*\)' | sed 's/](\|)//g')
            for link in $links; do
                ((total_links++))
                # Verificar se é link interno e se arquivo existe
                if [[ "$link" == ./* ]] || [[ "$link" == docs/* ]]; then
                    # Remover âncoras (#section)
                    clean_link=$(echo "$link" | cut -d'#' -f1)
                    if [ -n "$clean_link" ] && [ ! -f "$clean_link" ]; then
                        log_error "Link quebrado em $file: $link"
                        ((broken_links++))
                    fi
                fi
            done
        fi
    done < "$file"
done < <(find docs/ -name "*.md" -print0)

if [ "$broken_links" -eq 0 ]; then
    log_success "Todos os $total_links links internos estão funcionais"
else
    log_error "$broken_links links quebrados de $total_links totais"
fi

echo ""

# 5. Verificar duplicação de conteúdo
echo "🔄 Verificando duplicação de conteúdo..."
echo "---------------------------------------"

# Verificar títulos duplicados
duplicate_titles=$(find docs/ -name "*.md" -exec grep -l "^# " {} \; | xargs grep "^# " | cut -d':' -f2 | sort | uniq -d | wc -l)

if [ "$duplicate_titles" -eq 0 ]; then
    log_success "Não há títulos duplicados"
else
    log_warning "$duplicate_titles títulos duplicados encontrados"
fi

echo ""

# 6. Verificar qualidade dos templates
echo "🎨 Verificando qualidade dos templates..."
echo "----------------------------------------"

template_files=("docs/templates/style-guide.md" "docs/templates/feature-doc.md" "docs/templates/api-endpoint.md" "docs/templates/troubleshooting.md")

for template in "${template_files[@]}"; do
    if [ -f "$template" ]; then
        # Verificar se tem seções template
        if grep -q "##" "$template"; then
            log_success "$(basename "$template") tem estrutura de seções"
        else
            log_warning "$(basename "$template") poderia ter mais seções"
        fi
        
        # Verificar exemplos
        if grep -q -i "exemplo\|example" "$template"; then
            log_success "$(basename "$template") tem exemplos"
        else
            log_warning "$(basename "$template") poderia ter mais exemplos"
        fi
    fi
done

echo ""

# 7. Verificar métricas de conteúdo
echo "📊 Verificando métricas de conteúdo..."
echo "-------------------------------------"

total_files=$(find docs/ -name "*.md" | wc -l)
total_lines=$(find docs/ -name "*.md" -exec wc -l {} + | tail -1 | awk '{print $1}')
total_words=$(find docs/ -name "*.md" -exec wc -w {} + | tail -1 | awk '{print $1}')

log_info "Total de arquivos: $total_files"
log_info "Total de linhas: $total_lines"
log_info "Total de palavras: $total_words"

# Verificar distribuição por pasta
echo ""
echo "📂 Distribuição por pasta:"
for dir in docs/*/; do
    if [ -d "$dir" ]; then
        count=$(find "$dir" -name "*.md" | wc -l)
        lines=$(find "$dir" -name "*.md" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}' 2>/dev/null || echo "0")
        echo "   $(basename "$dir"): $count arquivos, $lines linhas"
    fi
done

echo ""

# 8. Verificar acessibilidade
echo "♿ Verificando acessibilidade..."
echo "------------------------------"

# Verificar imagens com alt text
images_without_alt=$(grep -r "!\[.*\](" docs/ | grep -v "!\[.*\]" | wc -l)
if [ "$images_without_alt" -eq 0 ]; then
    log_success "Todas as imagens têm texto alternativo"
else
    log_warning "$images_without_alt imagens poderiam ter melhor texto alternativo"
fi

# Verificar links descritivos
non_descriptive_links=$(grep -r "\[click here\|clique aqui\|here\|aqui\](" docs/ | wc -l)
if [ "$non_descriptive_links" -eq 0 ]; then
    log_success "Todos os links são descritivos"
else
    log_warning "$non_descriptive_links links poderiam ser mais descritivos"
fi

echo ""

# 9. Verificar atualização recente
echo "🕒 Verificando atualizações recentes..."
echo "-------------------------------------"

recent_files=$(find docs/ -name "*.md" -mtime -7 | wc -l)
old_files=$(find docs/ -name "*.md" -mtime +30 | wc -l)

log_info "$recent_files arquivos atualizados na última semana"
if [ "$old_files" -gt 0 ]; then
    log_warning "$old_files arquivos não atualizados há mais de 30 dias"
else
    log_success "Toda documentação foi atualizada recentemente"
fi

echo ""

# 10. Gerar relatório final
echo "📋 RELATÓRIO FINAL"
echo "=================="

total_checks=$((SUCCESS + WARNINGS + ERRORS))
quality_score=$(echo "scale=1; ($SUCCESS * 100) / $total_checks" | bc -l 2>/dev/null || echo "0")

echo -e "${GREEN}✅ Sucessos: $SUCCESS${NC}"
echo -e "${YELLOW}⚠️  Avisos: $WARNINGS${NC}"
echo -e "${RED}❌ Erros: $ERRORS${NC}"
echo ""
echo -e "${BLUE}📊 Score de Qualidade: $quality_score%${NC}"

# Determinar status geral
if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -lt 3 ]; then
    echo -e "${GREEN}🎉 Status: EXCELENTE${NC}"
    exit_code=0
elif [ "$ERRORS" -eq 0 ]; then
    echo -e "${YELLOW}✨ Status: BOM (alguns avisos)${NC}"
    exit_code=0
elif [ "$ERRORS" -lt 3 ]; then
    echo -e "${YELLOW}⚠️  Status: PRECISA MELHORAR${NC}"
    exit_code=1
else
    echo -e "${RED}❌ Status: CRÍTICO${NC}"
    exit_code=1
fi

echo ""
echo "💡 Dicas para melhorar:"
echo "- Execute 'npm install -g markdownlint-cli' para validação automática"
echo "- Use os templates em docs/templates/ para novos documentos"
echo "- Mantenha os links internos atualizados"
echo "- Adicione exemplos práticos sempre que possível"

exit $exit_code 