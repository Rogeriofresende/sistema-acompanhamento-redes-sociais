#!/bin/bash

# =============================================================================
# SISTEMA LANCEI ESSA - VERSIONAMENTO AUTOMÁTICO DA DOCUMENTAÇÃO
# =============================================================================
# Descrição: Sistema de versionamento automático para documentação
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
NC='\033[0m' # No Color

# Configurações
DOCS_DIR="docs"
VERSION_FILE="$DOCS_DIR/VERSION"
CHANGELOG_FILE="$DOCS_DIR/CHANGELOG.md"
BACKUP_DIR="$DOCS_DIR/archived/versions"
PROJECT_VERSION=""
VERSION_TYPE=""
COMMIT_HASH=""

echo -e "${BLUE}📋 SISTEMA LANCEI ESSA - VERSIONAMENTO AUTOMÁTICO${NC}"
echo "================================================================="
echo -e "📅 Executado em: ${YELLOW}$(date)${NC}"
echo -e "📂 Diretório: ${YELLOW}$(pwd)${NC}"
echo ""

# Função para verificar dependências
check_dependencies() {
    echo -e "${BLUE}🔍 Verificando dependências...${NC}"
    
    local deps=("git" "jq" "awk" "grep")
    local missing_deps=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing_deps+=("$dep")
        fi
    done
    
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        echo -e "${RED}❌ Dependências faltando: ${missing_deps[*]}${NC}"
        echo -e "${YELLOW}   Instale com: brew install ${missing_deps[*]} (macOS)${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Todas as dependências disponíveis${NC}"
}

# Função para obter versão atual
get_current_version() {
    if [[ -f "$VERSION_FILE" ]]; then
        PROJECT_VERSION=$(cat "$VERSION_FILE")
        echo -e "${CYAN}📌 Versão atual: ${YELLOW}$PROJECT_VERSION${NC}"
    else
        PROJECT_VERSION="1.0.0"
        echo -e "${YELLOW}⚠️  Arquivo VERSION não encontrado. Iniciando com: $PROJECT_VERSION${NC}"
        echo "$PROJECT_VERSION" > "$VERSION_FILE"
    fi
}

# Função para calcular próxima versão
calculate_next_version() {
    local current="$1"
    local type="$2"
    
    # Separar versão em major.minor.patch
    local IFS='.'
    read -ra VERSION_PARTS <<< "$current"
    local major="${VERSION_PARTS[0]}"
    local minor="${VERSION_PARTS[1]:-0}"
    local patch="${VERSION_PARTS[2]:-0}"
    
    case "$type" in
        "major")
            major=$((major + 1))
            minor=0
            patch=0
            ;;
        "minor") 
            minor=$((minor + 1))
            patch=0
            ;;
        "patch"|"")
            patch=$((patch + 1))
            ;;
        *)
            echo -e "${RED}❌ Tipo de versão inválido: $type${NC}"
            echo -e "${YELLOW}   Use: major, minor, ou patch${NC}"
            exit 1
            ;;
    esac
    
    echo "$major.$minor.$patch"
}

# Função para detectar tipo de mudança automaticamente
detect_change_type() {
    echo -e "${BLUE}🔍 Analisando mudanças na documentação...${NC}"
    
    # Verificar se há arquivo git
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Git não inicializado. Usando 'patch' como padrão${NC}"
        VERSION_TYPE="patch"
        return
    fi
    
    # Verificar mudanças desde último commit
    local added_files=$(git diff --cached --name-only --diff-filter=A -- "$DOCS_DIR" | wc -l)
    local modified_files=$(git diff --cached --name-only --diff-filter=M -- "$DOCS_DIR" | wc -l)
    local deleted_files=$(git diff --cached --name-only --diff-filter=D -- "$DOCS_DIR" | wc -l)
    
    # Verificar mudanças na estrutura principal
    local structure_changes=$(git diff --cached --name-only -- "$DOCS_DIR" | grep -E "(README\.md|user-guide|developer-guide|operations)" | wc -l)
    
    echo -e "${CYAN}   📊 Arquivos adicionados: ${added_files}${NC}"
    echo -e "${CYAN}   📝 Arquivos modificados: ${modified_files}${NC}"
    echo -e "${CYAN}   🗑️  Arquivos removidos: ${deleted_files}${NC}"
    echo -e "${CYAN}   🏗️  Mudanças estruturais: ${structure_changes}${NC}"
    
    # Lógica de detecção
    if [[ $structure_changes -gt 5 ]] || [[ $added_files -gt 10 ]]; then
        VERSION_TYPE="major"
        echo -e "${GREEN}🎯 Detectado: ${YELLOW}MAJOR${GREEN} (mudanças estruturais significativas)${NC}"
    elif [[ $added_files -gt 3 ]] || [[ $structure_changes -gt 0 ]]; then
        VERSION_TYPE="minor"
        echo -e "${GREEN}🎯 Detectado: ${YELLOW}MINOR${GREEN} (novos recursos ou estrutura)${NC}"
    else
        VERSION_TYPE="patch"
        echo -e "${GREEN}🎯 Detectado: ${YELLOW}PATCH${GREEN} (melhorias e correções)${NC}"
    fi
}

# Função para criar backup da versão atual
create_version_backup() {
    local version="$1"
    local backup_path="$BACKUP_DIR/v$version"
    
    echo -e "${BLUE}💾 Criando backup da versão atual...${NC}"
    
    # Criar diretório de backup
    mkdir -p "$backup_path"
    
    # Copiar arquivos principais
    rsync -av --exclude="archived/" --exclude="*.tmp" "$DOCS_DIR/" "$backup_path/"
    
    # Criar metadados do backup
    cat > "$backup_path/VERSION_INFO.md" << EOF
# 📋 **Backup da Documentação - Versão $version**

**Data do Backup:** $(date '+%d/%m/%Y %H:%M:%S')  
**Commit Hash:** $(git rev-parse HEAD 2>/dev/null || echo "N/A")  
**Branch:** $(git branch --show-current 2>/dev/null || echo "N/A")  
**Usuário:** $(whoami)  

## 📊 **Estatísticas**

- **Total de arquivos:** $(find "$backup_path" -name "*.md" | wc -l)
- **Tamanho total:** $(du -sh "$backup_path" | cut -f1)
- **Última modificação:** $(date '+%d/%m/%Y %H:%M:%S')

## 🔗 **Arquivos Principais**

$(find "$backup_path" -maxdepth 2 -name "*.md" | head -10 | while read file; do
    echo "- [$(basename "$file")]($(realpath --relative-to="$backup_path" "$file"))"
done)

---

*Backup criado automaticamente pelo Sistema de Versionamento*
EOF
    
    echo -e "${GREEN}✅ Backup criado em: ${CYAN}$backup_path${NC}"
}

# Função para atualizar changelog
update_changelog() {
    local old_version="$1"
    local new_version="$2"
    local version_type="$3"
    
    echo -e "${BLUE}📝 Atualizando CHANGELOG...${NC}"
    
    # Criar changelog se não existir
    if [[ ! -f "$CHANGELOG_FILE" ]]; then
        cat > "$CHANGELOG_FILE" << EOF
# 📋 **Changelog - Sistema Lancei Essa**

Todas as mudanças notáveis na documentação serão registradas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

EOF
    fi
    
    # Detectar mudanças automaticamente
    local changes=()
    
    # Verificar arquivos modificados/adicionados
    if git rev-parse --git-dir > /dev/null 2>&1; then
        local modified_files=$(git diff --cached --name-only -- "$DOCS_DIR" | head -10)
        
        while IFS= read -r file; do
            if [[ -n "$file" ]]; then
                local filename=$(basename "$file")
                changes+=("- Atualizado: \`$filename\`")
            fi
        done <<< "$modified_files"
        
        COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "")
    fi
    
    # Adicionar entrada de versão específica baseada no tipo
    local version_changes=""
    case "$version_type" in
        "major")
            version_changes="### 🚀 **Mudanças Principais**
$(printf '%s\n' "${changes[@]}")

### ✨ **Novas Funcionalidades**
- Reestruturação significativa da documentação
- Novos templates e padrões implementados
- Melhoria na experiência do usuário"
            ;;
        "minor")
            version_changes="### ✨ **Novas Funcionalidades**
$(printf '%s\n' "${changes[@]}")

### 🔄 **Melhorias**
- Documentação expandida e enriquecida
- Novos guias e tutoriais adicionados"
            ;;
        "patch")
            version_changes="### 🔧 **Correções e Melhorias**
$(printf '%s\n' "${changes[@]}")

### 📝 **Documentação**
- Correções de formatação e links
- Melhorias na clareza e precisão"
            ;;
    esac
    
    # Inserir nova entrada no início do changelog
    local temp_changelog=$(mktemp)
    {
        head -n 7 "$CHANGELOG_FILE"  # Manter cabeçalho
        echo ""
        echo "## [${new_version}] - $(date '+%Y-%m-%d')"
        echo ""
        echo "$version_changes"
        if [[ -n "$COMMIT_HASH" ]]; then
            echo ""
            echo "**Commit:** \`$COMMIT_HASH\`"
        fi
        echo ""
        echo "---"
        echo ""
        tail -n +8 "$CHANGELOG_FILE"  # Resto do changelog
    } > "$temp_changelog"
    
    mv "$temp_changelog" "$CHANGELOG_FILE"
    
    echo -e "${GREEN}✅ CHANGELOG atualizado com versão $new_version${NC}"
}

# Função para atualizar versões em arquivos
update_version_in_files() {
    local old_version="$1"
    local new_version="$2"
    
    echo -e "${BLUE}🔄 Atualizando versões nos arquivos...${NC}"
    
    # Lista de arquivos que podem conter versões
    local files_to_update=(
        "$DOCS_DIR/README.md"
        "README.md"
        "$DOCS_DIR/project-management/status.md"
    )
    
    local updated_count=0
    
    for file in "${files_to_update[@]}"; do
        if [[ -f "$file" ]]; then
            # Atualizar referências de versão
            if grep -q "$old_version" "$file"; then
                sed -i.bak "s/$old_version/$new_version/g" "$file"
                rm -f "$file.bak"
                echo -e "${GREEN}✅ Atualizado: ${CYAN}$file${NC}"
                ((updated_count++))
            fi
            
            # Atualizar data de atualização
            if grep -qE '\*\*(Data|Última Atualização|Last Updated)\*\*:' "$file"; then
                sed -i.bak -E "s/(\*\*(Data|Última Atualização|Last Updated)\*\*:)[^*]*/\1 $(date '+%d\/%m\/%Y')/g" "$file"
                rm -f "$file.bak"
            fi
        fi
    done
    
    echo -e "${GREEN}✅ ${updated_count} arquivos atualizados com nova versão${NC}"
}

# Função para validar versão
validate_version() {
    local version="$1"
    
    if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${RED}❌ Formato de versão inválido: $version${NC}"
        echo -e "${YELLOW}   Use formato: major.minor.patch (ex: 1.2.3)${NC}"
        exit 1
    fi
}

# Função para gerar relatório de versionamento
generate_version_report() {
    local old_version="$1"
    local new_version="$2"
    local version_type="$3"
    
    local report_file="$DOCS_DIR/project-management/version-report-$(date +%Y%m%d-%H%M%S).md"
    
    echo -e "${BLUE}📊 Gerando relatório de versionamento...${NC}"
    
    cat > "$report_file" << EOF
# 📋 **Relatório de Versionamento - $new_version**

**Data:** $(date '+%d/%m/%Y %H:%M:%S')  
**Tipo:** $version_type  
**Versão Anterior:** $old_version  
**Nova Versão:** $new_version  
**Commit:** $COMMIT_HASH  

---

## 📊 **Estatísticas da Versão**

### 📁 **Arquivos da Documentação**
- **Total de arquivos .md:** $(find "$DOCS_DIR" -name "*.md" | wc -l)
- **Tamanho total:** $(du -sh "$DOCS_DIR" | cut -f1)
- **Última modificação:** $(date '+%d/%m/%Y %H:%M:%S')

### 🔄 **Mudanças Detectadas**
$(if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "- **Arquivos modificados:** $(git diff --cached --name-only -- "$DOCS_DIR" | wc -l)"
    echo "- **Linhas adicionadas:** $(git diff --cached --numstat -- "$DOCS_DIR" | awk '{sum += $1} END {print sum+0}')"
    echo "- **Linhas removidas:** $(git diff --cached --numstat -- "$DOCS_DIR" | awk '{sum += $2} END {print sum+0}')"
else
    echo "- Git não disponível para estatísticas detalhadas"
fi)

---

## 📂 **Estrutura Atual**

$(tree "$DOCS_DIR" -I "archived|*.tmp" -L 2 2>/dev/null || find "$DOCS_DIR" -type d -not -path "*/archived/*" | head -20)

---

## 🎯 **Qualidade da Documentação**

$(if [[ -f "$DOCS_DIR/project-management/docs-metrics.json" ]]; then
    local quality_score=$(jq -r '.validation.qualityScore' "$DOCS_DIR/project-management/docs-metrics.json" 2>/dev/null || echo "N/A")
    echo "- **Score de Qualidade:** $quality_score%"
    echo "- **Status:** $(jq -r '.status' "$DOCS_DIR/project-management/docs-metrics.json" 2>/dev/null || echo "N/A")"
else
    echo "- **Score de Qualidade:** Execute \`scripts/docs/validate_docs.sh\` para obter métricas"
fi)

---

## 🔗 **Links Importantes**

- [📋 Changelog Completo]($CHANGELOG_FILE)
- [📊 Status do Projeto](project-management/status.md)
- [🏠 Documentação Principal](README.md)

---

*Relatório gerado automaticamente pelo Sistema de Versionamento*
EOF

    echo -e "${GREEN}✅ Relatório salvo em: ${CYAN}$report_file${NC}"
}

# Função principal
main() {
    local requested_type="${1:-auto}"
    
    echo -e "${BLUE}🚀 Iniciando versionamento automático...${NC}"
    echo ""
    
    # Verificar dependências
    check_dependencies
    echo ""
    
    # Obter versão atual
    get_current_version
    echo ""
    
    # Detectar ou usar tipo especificado
    if [[ "$requested_type" == "auto" ]]; then
        detect_change_type
    else
        VERSION_TYPE="$requested_type"
        echo -e "${CYAN}🎯 Tipo especificado: ${YELLOW}$VERSION_TYPE${NC}"
    fi
    echo ""
    
    # Calcular nova versão
    local new_version=$(calculate_next_version "$PROJECT_VERSION" "$VERSION_TYPE")
    validate_version "$new_version"
    
    echo -e "${GREEN}📈 Versionamento: ${YELLOW}$PROJECT_VERSION${GREEN} → ${YELLOW}$new_version${GREEN} ($VERSION_TYPE)${NC}"
    echo ""
    
    # Confirmar com usuário
    read -p "🔄 Continuar com o versionamento? [Y/n]: " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        echo -e "${YELLOW}❌ Versionamento cancelado pelo usuário${NC}"
        exit 0
    fi
    echo ""
    
    # Criar backup
    create_version_backup "$PROJECT_VERSION"
    echo ""
    
    # Atualizar arquivos
    update_version_in_files "$PROJECT_VERSION" "$new_version"
    echo ""
    
    # Atualizar changelog
    update_changelog "$PROJECT_VERSION" "$new_version" "$VERSION_TYPE"
    echo ""
    
    # Atualizar version file
    echo "$new_version" > "$VERSION_FILE"
    echo -e "${GREEN}✅ Arquivo VERSION atualizado para: ${YELLOW}$new_version${NC}"
    echo ""
    
    # Gerar relatório
    generate_version_report "$PROJECT_VERSION" "$new_version" "$VERSION_TYPE"
    echo ""
    
    # Resultado final
    echo -e "${GREEN}🎉 VERSIONAMENTO CONCLUÍDO!${NC}"
    echo -e "${CYAN}   Nova versão: ${YELLOW}$new_version${NC}"
    echo -e "${CYAN}   Tipo: ${YELLOW}$VERSION_TYPE${NC}"
    echo -e "${CYAN}   Backup em: ${YELLOW}$BACKUP_DIR/v$PROJECT_VERSION${NC}"
    echo ""
    
    # Sugerir próximos passos
    echo -e "${BLUE}📋 Próximos passos sugeridos:${NC}"
    echo -e "   1. Executar: ${YELLOW}scripts/docs/validate_docs.sh${NC}"
    echo -e "   2. Revisar: ${YELLOW}$CHANGELOG_FILE${NC}"
    echo -e "   3. Commit: ${YELLOW}git add . && git commit -m \"docs: version $new_version\"${NC}"
}

# Ajuda
show_help() {
    cat << EOF
📋 **Sistema de Versionamento Automático da Documentação**

USO:
    $0 [TIPO]

TIPOS:
    auto     Detectar automaticamente o tipo de versão (padrão)
    major    Incrementar versão principal (mudanças incompatíveis)
    minor    Incrementar versão secundária (novas funcionalidades)
    patch    Incrementar versão de correção (correções e melhorias)

EXEMPLOS:
    $0              # Detecção automática
    $0 major        # Forçar versão major
    $0 minor        # Forçar versão minor  
    $0 patch        # Forçar versão patch

FUNCIONALIDADES:
    🔍 Detecção automática do tipo de mudança
    💾 Backup automático da versão anterior
    📝 Atualização automática do CHANGELOG
    🔄 Atualização de versões nos arquivos
    📊 Relatório detalhado de versionamento
    ✅ Validação de formato de versão

ARQUIVOS GERENCIADOS:
    - docs/VERSION
    - docs/CHANGELOG.md
    - docs/README.md
    - docs/project-management/status.md
    - Backups em: docs/archived/versions/

EOF
}

# Processamento de argumentos
case "${1:-auto}" in
    -h|--help)
        show_help
        ;;
    auto|major|minor|patch)
        main "$1"
        ;;
    *)
        echo -e "${RED}❌ Argumento inválido: $1${NC}"
        echo -e "${YELLOW}   Use -h para ajuda${NC}"
        exit 1
        ;;
esac 