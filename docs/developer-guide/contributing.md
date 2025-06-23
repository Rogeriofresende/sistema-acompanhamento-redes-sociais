# 🤝 **Guia de Contribuição - Sistema Lancei Essa**

**📅 Data:** 29/01/2025  
**👨‍💻 Autor:** Sistema Lancei Essa  
**🎯 Audiência:** Desenvolvedores  
**⏱️ Tempo de leitura:** 15 minutos

---

## 🎯 **Bem-vindo à Contribuição!**

Obrigado pelo interesse em contribuir com o Sistema Lancei Essa! Este guia vai te ajudar a fazer contribuições efetivas e seguir nossas práticas de desenvolvimento.

### 🌟 **Por que Contribuir?**
- ✅ Ajudar a construir uma ferramenta incrível para podcasters
- ✅ Aprender tecnologias modernas (React, Node.js, Prisma)
- ✅ Fazer parte de uma comunidade ativa de desenvolvedores
- ✅ Contribuir para projeto open source

---

## 🚀 **Começando Rapidamente**

### 📋 **Pré-requisitos**
- **Node.js** 18+ instalado
- **npm** ou **yarn** como package manager
- **Git** configurado localmente
- **Docker** (opcional, para desenvolvimento)
- **Conta GitHub** ativa

### ⚡ **Setup em 5 Minutos**
```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU_USUARIO/sistema-lancei-essa.git
cd sistema-lancei-essa

# 3. Instale dependências
npm install

# 4. Configure environment
cp .env.example .env
# Edite .env com suas configurações

# 5. Execute em modo desenvolvimento
npm run dev

# 6. Acesse http://localhost:5173
```

### 🔧 **Configuração do Ambiente**
```bash
# Backend (Terminal 1)
cd backend
npm install
npm run dev

# Frontend (Terminal 2) 
cd apps/frontend
npm install
npm run dev
```

---

## 📝 **Tipos de Contribuição**

### 🐛 **1. Correção de Bugs**
- **Prioridade:** Alta
- **Dificulidade:** Iniciante a Intermediário
- **Como:** Veja issues com label `bug`

### ⭐ **2. Novas Funcionalidades**
- **Prioridade:** Média
- **Dificulidade:** Intermediário a Avançado
- **Como:** Discuta primeiro em uma issue

### 📚 **3. Melhorias na Documentação**
- **Prioridade:** Alta
- **Dificulidade:** Iniciante
- **Como:** Corrija typos, adicione exemplos, melhore clareza

### 🎨 **4. Melhorias na UI/UX**
- **Prioridade:** Média
- **Dificulidade:** Intermediário
- **Como:** Propostas visuais em issues

### ⚡ **5. Otimizações de Performance**
- **Prioridade:** Baixa
- **Dificulidade:** Avançado
- **Como:** Identifique gargalos e proponha soluções

---

## 🔄 **Workflow de Contribuição**

### 📋 **Processo Completo**

#### **1. Encontre uma Issue**
```bash
# Veja issues abertas
https://github.com/REPO/issues

# Filtros úteis:
- Label: "good first issue" (para iniciantes)
- Label: "help wanted" (precisamos de ajuda)
- Label: "bug" (correções)
- Label: "enhancement" (melhorias)
```

#### **2. Comente na Issue**
```
Olá! Gostaria de trabalhar nesta issue.
Minha abordagem seria:
1. [sua estratégia]
2. [próximos passos]

Tempo estimado: X horas/dias
```

#### **3. Crie uma Branch**
```bash
# Para bugs
git checkout -b fix/nome-do-bug

# Para features
git checkout -b feature/nome-da-feature

# Para docs
git checkout -b docs/melhoria-na-doc
```

#### **4. Faça as Alterações**
- Siga nossos [Padrões de Código](coding-standards.md)
- Escreva testes para novas funcionalidades
- Atualize documentação se necessário
- Teste localmente antes de commitar

#### **5. Commit com Conventional Commits**
```bash
# Formato:
# tipo(escopo): descrição

# Exemplos:
git commit -m "feat(auth): add Google OAuth integration"
git commit -m "fix(youtube): resolve token refresh issue"
git commit -m "docs(api): update endpoints documentation"
git commit -m "style(ui): improve button hover effects"
```

#### **6. Push e Abra Pull Request**
```bash
git push origin sua-branch

# No GitHub:
# 1. Abra Pull Request
# 2. Preencha template completamente
# 3. Marque reviewers apropriados
# 4. Aguarde feedback
```

---

## ✅ **Template de Pull Request**

### 📋 **Checklist Obrigatório**
```markdown
## Descrição
[Descreva brevemente o que foi alterado]

## Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ⭐ Nova funcionalidade
- [ ] 💥 Breaking change
- [ ] 📚 Documentação
- [ ] 🎨 UI/UX

## Como Testar
1. [Passo 1]
2. [Passo 2]
3. [Resultado esperado]

## Screenshots (se aplicável)
[Cole screenshots ou GIFs aqui]

## Checklist
- [ ] Código segue nossos padrões
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Sem breaking changes desnecessários
- [ ] Self-review completo

## Issues Relacionadas
Closes #123
Related to #456
```

---

## 🧪 **Testes e Qualidade**

### 🔧 **Executando Testes**
```bash
# Todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

### 📊 **Cobertura de Testes**
- **Mínimo:** 80% para novas funcionalidades
- **Ideal:** 90%+ cobertura geral
- **Obrigatório:** Testes para utils críticos

### 🔍 **Linting e Formatação**
```bash
# ESLint
npm run lint
npm run lint:fix

# Prettier
npm run format

# TypeScript
npm run type-check

# Tudo junto
npm run check
```

---

## 📐 **Padrões de Código**

### 🎯 **Princípios Fundamentais**
1. **Código Limpo** - Legível por humanos
2. **SOLID** - Princípios de design
3. **DRY** - Don't Repeat Yourself
4. **KISS** - Keep It Simple, Stupid
5. **YAGNI** - You Ain't Gonna Need It

### 📝 **Convenções de Nomenclatura**

#### **Arquivos e Pastas:**
```bash
# React Components (PascalCase)
UserProfile.tsx
GuestCard.tsx

# Hooks (camelCase com use prefix)
useAuth.ts
useYouTubeData.ts

# Utils/Services (camelCase)
apiClient.ts
youtubeService.ts

# Types/Interfaces (PascalCase)
types.ts
interfaces.ts

# Pastas (kebab-case)
components/
api-client/
youtube-integration/
```

#### **Variáveis e Funções:**
```typescript
// camelCase
const userName = 'João';
const isUserLoggedIn = true;

// Constantes (SCREAMING_SNAKE_CASE)
const API_BASE_URL = 'https://api.com';
const MAX_RETRY_ATTEMPTS = 3;

// Funções (camelCase)
function getUserData() {}
const handleUserLogin = () => {};

// Booleans (is/has/can prefix)
const isLoading = false;
const hasPermission = true;
const canEdit = false;
```

### 🏗️ **Estrutura de Componentes React**
```typescript
// UserProfile.tsx
import React from 'react';
import { User } from '../types';

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
}

export function UserProfile({ user, onEdit }: UserProfileProps) {
  // 1. Hooks
  const [isEditing, setIsEditing] = useState(false);
  
  // 2. Derived state
  const displayName = user.name || 'Usuário Anônimo';
  
  // 3. Event handlers
  const handleEditClick = () => {
    setIsEditing(true);
    onEdit?.();
  };
  
  // 4. Effects
  useEffect(() => {
    // Side effects here
  }, []);
  
  // 5. Early returns
  if (!user) {
    return <div>Carregando...</div>;
  }
  
  // 6. Main render
  return (
    <div className="user-profile">
      <h2>{displayName}</h2>
      <button onClick={handleEditClick}>
        Editar
      </button>
    </div>
  );
}
```

---

## 🔒 **Segurança e Best Practices**

### 🛡️ **Segurança**
- **Nunca** commite API keys ou secrets
- Use variáveis de ambiente para dados sensíveis
- Valide todas as entradas do usuário
- Sanitize dados antes de armazenar
- Use HTTPS em todos os endpoints

### ⚡ **Performance**
```typescript
// ✅ Bom: Use React.memo para components pesados
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* render complexo */}</div>;
});

// ✅ Bom: Use useMemo para cálculos pesados  
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Bom: Use useCallback para funções passadas como props
const handleClick = useCallback(() => {
  // handler logic
}, [dependency]);
```

### 🎯 **Acessibilidade**
```tsx
// ✅ Bom: ARIA labels
<button aria-label="Fechar modal">×</button>

// ✅ Bom: Semantic HTML
<main>
  <article>
    <header>
      <h1>Título do Artigo</h1>
    </header>
  </article>
</main>

// ✅ Bom: Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Clique ou pressione Enter
</div>
```

---

## 📚 **Documentação de Código**

### 📝 **JSDoc para Funções**
```typescript
/**
 * Calcula a duração média dos vídeos do canal
 * @param videos - Array de vídeos do YouTube
 * @param format - Formato de retorno ('seconds' | 'minutes' | 'hours')
 * @returns Duração média no formato especificado
 * @example
 * ```typescript
 * const videos = getYouTubeVideos();
 * const avgDuration = calculateAverageDuration(videos, 'minutes');
 * console.log(`Duração média: ${avgDuration} minutos`);
 * ```
 */
function calculateAverageDuration(
  videos: YouTubeVideo[],
  format: 'seconds' | 'minutes' | 'hours' = 'minutes'
): number {
  // Implementation
}
```

### 🏷️ **Comentários Úteis**
```typescript
// ✅ Bom: Explica o "porquê", não o "o quê"
// Precisamos aguardar 500ms porque a API do YouTube 
// tem rate limiting e pode retornar erro 429
await new Promise(resolve => setTimeout(resolve, 500));

// ✅ Bom: TODO comments com contexto
// TODO: Implementar cache redis para melhorar performance
// Context: Consulta de analytics está lenta (issue #123)
const analyticsData = await fetchYouTubeAnalytics();

// ❌ Ruim: Comentário óbvio
// Incrementa o contador
counter++;
```

---

## 🚨 **Debugging e Troubleshooting**

### 🔍 **Debugging Frontend**
```typescript
// Use console.group para logs organizados
console.group('🎯 User Authentication');
console.log('User ID:', userId);
console.log('Token:', token?.substring(0, 10) + '...');
console.log('Permissions:', permissions);
console.groupEnd();

// Use debugger statements estratégicamente
function handleComplexLogic(data: unknown) {
  if (process.env.NODE_ENV === 'development') {
    debugger; // Para apenas em development
  }
  // Logic here
}
```

### 🛠️ **Debugging Backend**
```javascript
// Use structured logging
const logger = require('./logger');

logger.info('Processing YouTube callback', {
  userId: user.id,
  channelId: channel.id,
  timestamp: new Date().toISOString()
});

// Error tracking com contexto
try {
  await processYouTubeData();
} catch (error) {
  logger.error('YouTube processing failed', {
    error: error.message,
    stack: error.stack,
    userId: user.id,
    context: 'oauth_callback'
  });
  throw error;
}
```

---

## 🎉 **Reconhecimento e Gamificação**

### 🏆 **Níveis de Contribuidor**
- **🌱 Novato** - Primeira contribuição aceita
- **⭐ Colaborador** - 5+ contribuições aceitas  
- **🚀 Especialista** - 15+ contribuições + feature importante
- **👑 Mantenedor** - Acesso de commit + responsabilidades

### 🎖️ **Badges de Especialização**
- **🐛 Bug Hunter** - 10+ bugs corrigidos
- **📚 Documentador** - Melhorias significativas na docs
- **🎨 Designer** - Melhorias na UI/UX
- **⚡ Performance Ninja** - Otimizações importantes
- **🔒 Security Guardian** - Correções de segurança

### 🎁 **Benefícios**
- **Nome** no CONTRIBUTORS.md
- **Menção** nos release notes
- **Acesso antecipado** a features
- **Participação** em decisions importantes

---

## 📞 **Suporte e Comunidade**

### 💬 **Canais de Comunicação**
- **GitHub Issues** - Para bugs e features
- **GitHub Discussions** - Para dúvidas gerais
- **Discord** - Chat em tempo real (#dev-channel)
- **Email** - dev@sistemaLanceiEssa.com

### ❓ **FAQ para Contribuidores**

**Q: Como encontro issues para iniciantes?**
A: Procure por labels "good first issue" e "help wanted"

**Q: Posso trabalhar em features grandes?**
A: Sim! Mas discuta primeiro em uma issue para alinhar expectativas

**Q: Quanto tempo demora para review?**
A: Normalmente 2-5 dias úteis, dependendo da complexidade

**Q: Posso contribuir apenas com documentação?**
A: Claro! Docs são super importantes e sempre precisam melhorar

---

## 🎯 **Próximos Passos**

### ✅ **Para Começar Hoje**
1. **Fork** o repositório
2. **Clone** localmente  
3. **Configure** ambiente de desenvolvimento
4. **Encontre** uma issue "good first issue"
5. **Comente** na issue que vai trabalhar nela
6. **Faça** sua primeira contribuição!

### 📚 **Leitura Recomendada**
- [Padrões de Código](coding-standards.md) - Nossos padrões detalhados
- [Arquitetura](architecture/overview.md) - Como o sistema funciona
- [API Documentation](api/endpoints.md) - Endpoints disponíveis

---

<div align="center">

### 🎉 **Bem-vindo à Equipe!**
**Sua contribuição faz a diferença na vida de podcasters ao redor do mundo!**

**🚀 Pronto para começar?** Encontre sua primeira issue e mãos à obra!

</div>

---

**📝 Última atualização:** 29/01/2025  
**🔄 Próxima revisão:** 29/02/2025  
**📧 Dúvidas:** dev@sistemaLanceiEssa.com 