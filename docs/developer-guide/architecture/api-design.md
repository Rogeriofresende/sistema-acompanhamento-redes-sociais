# 🔗 Design da API - Sistema Lancei Essa

**Data:** 29/01/2025  
**Responsável:** AI Assistant  
**Versão:** 1.0  
**Status:** ✅ **Documentado**  

---

## 🎯 **Visão Geral da API**

A API do **Sistema Lancei Essa** é uma **REST API** moderna construída com Express.js que oferece endpoints seguros para autenticação, gestão de usuários e integração com o YouTube. Todos os endpoints seguem padrões RESTful e retornam dados em formato JSON.

### 🏆 **Características da API**
- ✅ **REST API completa** com padrões consistentes
- ✅ **Autenticação JWT** em endpoints protegidos
- ✅ **Validação de entrada** em todas as requisições
- ✅ **Tratamento de erros** padronizado
- ✅ **Rate limiting** via YouTube API
- ✅ **Logs de auditoria** automáticos
- ✅ **Documentação OpenAPI** (Swagger) ready

---

## 🌐 **Configuração Base**

### **🔗 URLs e Portas**
- **Base URL Local:** `http://localhost:4000`
- **API Prefix:** `/api`
- **Documentação:** `http://localhost:4000/api-docs` (futuro)

### **📋 Headers Comuns**
```bash
Content-Type: application/json
Authorization: Bearer <jwt-token>  # Para rotas protegidas
```

### **🎨 Formato de Resposta Padrão**
```json
{
  "success": true,
  "data": {}, 
  "message": "Operação realizada com sucesso",
  "timestamp": "2025-01-29T14:30:00.000Z"
}
```

### **⚠️ Formato de Erro Padrão**
```json
{
  "success": false,
  "error": "Erro específico",
  "message": "Descrição detalhada do erro",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-29T14:30:00.000Z"
}
```

---

## 🔐 **Endpoints de Autenticação**

### **POST /api/auth/google**
Realiza login via Google OAuth.

#### **📋 Request**
```json
{
  "credential": "google-jwt-token",
  "clientId": "google-client-id"
}
```

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "joao@exemplo.com",
      "name": "João Silva",
      "googleId": "1234567890123456789"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh-token-here"
  },
  "message": "Login realizado com sucesso"
}
```

#### **❌ Erros Possíveis**
- `400` - Token Google inválido
- `401` - Falha na autenticação
- `500` - Erro interno do servidor

---

### **POST /api/auth/refresh**
Renova o token JWT usando refresh token.

#### **📋 Request**
```json
{
  "refreshToken": "refresh-token-here"
}
```

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "token": "new-jwt-token",
    "refreshToken": "new-refresh-token"
  },
  "message": "Token renovado com sucesso"
}
```

---

### **GET /api/auth/me**
🔒 **Protegido** - Busca informações do usuário autenticado.

#### **📋 Headers**
```bash
Authorization: Bearer <jwt-token>
```

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "joao@exemplo.com",
    "name": "João Silva",
    "role": "user",
    "profile": "basic",
    "createdAt": "2025-01-29T14:30:00.000Z"
  },
  "message": "Dados do usuário obtidos com sucesso"
}
```

---

### **POST /api/auth/logout**
🔒 **Protegido** - Realiza logout do usuário.

#### **✅ Response (200)**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

## 👤 **Endpoints de Usuário**

### **GET /api/users/profile**
🔒 **Protegido** - Busca perfil completo do usuário.

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "joao@exemplo.com",
      "name": "João Silva",
      "role": "user",
      "profile": "basic",
      "createdAt": "2025-01-29T14:30:00.000Z"
    },
    "youtubeConnected": true,
    "lastActivity": "2025-01-29T14:25:00.000Z"
  },
  "message": "Perfil obtido com sucesso"
}
```

---

### **PUT /api/users/profile**
🔒 **Protegido** - Atualiza perfil do usuário.

#### **📋 Request**
```json
{
  "name": "João Silva Santos",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "joao@exemplo.com",
      "name": "João Silva Santos",
      "updatedAt": "2025-01-29T14:35:00.000Z"
    }
  },
  "message": "Perfil atualizado com sucesso"
}
```

---

## 📺 **Endpoints do YouTube**

### **GET /api/youtube/auth**
🔒 **Protegido** - Inicia processo de autenticação OAuth do YouTube.

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "authUrl": "https://accounts.google.com/oauth/authorize?client_id=..."
  },
  "message": "URL de autenticação gerada"
}
```

---

### **GET /api/youtube/callback**
Callback OAuth do YouTube (redirecionamento automático).

#### **📋 Query Parameters**
- `code` - Código de autorização do Google
- `state` - ID do usuário para vinculação

#### **✅ Response**
Redirecionamento para `${FRONTEND_URL}/youtube/success` ou `/youtube/error`

---

### **GET /api/youtube/status**
🔒 **Protegido** - Verifica status da conexão com YouTube.

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "connected": true,
    "hasAnalytics": true,
    "channel": {
      "id": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      "title": "João Creator",
      "subscriberCount": 1500,
      "videoCount": 45
    }
  },
  "message": "YouTube conectado com Analytics"
}
```

#### **✅ Response - Não Conectado (200)**
```json
{
  "success": true,
  "data": {
    "connected": false,
    "hasAnalytics": false,
    "channel": null
  },
  "message": "YouTube não conectado"
}
```

---

### **DELETE /api/youtube/disconnect**
🔒 **Protegido** - Desconecta canal do YouTube.

#### **✅ Response (200)**
```json
{
  "success": true,
  "message": "Desconectado com sucesso"
}
```

---

### **GET /api/youtube/channel**
🔒 **Protegido** - Busca informações do canal.

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
    "title": "João Creator",
    "description": "Canal sobre tecnologia e programação",
    "thumbnailUrl": "https://yt3.ggpht.com/...",
    "subscriberCount": 1500,
    "viewCount": 45000,
    "videoCount": 45
  },
  "message": "Informações do canal obtidas"
}
```

---

## 📊 **Endpoints de Analytics**

### **GET /api/youtube/analytics/overview**
🔒 **Protegido** - Resumo geral de métricas.

#### **📋 Query Parameters**
- `period` - Período de análise (`7d`, `28d`, `90d`)

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "channel": {
      "title": "João Creator",
      "subscriberCount": 1500,
      "videoCount": 45
    },
    "engagement": {
      "totalViews": 12500,
      "totalWatchTime": 85000,
      "avgViewDuration": 245,
      "totalLikes": 850,
      "totalComments": 120,
      "subscribersGained": 25
    },
    "funnel": {
      "impressions": { "value": 16250, "label": "Impressões" },
      "clicks": { "value": 12500, "label": "Taxa de Clique", "percentage": 77 },
      "watchTime": { "value": 8750, "label": "Tempo de Visualização", "percentage": 70 },
      "engagement": { "value": 970, "label": "Engajamento", "percentage": 8 },
      "subscribers": { "value": 25, "label": "Novos Inscritos", "percentage": 2 }
    },
    "retention": {
      "retentionRate": 68,
      "watchTimeAverage": "4:32",
      "shareRate": 5.2
    }
  },
  "message": "Resumo de métricas obtido"
}
```

---

### **GET /api/youtube/analytics/engagement**
🔒 **Protegido** - Métricas detalhadas de engajamento.

#### **📋 Query Parameters**
- `startDate` - Data início (YYYY-MM-DD) **obrigatório**
- `endDate` - Data fim (YYYY-MM-DD) **obrigatório**

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalViews": 12500,
      "totalWatchTime": 85000,
      "avgViewDuration": 245,
      "totalLikes": 850,
      "totalComments": 120,
      "totalShares": 45,
      "subscribersGained": 25
    },
    "daily": [
      {
        "date": "2025-01-22",
        "views": 1800,
        "watchTime": 12000,
        "avgViewDuration": 240,
        "likes": 120,
        "comments": 18,
        "shares": 6,
        "subscribersGained": 4
      }
      // ... mais dias
    ]
  },
  "message": "Métricas de engajamento obtidas"
}
```

---

### **GET /api/youtube/analytics/funnel**
🔒 **Protegido** - Funil de engajamento detalhado.

#### **📋 Query Parameters**
- `period` - Período de análise (`7d`, `28d`, `90d`)

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "impressions": {
      "value": 16250,
      "label": "Impressões",
      "description": "Número de vezes que seu conteúdo foi exibido"
    },
    "clicks": {
      "value": 12500,
      "label": "Taxa de Clique",
      "description": "Pessoas que clicaram para assistir seus vídeos",
      "percentage": 77
    },
    "watchTime": {
      "value": 8750,
      "label": "Tempo de Visualização",
      "description": "Pessoas que assistiram pelo menos metade do vídeo",
      "percentage": 70
    },
    "engagement": {
      "value": 970,
      "label": "Engajamento", 
      "description": "Pessoas que interagiram (likes, comentários)",
      "percentage": 8
    },
    "subscribers": {
      "value": 25,
      "label": "Novos Inscritos",
      "description": "Pessoas que se inscreveram após assistir",
      "percentage": 2
    }
  },
  "message": "Funil de engajamento obtido"
}
```

---

### **GET /api/youtube/analytics/recurring-viewers**
🔒 **Protegido** - Análise de espectadores recorrentes.

#### **📋 Query Parameters**
- `period` - Período em dias (padrão: 7)

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "count": 3750,
    "description": "Espectadores que assistiram seu conteúdo múltiplas vezes nos últimos 7 dias",
    "trend": 12.5,
    "trendData": [
      { "date": "2025-01-22", "value": 540 },
      { "date": "2025-01-23", "value": 580 }
      // ... mais dias
    ]
  },
  "message": "Espectadores recorrentes analisados"
}
```

---

### **GET /api/youtube/analytics/retention**
🔒 **Protegido** - Métricas de retenção de audiência.

#### **📋 Query Parameters**
- `period` - Período de análise (`7d`, `28d`, `90d`)

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": {
    "retentionRate": 68,
    "watchTimeAverage": "4:32",
    "shareRate": 5.2
  },
  "message": "Métricas de retenção obtidas"
}
```

---

### **GET /api/youtube/analytics/detailed-metrics**
🔒 **Protegido** - Métricas detalhadas por data.

#### **📋 Query Parameters**
- `startDate` - Data início (YYYY-MM-DD) **obrigatório**
- `endDate` - Data fim (YYYY-MM-DD) **obrigatório**

#### **✅ Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "day": "2025-01-22",
      "views": 1800,
      "redViews": 1620,
      "estimatedMinutesWatched": 12000,
      "averageViewDuration": 240,
      "likes": 120,
      "comments": 18,
      "shares": 6,
      "subscribersGained": 4,
      "subscribersLost": 1
    }
    // ... mais dias
  ],
  "message": "Métricas detalhadas obtidas"
}
```

---

## 🔧 **Códigos de Status HTTP**

### **✅ Sucessos**
- `200` - OK - Operação realizada com sucesso
- `201` - Created - Recurso criado com sucesso
- `204` - No Content - Operação realizada sem retorno

### **⚠️ Erros do Cliente**
- `400` - Bad Request - Dados inválidos na requisição
- `401` - Unauthorized - Token inválido ou ausente
- `403` - Forbidden - Usuário sem permissão
- `404` - Not Found - Recurso não encontrado
- `409` - Conflict - Conflito com estado atual
- `422` - Unprocessable Entity - Dados válidos mas lógica inválida
- `429` - Too Many Requests - Rate limit excedido

### **❌ Erros do Servidor**
- `500` - Internal Server Error - Erro interno do servidor
- `502` - Bad Gateway - Erro na API externa (YouTube)
- `503` - Service Unavailable - Serviço temporariamente indisponível
- `504` - Gateway Timeout - Timeout na API externa

---

## 🛡️ **Autenticação e Segurança**

### **🔐 JWT Authentication**
```bash
# Header necessário para rotas protegidas
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **🔒 Estrutura do JWT Token**
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "joao@exemplo.com",
    "iat": 1706527800,
    "exp": 1706531400
  }
}
```

### **🛡️ Middleware de Segurança**
- ✅ **requireAuth** - Validação JWT em rotas protegidas
- ✅ **Input validation** - Sanitização de dados de entrada
- ✅ **Rate limiting** - Prevenção de spam via YouTube API
- ✅ **Audit logging** - Log de todas as ações importantes

---

## 📊 **Rate Limiting**

### **🚦 Limites da YouTube API**
- **YouTube Data API:** 10.000 units/dia
- **YouTube Analytics API:** 50.000 queries/dia  
- **OAuth Requests:** Ilimitado

### **⚡ Otimizações Implementadas**
- **Requests paralelos** para múltiplas métricas
- **Cache inteligente** de informações de canal
- **Batch processing** quando possível
- **Retry logic** com backoff exponencial

---

## 📋 **Exemplos de Uso**

### **🔐 Fluxo Completo de Autenticação**

```bash
# 1. Login via Google
curl -X POST http://localhost:4000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{
    "credential": "google-jwt-token",
    "clientId": "your-client-id"
  }'

# 2. Usar token retornado para acessar rotas protegidas
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# 3. Conectar YouTube
curl -X GET http://localhost:4000/api/youtube/auth \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# 4. Verificar status da conexão
curl -X GET http://localhost:4000/api/youtube/status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# 5. Buscar analytics
curl -X GET "http://localhost:4000/api/youtube/analytics/overview?period=7d" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### **📊 Buscar Métricas Específicas**

```bash
# Engajamento de um período específico
curl -X GET "http://localhost:4000/api/youtube/analytics/engagement?startDate=2025-01-01&endDate=2025-01-29" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# Funil de conversão dos últimos 28 dias
curl -X GET "http://localhost:4000/api/youtube/analytics/funnel?period=28d" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# Espectadores recorrentes dos últimos 14 dias
curl -X GET "http://localhost:4000/api/youtube/analytics/recurring-viewers?period=14" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## 🔄 **Versionamento da API**

### **📋 Estratégia de Versões**
- **Versão atual:** v1 (implícita na URL base)
- **Próximas versões:** `/api/v2/...` quando necessário
- **Backward compatibility** mantida por 12 meses
- **Deprecation notices** com 6 meses de antecedência

### **🗓️ Roadmap de Evolução**
- **v1.1** - Endpoints de notificações
- **v1.2** - Suporte a múltiplos canais
- **v2.0** - Integração com outras plataformas
- **v2.1** - Analytics com machine learning

---

## 🛠️ **Ferramentas de Desenvolvimento**

### **🔍 Testing da API**
```bash
# Usando curl
curl -X GET http://localhost:4000/api/auth/test

# Usando Postman
# Importar collection em: docs/api/postman-collection.json

# Usando Insomnia  
# Importar workspace em: docs/api/insomnia-workspace.json
```

### **📊 Monitoramento**
- **Health check:** `GET /api/health`
- **Metrics endpoint:** `GET /api/metrics` (futuro)
- **API docs:** `GET /api-docs` (futuro)

---

## 📚 **Documentação Relacionada**

- 🏗️ **[Visão Geral da Arquitetura](overview.md)** - Arquitetura completa do sistema
- 🗄️ **[Database Schema](database-schema.md)** - Modelo de dados detalhado
- 🚀 **[Quick Start](../quick-start.md)** - Setup rápido de desenvolvimento
- 🛡️ **[Configuração de Segurança](../../operations/monitoring/setup.md)** - Setup de monitoramento

---

<div align="center">

**🔗 API robusta, segura e bem documentada!**

**Próximo:** [Documentação de Deployment](../../operations/deployment/production-setup.md) | 
[🏠 Voltar ao Índice](../../README.md)

---

*API que escala junto com seu sucesso! 🚀*

</div> 