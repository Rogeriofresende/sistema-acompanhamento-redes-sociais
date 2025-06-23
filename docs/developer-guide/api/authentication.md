# 🔐 **AUTENTICAÇÃO - API DO SISTEMA LANCEI ESSA**

**Data de Criação:** 29/01/2025  
**Última Atualização:** 29/01/2025  
**Versão:** 1.0  
**Responsável:** AI Assistant  
**Status:** ✅ Ativo

---

## 🎯 **OBJETIVO**

Este documento detalha o sistema de autenticação da API do Sistema Lancei Essa, incluindo fluxos OAuth2, JWT tokens e práticas de segurança implementadas.

---

## 🔑 **VISÃO GERAL DO SISTEMA**

### 📊 **Fluxo de Autenticação Principal**
```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend API
    participant G as Google OAuth

    U->>F: 1. Clica "Login com Google"
    F->>G: 2. Inicia OAuth flow
    G->>U: 3. Tela de consentimento
    U->>G: 4. Autoriza aplicação
    G->>F: 5. Retorna id_token
    F->>B: 6. POST /api/auth/google {id_token}
    B->>G: 7. Valida id_token
    G->>B: 8. Confirma validade
    B->>B: 9. Busca/cria usuário
    B->>F: 10. Retorna JWT do sistema
    F->>F: 11. Armazena JWT localmente
```

### 🏗️ **Componentes do Sistema**
- **Google OAuth 2.0:** Autenticação inicial do usuário
- **JWT Sistema:** Token interno para autorização
- **Middleware de Auth:** Proteção de rotas privadas
- **Refresh Logic:** Renovação automática de tokens

---

## 🔐 **ENDPOINTS DE AUTENTICAÇÃO**

### 📤 **POST /api/auth/google**
Autentica usuário com token do Google e retorna JWT do sistema.

#### **Request:**
```http
POST /api/auth/google
Content-Type: application/json

{
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyN..."
}
```

#### **Response Success (200):**
```json
{
  "status": "success",
  "message": "Autenticação realizada com sucesso",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "usuario@gmail.com",
      "name": "João Silva",
      "googleId": "108234567890123456789",
      "createdAt": "2025-01-29T10:00:00Z",
      "updatedAt": "2025-01-29T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

#### **Response Error (401):**
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Token do Google inválido ou expirado"
  }
}
```

### 📤 **POST /api/auth/refresh**
Renova JWT do sistema (se implementado).

#### **Request:**
```http
POST /api/auth/refresh
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Response (200):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

### 📤 **POST /api/auth/logout**
Invalida sessão atual (opcional).

#### **Request:**
```http
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Response (200):**
```json
{
  "status": "success",
  "message": "Logout realizado com sucesso"
}
```

---

## 🔒 **SISTEMA JWT**

### 📋 **Estrutura do Token**
```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "123e4567-e89b-12d3-a456-426614174000", // user.id
  "email": "usuario@gmail.com",
  "name": "João Silva",
  "iat": 1643723400,  // issued at
  "exp": 1644328200,  // expires at (7 dias)
  "iss": "sistema-lancei-essa",
  "aud": "sistema-lancei-essa-app"
}
```

### ⚙️ **Configuração**
```javascript
// backend/src/config/jwt.js
const jwt = require('jsonwebtoken');

const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
  issuer: 'sistema-lancei-essa',
  audience: 'sistema-lancei-essa-app'
};

const generateToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name
    },
    JWT_CONFIG.secret,
    {
      expiresIn: JWT_CONFIG.expiresIn,
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_CONFIG.secret, {
    issuer: JWT_CONFIG.issuer,
    audience: JWT_CONFIG.audience
  });
};
```

---

## 🛡️ **MIDDLEWARE DE AUTENTICAÇÃO**

### 🔐 **requireAuth Middleware**
```javascript
// backend/src/middlewares/requireAuth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const requireAuth = async (req, res, next) => {
  try {
    // 1. Extrair token do header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'MISSING_TOKEN',
          message: 'Token de autorização não fornecido'
        }
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    // 2. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Buscar usuário no banco
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'USER_NOT_FOUND',
          message: 'Usuário não encontrado'
        }
      });
    }

    // 4. Adicionar usuário ao request
    req.user = user;
    req.token = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Token expirado'
        }
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token inválido'
        }
      });
    }

    console.error('Erro na autenticação:', error);
    return res.status(500).json({
      status: 'error',
      error: {
        code: 'AUTH_ERROR',
        message: 'Erro interno na autenticação'
      }
    });
  }
};

module.exports = requireAuth;
```

### 🔧 **Uso do Middleware**
```javascript
// backend/src/routes/userRoutes.js
const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const userController = require('../controllers/userController');

const router = express.Router();

// Rota protegida
router.get('/profile', requireAuth, userController.getProfile);
router.put('/profile', requireAuth, userController.updateProfile);

module.exports = router;
```

---

## 📱 **IMPLEMENTAÇÃO NO FRONTEND**

### 🔑 **Configuração do Google OAuth**
```javascript
// frontend/src/services/auth.js
import { GoogleAuth } from '@google-cloud/auth-library';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Inicializar Google One Tap
const initializeGoogleAuth = () => {
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCallback,
    auto_select: false,
    cancel_on_tap_outside: true
  });

  // Renderizar botão
  window.google.accounts.id.renderButton(
    document.getElementById('google-signin-button'),
    {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular'
    }
  );
};
```

### 🔄 **Fluxo de Autenticação**
```javascript
// frontend/src/services/authService.js
class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async loginWithGoogle(googleToken) {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: googleToken })
      });

      const data = await response.json();

      if (response.ok) {
        this.setAuth(data.data.token, data.data.user);
        return { success: true, user: data.data.user };
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message };
    }
  }

  setAuth(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  getAuthHeaders() {
    return this.token ? {
      'Authorization': `Bearer ${this.token}`
    } : {};
  }
}

export default new AuthService();
```

### 🔒 **Interceptor para Requisições**
```javascript
// frontend/src/utils/apiClient.js
import authService from '../services/authService';

class ApiClient {
  constructor() {
    this.baseURL = '/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...authService.getAuthHeaders(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle auth errors
      if (response.status === 401) {
        authService.logout();
        window.location.href = '/login';
        throw new Error('Sessão expirada');
      }

      if (!response.ok) {
        throw new Error(data.error?.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Convenience methods
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export default new ApiClient();
```

---

## 🔒 **SEGURANÇA E BOAS PRÁTICAS**

### 🛡️ **Práticas Implementadas**
- **JWT Secret:** Chave forte de 256 bits no ambiente
- **Token Expiration:** Expiração de 7 dias para balancear segurança/UX
- **HTTPS Only:** Obrigatório em produção
- **Secure Storage:** JWT armazenado apenas no localStorage
- **Input Validation:** Validação rigorosa de todos os inputs
- **Error Handling:** Não exposição de informações sensíveis

### ⚠️ **Headers de Segurança**
```javascript
// backend/src/middlewares/security.js
const helmet = require('helmet');
const cors = require('cors');

const setupSecurity = (app) => {
  // Helmet para headers de segurança
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://accounts.google.com"],
        connectSrc: ["'self'", "https://accounts.google.com"]
      }
    }
  }));

  // CORS configurado
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
};
```

### 🚨 **Validação de Dados**
```javascript
// backend/src/validators/authValidator.js
const Joi = require('joi');

const googleAuthSchema = Joi.object({
  token: Joi.string().required().min(100).max(2000)
});

const validateGoogleAuth = (req, res, next) => {
  const { error } = googleAuthSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      error: {
        code: 'VALIDATION_ERROR',
        message: error.details[0].message
      }
    });
  }
  
  next();
};

module.exports = { validateGoogleAuth };
```

---

## 🧪 **TESTES**

### 🔬 **Testes de Autenticação**
```javascript
// backend/__tests__/auth.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Authentication', () => {
  describe('POST /api/auth/google', () => {
    test('deve autenticar com token válido do Google', async () => {
      const validGoogleToken = 'valid-google-token';
      
      const response = await request(app)
        .post('/api/auth/google')
        .send({ token: validGoogleToken })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();
    });

    test('deve rejeitar token inválido', async () => {
      const invalidToken = 'invalid-token';
      
      const response = await request(app)
        .post('/api/auth/google')
        .send({ token: invalidToken })
        .expect(401);

      expect(response.body.status).toBe('error');
      expect(response.body.error.code).toBe('INVALID_TOKEN');
    });
  });

  describe('Protected Routes', () => {
    test('deve permitir acesso com token válido', async () => {
      const token = 'valid-jwt-token';
      
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.data.user).toBeDefined();
    });

    test('deve negar acesso sem token', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .expect(401);

      expect(response.body.error.code).toBe('MISSING_TOKEN');
    });
  });
});
```

---

## 📊 **MONITORAMENTO**

### 📈 **Métricas de Auth**
```javascript
// backend/src/services/authMetrics.js
const prometheus = require('prom-client');

const authAttempts = new prometheus.Counter({
  name: 'auth_attempts_total',
  help: 'Total authentication attempts',
  labelNames: ['method', 'status']
});

const tokenValidations = new prometheus.Counter({
  name: 'token_validations_total',
  help: 'Total token validations',
  labelNames: ['status']
});

const authDuration = new prometheus.Histogram({
  name: 'auth_duration_seconds',
  help: 'Authentication duration',
  buckets: [0.1, 0.5, 1, 2, 5]
});

module.exports = {
  authAttempts,
  tokenValidations,
  authDuration
};
```

---

## 🔗 **LINKS RELACIONADOS**

### 📚 **Documentação**
- [YouTube Integration](youtube-integration.md)
- [User Management](user-management.md)
- [Security Best Practices](../security/)

### 🛠️ **Código**
- [Auth Controller](../../../backend/src/controllers/authController.js)
- [Auth Middleware](../../../backend/src/middlewares/requireAuth.js)
- [Frontend Auth Service](../../../apps/frontend/src/services/authService.js)

---

**💡 Um sistema de autenticação bem implementado é a base da segurança de toda aplicação!** 