# 🌐 **API Endpoints - Documentação Completa**

**📅 Data:** 29/01/2025  
**👨‍💻 Autor:** Sistema Lancei Essa  
**🎯 Audiência:** Desenvolvedores  
**⏱️ Tempo de leitura:** 20 minutos

---

## 🎯 **Visão Geral**

Esta documentação apresenta todos os endpoints disponíveis na API do Sistema Lancei Essa, com exemplos práticos, códigos de resposta e estruturas de dados detalhadas.

### 🔗 **Base URL**
```
https://api.sistemaLanceiEssa.com/v1
```

### 📋 **Versionamento**
- **Atual:** v1
- **Suporte:** v1 é suportada indefinidamente
- **Deprecação:** 6 meses de aviso antes de remover versão

---

## 🔐 **AUTENTICAÇÃO**

### 🔑 **POST /auth/login**
Autentica usuário com email e senha.

#### **Request:**
```json
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "minhasenha123"
}
```

#### **Response - Sucesso:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "12345",
      "email": "usuario@exemplo.com",
      "name": "João Silva",
      "avatar": "https://avatar.url/12345.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_12345",
    "expiresIn": 3600
  }
}
```

#### **Response - Erro:**
```json
HTTP/1.1 401 Unauthorized
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email ou senha incorretos"
  }
}
```

### 🚪 **POST /auth/logout**
Invalida token de acesso atual.

#### **Request:**
```bash
POST /auth/logout
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

### 🔄 **POST /auth/refresh**
Renova token de acesso usando refresh token.

#### **Request:**
```json
POST /auth/refresh
{
  "refreshToken": "refresh_token_12345"
}
```

### 📝 **POST /auth/register**
Registra novo usuário.

#### **Request:**
```json
POST /auth/register
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "minhasenha123",
  "confirmPassword": "minhasenha123"
}
```

---

## 👤 **USUÁRIOS**

### 📋 **GET /users/me**
Retorna dados do usuário autenticado.

#### **Request:**
```bash
GET /users/me
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "avatar": "https://avatar.url/12345.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "lastLogin": "2025-01-29T10:30:00Z",
    "preferences": {
      "timezone": "America/Sao_Paulo",
      "language": "pt-BR"
    }
  }
}
```

### ✏️ **PUT /users/me**
Atualiza dados do usuário autenticado.

#### **Request:**
```json
PUT /users/me
Authorization: Bearer {token}

{
  "name": "João Silva Santos",
  "avatar": "https://nova-avatar.url/12345.jpg",
  "preferences": {
    "timezone": "America/Sao_Paulo",
    "language": "pt-BR"
  }
}
```

### 🔒 **PUT /users/me/password**
Altera senha do usuário.

#### **Request:**
```json
PUT /users/me/password
Authorization: Bearer {token}

{
  "currentPassword": "senhaatual123",
  "newPassword": "novasenha456",
  "confirmPassword": "novasenha456"
}
```

---

## 📺 **YOUTUBE INTEGRATION**

### 🔗 **GET /youtube/auth-url**
Retorna URL para autorização OAuth do YouTube.

#### **Request:**
```bash
GET /youtube/auth-url
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "authUrl": "https://accounts.google.com/oauth2/auth?client_id=...",
    "state": "random_state_12345"
  }
}
```

### ✅ **POST /youtube/callback**
Processa callback do OAuth do YouTube.

#### **Request:**
```json
POST /youtube/callback
Authorization: Bearer {token}

{
  "code": "4/0AX4XfWjABCD...",
  "state": "random_state_12345"
}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "channelId": "UCxxx...",
    "channelTitle": "Meu Canal",
    "subscriberCount": 1250,
    "videoCount": 45,
    "connected": true
  }
}
```

### 📊 **GET /youtube/analytics**
Retorna analytics do canal YouTube.

#### **Request:**
```bash
GET /youtube/analytics?startDate=2025-01-01&endDate=2025-01-31&metrics=views,estimatedMinutesWatched,subscribersGained
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "metrics": {
      "views": 15420,
      "estimatedMinutesWatched": 89450,
      "subscribersGained": 125
    },
    "dailyData": [
      {
        "date": "2025-01-01",
        "views": 450,
        "estimatedMinutesWatched": 2650,
        "subscribersGained": 3
      }
    ],
    "topVideos": [
      {
        "videoId": "abc123",
        "title": "Episódio #45",
        "views": 2340,
        "duration": "PT1H23M45S"
      }
    ]
  }
}
```

### 🎥 **GET /youtube/videos**
Lista vídeos do canal.

#### **Request:**
```bash
GET /youtube/videos?page=1&limit=20&sortBy=publishedAt&order=desc
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "videos": [
      {
        "id": "abc123",
        "title": "Episódio #45 - Tecnologia e Futuro",
        "description": "Neste episódio discutimos...",
        "thumbnail": "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
        "publishedAt": "2025-01-29T10:00:00Z",
        "duration": "PT1H23M45S",
        "views": 2340,
        "likes": 89,
        "comments": 23
      }
    ],
    "pagination": {
      "current": 1,
      "total": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 👥 **CONVIDADOS (GUESTS)**

### 📋 **GET /guests**
Lista todos os convidados do usuário.

#### **Request:**
```bash
GET /guests?page=1&limit=20&status=prospects&search=joão
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "guests": [
      {
        "id": "guest_123",
        "name": "João Silva",
        "email": "joao@exemplo.com",
        "company": "Tech Corp",
        "expertise": "Inteligência Artificial",
        "status": "prospects",
        "notes": "Primeiro contato via LinkedIn",
        "socialLinks": {
          "linkedin": "https://linkedin.com/in/joaosilva",
          "twitter": "https://twitter.com/joaosilva"
        },
        "createdAt": "2025-01-15T10:30:00Z",
        "updatedAt": "2025-01-29T14:20:00Z"
      }
    ],
    "stats": {
      "prospects": 12,
      "contacted": 8,
      "scheduled": 3,
      "recorded": 15,
      "published": 10
    },
    "pagination": {
      "current": 1,
      "total": 2,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### ➕ **POST /guests**
Cria novo convidado.

#### **Request:**
```json
POST /guests
Authorization: Bearer {token}

{
  "name": "Maria Santos",
  "email": "maria@exemplo.com",
  "company": "Startup Inc",
  "expertise": "Marketing Digital",
  "status": "prospects",
  "notes": "Indicação do João",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/mariasantos",
    "website": "https://mariasantos.com"
  }
}
```

#### **Response:**
```json
HTTP/1.1 201 Created
{
  "success": true,
  "data": {
    "id": "guest_456",
    "name": "Maria Santos",
    "email": "maria@exemplo.com",
    "company": "Startup Inc",
    "expertise": "Marketing Digital",
    "status": "prospects",
    "notes": "Indicação do João",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/mariasantos",
      "website": "https://mariasantos.com"
    },
    "createdAt": "2025-01-29T15:30:00Z",
    "updatedAt": "2025-01-29T15:30:00Z"
  }
}
```

### 📝 **PUT /guests/:id**
Atualiza dados do convidado.

#### **Request:**
```json
PUT /guests/guest_123
Authorization: Bearer {token}

{
  "status": "contacted",
  "notes": "Primeiro contato via LinkedIn - respondeu positivamente",
  "contactDate": "2025-01-29T10:00:00Z"
}
```

### 🗑️ **DELETE /guests/:id**
Remove convidado.

#### **Request:**
```bash
DELETE /guests/guest_123
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "message": "Convidado removido com sucesso"
}
```

---

## 📊 **ANALYTICS E RELATÓRIOS**

### 📈 **GET /analytics/overview**
Dashboard geral de analytics.

#### **Request:**
```bash
GET /analytics/overview?period=30d
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "youtube": {
      "totalViews": 45230,
      "totalWatchTime": 256780,
      "newSubscribers": 342,
      "engagement": 4.2
    },
    "guests": {
      "total": 48,
      "prospects": 12,
      "contacted": 8,
      "scheduled": 3,
      "recorded": 15,
      "published": 10
    },
    "content": {
      "episodesPublished": 10,
      "averageDuration": "PT1H15M",
      "averageViews": 4523
    },
    "trends": {
      "views": {
        "current": 45230,
        "previous": 38920,
        "change": 16.2
      },
      "subscribers": {
        "current": 342,
        "previous": 289,
        "change": 18.3
      }
    }
  }
}
```

### 📋 **GET /analytics/reports**
Lista relatórios disponíveis.

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": "weekly_summary",
        "name": "Resumo Semanal",
        "description": "Métricas da semana atual vs anterior",
        "type": "automated",
        "frequency": "weekly"
      },
      {
        "id": "monthly_performance",
        "name": "Performance Mensal",
        "description": "Análise completa do mês",
        "type": "automated", 
        "frequency": "monthly"
      }
    ]
  }
}
```

### 📊 **POST /analytics/reports/generate**
Gera relatório personalizado.

#### **Request:**
```json
POST /analytics/reports/generate
Authorization: Bearer {token}

{
  "type": "custom",
  "name": "Relatório Q1 2025",
  "startDate": "2025-01-01",
  "endDate": "2025-03-31",
  "metrics": ["views", "subscribers", "engagement", "revenue"],
  "format": "pdf"
}
```

---

## 🔔 **NOTIFICAÇÕES**

### 📱 **GET /notifications**
Lista notificações do usuário.

#### **Request:**
```bash
GET /notifications?page=1&limit=20&unread=true
Authorization: Bearer {token}
```

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "youtube_milestone",
        "title": "Parabéns! 1000 inscritos alcançados!",
        "message": "Seu canal atingiu a marca de 1000 inscritos",
        "read": false,
        "createdAt": "2025-01-29T10:30:00Z",
        "data": {
          "milestone": 1000,
          "previousCount": 950
        }
      }
    ],
    "unreadCount": 3
  }
}
```

### ✅ **PUT /notifications/:id/read**
Marca notificação como lida.

### 📧 **GET /notifications/preferences**
Retorna preferências de notificação.

### ⚙️ **PUT /notifications/preferences**
Atualiza preferências de notificação.

---

## 🔧 **WEBHOOKS**

### 🪝 **GET /webhooks**
Lista webhooks configurados.

### ➕ **POST /webhooks**
Cria novo webhook.

#### **Request:**
```json
POST /webhooks
Authorization: Bearer {token}

{
  "url": "https://meusite.com/webhook",
  "events": ["youtube.new_video", "guest.status_changed"],
  "secret": "meu_secret_seguro"
}
```

### 🗑️ **DELETE /webhooks/:id**
Remove webhook.

---

## 🎛️ **CONFIGURAÇÕES**

### ⚙️ **GET /settings**
Retorna configurações do usuário.

#### **Response:**
```json
HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "notifications": {
      "email": true,
      "push": false,
      "weeklyReport": true
    },
    "integrations": {
      "youtube": {
        "connected": true,
        "channelId": "UCxxx...",
        "lastSync": "2025-01-29T10:30:00Z"
      }
    },
    "preferences": {
      "timezone": "America/Sao_Paulo",
      "language": "pt-BR",
      "dateFormat": "DD/MM/YYYY"
    }
  }
}
```

### 💾 **PUT /settings**
Atualiza configurações.

---

## ❌ **CÓDIGOS DE ERRO**

### 📋 **Códigos HTTP Padrão**
- `200` - Sucesso
- `201` - Criado
- `400` - Bad Request
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `422` - Dados inválidos
- `429` - Rate limit excedido
- `500` - Erro interno

### 🔧 **Códigos de Erro Específicos**
```json
{
  "success": false,
  "error": {
    "code": "YOUTUBE_NOT_CONNECTED",
    "message": "Canal do YouTube não está conectado",
    "details": {
      "action": "connect_youtube",
      "url": "/youtube/auth-url"
    }
  }
}
```

### 📋 **Lista de Códigos:**
- `INVALID_CREDENTIALS` - Credenciais inválidas
- `TOKEN_EXPIRED` - Token expirado
- `YOUTUBE_NOT_CONNECTED` - YouTube não conectado
- `GUEST_NOT_FOUND` - Convidado não encontrado
- `INVALID_EMAIL` - Email inválido
- `PASSWORD_TOO_WEAK` - Senha muito fraca
- `RATE_LIMIT_EXCEEDED` - Limite de taxa excedido

---

## 📊 **RATE LIMITING**

### 🚦 **Limites por Endpoint**
- **Auth endpoints:** 5 req/min por IP
- **Read operations:** 100 req/min por usuário
- **Write operations:** 30 req/min por usuário
- **Analytics:** 20 req/min por usuário

### 📱 **Headers de Rate Limit**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
```

---

## 📡 **EXEMPLOS DE USO**

### 🔧 **cURL Examples**

#### **Login:**
```bash
curl -X POST https://api.sistemaLanceiEssa.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@exemplo.com", "password": "senha123"}'
```

#### **Listar Convidados:**
```bash
curl -X GET https://api.sistemaLanceiEssa.com/v1/guests \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 💻 **JavaScript Examples**

#### **Fetch API:**
```javascript
// Login
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'usuario@exemplo.com',
    password: 'senha123'
  })
});

const data = await response.json();
const token = data.data.token;

// Listar convidados
const guestsResponse = await fetch('/api/v1/guests', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const guests = await guestsResponse.json();
```

### 🐍 **Python Examples**
```python
import requests

# Login
response = requests.post(
    'https://api.sistemaLanceiEssa.com/v1/auth/login',
    json={
        'email': 'usuario@exemplo.com',
        'password': 'senha123'
    }
)

token = response.json()['data']['token']

# Listar convidados
guests_response = requests.get(
    'https://api.sistemaLanceiEssa.com/v1/guests',
    headers={'Authorization': f'Bearer {token}'}
)

guests = guests_response.json()
```

---

## 🔗 **Links Relacionados**

### 📚 **Documentação Adicional**
- 🔐 [Autenticação Detalhada](authentication.md)
- 📺 [Integração YouTube](youtube-integration.md)
- 🏗️ [Arquitetura da API](../architecture/api-design.md)

### 🛠️ **Ferramentas**
- 📋 [Postman Collection](https://postman.com/collections/sistema-lancei-essa)
- 🔧 [OpenAPI Spec](https://api.sistemaLanceiEssa.com/docs)
- 🧪 [Sandbox Environment](https://sandbox.sistemaLanceiEssa.com)

---

<div align="center">

### 🎉 **API Documentation Complete!**
**Agora você tem todas as informações para integrar com nossa API!**

**❓ Dúvidas?** Consulte nossa [FAQ](../../user-guide/faq.md) ou entre em contato

</div>

---

**📝 Última atualização:** 29/01/2025  
**🔄 Próxima revisão:** 29/02/2025  
**📧 Suporte:** dev@sistemaLanceiEssa.com 