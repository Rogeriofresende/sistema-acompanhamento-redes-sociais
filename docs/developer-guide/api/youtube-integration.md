# 📺 **INTEGRAÇÃO YOUTUBE - API DO SISTEMA LANCEI ESSA**

**Data de Criação:** 29/01/2025  
**Última Atualização:** 29/01/2025  
**Versão:** 1.0  
**Responsável:** AI Assistant  
**Status:** ✅ Ativo

---

## 🎯 **OBJETIVO**

Este documento detalha os endpoints relacionados à integração com YouTube Analytics API, incluindo conexão OAuth, obtenção de métricas e gestão de canais.

---

## 🔗 **ENDPOINTS YOUTUBE**

### 📤 **POST /api/youtube/connect**
Inicia conexão OAuth com YouTube.

#### **Request:**
```http
POST /api/youtube/connect
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Response (200):**
```json
{
  "status": "success",
  "data": {
    "authUrl": "https://accounts.google.com/oauth2/authorize?client_id=..."
  }
}
```

### 📤 **GET /api/youtube/callback**
Callback OAuth do YouTube.

#### **Request:**
```http
GET /api/youtube/callback?code=4/1234567890&state=user_123
```

#### **Response (200):**
```json
{
  "status": "success",
  "message": "Canal conectado com sucesso",
  "data": {
    "channel": {
      "id": "UC1234567890",
      "title": "Meu Canal",
      "subscriberCount": 1500,
      "connectedAt": "2025-01-29T10:00:00Z"
    }
  }
}
```

### 📤 **GET /api/youtube/analytics**
Obtém métricas do YouTube Analytics.

#### **Request:**
```http
GET /api/youtube/analytics?startDate=2025-01-01&endDate=2025-01-29&metrics=views,subscribers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Response (200):**
```json
{
  "status": "success",
  "data": {
    "metrics": {
      "views": 15420,
      "subscribers": 1250,
      "engagement": 0.078,
      "watchTime": 45600
    },
    "period": {
      "startDate": "2025-01-01",
      "endDate": "2025-01-29"
    }
  }
}
```

---

## 🔐 **FLUXO OAUTH YOUTUBE**

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant Y as YouTube API

    U->>F: Clica "Conectar YouTube"
    F->>B: POST /api/youtube/connect
    B->>B: Gera authUrl
    B->>F: Retorna authUrl
    F->>Y: Redireciona para OAuth
    Y->>U: Tela de autorização
    U->>Y: Autoriza aplicação
    Y->>B: GET /callback?code=xxx
    B->>Y: Troca code por tokens
    Y->>B: Retorna access_token
    B->>Y: Busca dados do canal
    Y->>B: Retorna info do canal
    B->>B: Salva tokens no banco
    B->>F: Redireciona para sucesso
```

---

## 🛠️ **IMPLEMENTAÇÃO BACKEND**

### 📊 **Controller YouTube**
```javascript
// backend/src/controllers/youtubeController.js
const { google } = require('googleapis');
const { YouTubeChannel, YouTubeToken } = require('../models');

class YouTubeController {
  async connect(req, res) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
      );

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
          'https://www.googleapis.com/auth/youtube.readonly',
          'https://www.googleapis.com/auth/yt-analytics.readonly'
        ],
        state: req.user.id
      });

      res.json({
        status: 'success',
        data: { authUrl }
      });
    } catch (error) {
      console.error('Erro ao conectar YouTube:', error);
      res.status(500).json({
        status: 'error',
        error: {
          code: 'YOUTUBE_CONNECT_ERROR',
          message: 'Erro ao iniciar conexão com YouTube'
        }
      });
    }
  }

  async callback(req, res) {
    try {
      const { code, state } = req.query;
      const userId = state;

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
      );

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
      const channelsResponse = await youtube.channels.list({
        part: ['snippet', 'statistics'],
        mine: true
      });

      const channel = channelsResponse.data.items[0];
      
      // Salvar canal no banco
      await YouTubeChannel.upsert({
        userId,
        channelId: channel.id,
        title: channel.snippet.title,
        subscriberCount: parseInt(channel.statistics.subscriberCount),
        connectedAt: new Date()
      });

      // Salvar tokens
      await YouTubeToken.upsert({
        userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(tokens.expiry_date)
      });

      res.redirect(`${process.env.FRONTEND_URL}/youtube/success`);
    } catch (error) {
      console.error('Erro no callback YouTube:', error);
      res.redirect(`${process.env.FRONTEND_URL}/youtube/error`);
    }
  }
}
```

---

## 🔗 **LINKS RELACIONADOS**

### 📚 **Documentação**
- [Authentication](authentication.md)
- [User Management](user-management.md)

### 🛠️ **Código**
- [YouTube Controller](../../../backend/src/controllers/youtubeController.js)
- [YouTube Models](../../../backend/src/models/YouTubeChannel.js)

---

**📺 A integração YouTube é o coração do Sistema Lancei Essa!** 