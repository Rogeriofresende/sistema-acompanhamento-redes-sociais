# 🚨 Troubleshooting - Deploy Vercel

## 🎯 **GUIA RÁPIDO DE PROBLEMAS COMUNS**

### **🔍 ERRO: "Missing script: build"**

**Sintomas:**
```bash
npm error Missing script: "build"
```

**Diagnóstico:**
- Vercel não encontra script de build na raiz
- Projeto é monorepo mas sem configuração

**Solução:**
1. Criar `vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd apps/frontend && npm run build",
  "installCommand": "cd apps/frontend && npm install",
  "outputDirectory": "apps/frontend/dist",
  "framework": "vite"
}
```

2. Adicionar script no `package.json` raiz:
```json
{
  "scripts": {
    "build": "cd apps/frontend && npm run build"
  }
}
```

---

### **🔍 ERRO: "vite: command not found"**

**Sintomas:**
```bash
sh: line 1: vite: command not found
Error: Command "cd apps/frontend && npm run build" exited with 127
```

**Diagnóstico:**
- npm install está rodando no diretório errado
- Dependências não instaladas onde o build roda

**Solução:**
Atualizar `vercel.json`:
```json
{
  "installCommand": "cd apps/frontend && npm install"
}
```

---

### **🔍 ERRO: "Could not resolve '@/'"**

**Sintomas:**
```bash
Rollup failed to resolve import "@/components/ui/button"
```

**Diagnóstico:**
- Path mapping não configurado
- Alias @ não funciona

**Solução:**
1. Configurar `vite.config.ts`:
```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

2. Configurar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🔧 **COMANDOS DE DEBUG ÚTEIS**

### **Testar build local:**
```bash
cd apps/frontend
npm install
npm run build
```

### **Verificar dependências:**
```bash
grep -r "from ['\"]" src/ | grep -v "@/" | sort -u
```

### **Verificar configuração:**
```bash
cat vercel.json
cat apps/frontend/vite.config.ts
```

---

## 📋 **CHECKLIST DE VERIFICAÇÃO**

### **Antes do Deploy:**
- [ ] Build local funciona: `npm run build`
- [ ] Todas as dependências instaladas
- [ ] Imports corretos (caminhos e tipos)
- [ ] Path mapping configurado se usar @/
- [ ] vercel.json criado para monorepo

---

**🔗 Links Úteis:**
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repo: https://github.com/Rogeriofresende/sistema-acompanhamento-redes-sociais
