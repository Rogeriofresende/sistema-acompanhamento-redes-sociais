# Plano de Configuração Dinâmica do Logger no Backend (Node.js)

> **Este documento detalha como configurar dinamicamente o nível de log do backend usando variáveis de ambiente, seguindo o padrão de documentação do projeto. Última atualização: 25/05/2025**

---

## 1. Objetivo
- Permitir que o nível de log do backend seja facilmente ajustado entre ambientes (desenvolvimento, produção, debug) sem necessidade de alterar o código.
- Facilitar o diagnóstico, auditoria e monitoramento do sistema, tornando o logger mais flexível e aderente às melhores práticas.
- **(NOVO)** Garantir enforcement e automação do padrão de logging estruturado em todo o backend, evitando uso de `console.log` e promovendo cobertura de logging nos fluxos críticos.

---

## 2. Contexto
- O backend utiliza Winston e winston-daily-rotate-file para logging estruturado.
- O logger já está centralizado, com rotação de arquivos, logs separados por nível, e configuração dinâmica via `LOG_LEVEL`.
- O logger é utilizado nos controllers principais.
- **(NOVO)** O enforcement automático de logging estruturado já está implementado com ESLint bloqueando `console.log`/`console.error`.
- **(NOVO)** ESLint agora utiliza o formato "flat config". Ignorar arquivos/diretórios e definir ambiente deve ser feito em `eslint.config.mjs`.
- **(NOVO)** O script de lint já está disponível no `package.json` e pode ser executado localmente ou integrado ao CI.
- **(NOVO)** O lint é executado automaticamente no GitHub Actions em cada push/pull request, bloqueando merges com violações.
- **(NOVO)** O middleware HTTP logging (`morgan`) está integrado ao logger centralizado, garantindo logs de requisições HTTP estruturados e auditáveis.
- **(NOVO)** O script `check-console.sh` bloqueia qualquer uso de `console.log`/`console.error` no backend, rodando localmente e no CI.

---

## 3. Instruções de Uso

### 3.1. Configuração do logger
No arquivo `logger.js`, defina o nível de log assim:
```js
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  // ...restante da configuração
});

// Stream para integração com morgan (HTTP logging)
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
```

### 3.2. Definindo variáveis de ambiente
No terminal, antes de iniciar o backend:
```sh
export NODE_ENV=development
export LOG_LEVEL=debug
npm start
```
Ou, em produção:
```sh
export NODE_ENV=production
export LOG_LEVEL=warn
npm start
```

### 3.3. Exemplo de uso no código
```js
logger.debug('Mensagem detalhada para debug');
logger.info('Informação relevante');
logger.warn('Aviso importante');
logger.error('Erro crítico');
```

### 3.4. Logging HTTP estruturado com morgan
O middleware `morgan` está integrado ao logger centralizado para registrar todas as requisições HTTP de forma estruturada:
```js
const morgan = require('morgan');
const logger = require('../logger');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: logger.stream }));
```
**Benefícios:**
- Todos os acessos HTTP ficam registrados nos arquivos de log estruturado.
- Facilita auditoria, troubleshooting e análise de uso.
- Mantém o padrão único de logging para todo o backend.

### 3.5. Rodando o lint localmente
No diretório `backend`, execute:
```sh
npm run lint
```
Isso irá rodar o ESLint em todo o backend, bloqueando qualquer uso indevido de `console.log`/`console.error` e garantindo o enforcement do padrão de logging estruturado.

### 3.6. Lint e verificação de console automatizados no CI (GitHub Actions)
O lint e o script de verificação de console são executados automaticamente em cada push e pull request via workflow do GitHub Actions. Exemplo do arquivo `.github/workflows/lint.yml`:
```yaml
name: Lint Backend

on:
  push:
    paths:
      - 'backend/**'
  pull_request:
    paths:
      - 'backend/**'

jobs:
  lint:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Use Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - name: Install dependencies
        run: npm install
      - name: Run ESLint
        run: npm run lint
      - name: Verificar uso de console.log/console.error
        run: npm run check:console
```
**Importante:** Se houver qualquer violação de lint ou uso de console.log/console.error, o CI irá falhar e bloquear o merge até que o padrão de logging seja respeitado.

---

## 4. Checklist Unificado de Logging Estruturado

### 4.1. Configuração Inicial
- [x] Instalar e configurar Winston e winston-daily-rotate-file no backend.
- [x] Criar módulo de logger centralizado (`logger.js`).
- [x] Usar caminhos absolutos para os arquivos de log (`path.join(__dirname, 'logs', ...)`).
- [x] Definir o nível de log via variável de ambiente (`process.env.LOG_LEVEL || 'info'`).
- [x] Garantir que a pasta `logs/` existe e tem permissão de escrita.
- [x] Utilizar o logger centralizado nos controllers principais.
- [x] Documentar exemplos de uso e boas práticas para o time.

### 4.2. Validação e Testes
- [x] Testar logs de todos os níveis (`debug`, `info`, `warn`, `error`).
- [x] Validar que o backend pode ser reiniciado com diferentes níveis de log sem alterar o código.
- [x] Validar que o comportamento do logger muda conforme o ambiente (`NODE_ENV`).
- [x] Garantir que logs são registrados em arquivo e console conforme esperado.
- [x] Testar o sistema em diferentes cenários e níveis de log.

### 4.3. Enforcement e Automação
- [x] **Adicionar ESLint para bloquear `console.log`/`console.error` no backend.**
  - Regra configurada em `backend/eslint.config.mjs`.
  - Script de lint disponível no `package.json`:
    ```json
    "scripts": {
      "lint": "eslint . --ext .js --max-warnings=0"
    }
    ```
  - Comando para rodar lint:
    ```sh
    npm run lint
    ```
- [x] **Ajustar ambiente do ESLint para Node.js/Jest e ignorar arquivos/diretórios no próprio config.**
- [x] **Adicionar workflow de CI para rodar lint automaticamente em cada push/pull request.**
- [x] **Integrar o middleware `morgan` ao Express, redirecionando logs HTTP para o logger centralizado.**
- [x] **Adicionar testes automatizados (Jest) que mockam o logger e garantem que ele é chamado nos fluxos críticos.**
- [x] **Criar script de verificação (grep/rg) para detectar uso indevido de `console.log`/`console.error` e rodar no CI.**
- [ ] **Documentar exemplos de configuração de CI e lint no repositório.**
- [ ] **(Opcional) Integrar plugin de audit log para rastreabilidade de ações sensíveis.**

### 4.4. Padronização e Revisão de Código
- [-] Utilizar o logger centralizado em todos os controllers, middlewares, rotas e tratamento de erros. *(Parcialmente concluído: não há automação para garantir 100% de cobertura)*
- [-] Nunca usar `console.log` ou `console.error` diretamente em produção. *(Parcialmente concluído: não há automação para garantir 100% de cobertura)*
- [ ] Incluir revisão de uso do logger em code reviews (checklist de PRs).
- [x] Compartilhar este documento e exemplos de uso com o time.

### 4.5. Boas Práticas e Segurança
- [x] Usar `debug` apenas em desenvolvimento ou troubleshooting.
- [x] Em produção, preferir `info`, `warn` ou `error` para evitar excesso de logs.
- [x] Nunca logar dados sensíveis em nenhum nível.
- [x] Documentar para o time como alterar o nível de log.

### 4.6. Manutenção e Evolução
- [ ] Monitorar o volume de logs em produção e ajustar o nível conforme necessário.
- [ ] Atualizar este documento conforme novas práticas ou necessidades do time.

> **Observação:** Todos os usos de `console.log`/`console.error` foram removidos do backend, exceto o caso justificado no listener de erro dos transports do logger (`logger.js`). Esse é o único local permitido, pois serve como fallback para falhas no próprio sistema de logging. O backend está 100% aderente ao padrão de logging estruturado e enforcement automatizado.

---

## 5. Roadmap de Automação e Enforcement

1. **Lint:**
   - [x] Adicionar e configurar ESLint para bloquear `console.log`/`console.error`.
   - [x] Ajustar ambiente do ESLint para Node.js/Jest e ignorar arquivos/diretórios no próprio config.
   - [x] Adicionar script de lint ao `package.json`.
   - [x] Adicionar workflow de CI para lint.
   - [x] Integrar morgan ao logger centralizado.
   - [x] Rodar lint localmente e no CI.
2. **CI:**
   - [x] Adicionar workflow de GitHub Actions (ou similar) para rodar lint e testes.
   - [x] Bloquear merge em caso de violação de lint ou testes de logging.
   - [x] Bloquear merge em caso de uso de `console.log`/`console.error`.
3. **Middleware HTTP:**
   - [x] Integrar `morgan` ao Express, redirecionando para o logger Winston.
4. **Testes Automatizados:**
   - [x] Mockar logger nos testes Jest e garantir cobertura de logging nos fluxos críticos.
5. **Script de Verificação:**
   - [x] Adicionar script de shell para buscar `console.log`/`console.error` e rodar no CI.
6. **Documentação:**
   - [ ] Exemplos de configuração de lint, CI e integração de logging no README.
7. **(Opcional) Audit Log:**
   - [ ] Avaliar integração de plugin de audit log para rastreabilidade avançada.

---

## 6. Exemplos Práticos

### 6.1. Comando para rodar lint
```sh
npm run lint
```

### 6.2. Comando para rodar verificação de console.log/console.error
```sh
npm run check:console
```

### 6.3. Exemplo de configuração de ambiente e ignores no ESLint (flat config)
```js
export default [
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
      ecmaVersion: 2022,
    },
    ignores: [
      'node_modules/',
      'generated/',
      'prisma/',
      'logs/',
    ],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'trace', 'debug', 'assert'] }],
    },
  },
];
```

> **Atenção:** O arquivo `.eslintignore` está depreciado no ESLint 9+. Use sempre a propriedade `ignores` no arquivo de configuração.

---

## 7. Referências
- [Winston Logging Levels](https://github.com/winstonjs/winston#logging-levels)
- [Node.js Logging Best Practices](https://www.digitalocean.com/community/tutorials/nodejs-logging-best-practices)
- [express-winston](https://github.com/bithavoc/express-winston)
- [morgan](https://github.com/expressjs/morgan)
- [Jest Mock Functions](https://jestjs.io/docs/mock-functions)

---

## 8. Testes Automatizados de Logging (Jest)

Para garantir que o logger está sendo chamado nos fluxos críticos, utilize testes automatizados com Jest mockando o logger. Exemplo para o controller de autenticação:

```js
const { googleSignIn } = require('./controllers/authController');
const logger = require('./logger');

jest.mock('./logger');

describe('googleSignIn', () => {
  let req, res;
  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });
  it('deve logar warn e retornar 400 se token não for fornecido', async () => {
    await googleSignIn(req, res);
    expect(logger.warn).toHaveBeenCalledWith('Token não fornecido na requisição de login Google.');
  });
});
```

- Use `jest.mock` para interceptar chamadas ao logger.
- Verifique se o logger foi chamado com a mensagem esperada.
- Adapte para outros controllers e fluxos críticos.

---

## 9. Script de Verificação de console.log/console.error

Para garantir enforcement total, utilize o script `check-console.sh` para bloquear qualquer uso de `console.log` ou `console.error` no backend (exceto em node_modules, logs, prisma, generated):

```sh
npm run check:console
```

- O script usa `ripgrep` (rg) se disponível, ou `grep` como fallback.
- O CI executa esse script automaticamente em cada push/pull request.
- Se algum uso for encontrado, o pipeline falha e o merge é bloqueado.
- Adapte o script conforme necessário para outros padrões proibidos.

**Exemplo de saída se houver violação:**
```
backend/src/server.js:5:console.log(`Backend rodando em http://localhost:${PORT}`);
```

> **Atenção:** Remova ou substitua todos os usos de `console.log`/`console.error` por chamadas ao logger centralizado.

---

## Audit Log: Implementação em Andamento

A implementação de audit log para rastreabilidade de ações sensíveis está sendo conduzida conforme plano detalhado no arquivo [`AUDIT_LOG_IMPLEMENTATION.md`](./AUDIT_LOG_IMPLEMENTATION.md).

- O objetivo é garantir compliance, segurança e rastreabilidade de operações críticas (ex: alteração de senha, exclusão de usuário, login/logout, integrações).
- O checklist, plano de execução e boas práticas estão descritos no arquivo dedicado.
- Assim que a implementação for concluída, esta documentação será atualizada com exemplos e instruções de uso para o time.

---

**Última atualização:** 25/05/2025 