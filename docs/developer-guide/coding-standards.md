# 📐 **Padrões de Código - Sistema Lancei Essa**

**📅 Data:** 29/01/2025  
**👨‍💻 Autor:** Sistema Lancei Essa  
**🎯 Audiência:** Desenvolvedores  
**⏱️ Tempo de leitura:** 25 minutos

---

## 🎯 **Filosofia dos Padrões**

Nossos padrões de código seguem princípios fundamentais que garantem **qualidade**, **manutenibilidade** e **escalabilidade**:

### 🏛️ **Princípios Fundamentais**
1. **Legibilidade** - Código é lido 10x mais que escrito
2. **Consistência** - Padrões uniformes em todo o projeto
3. **Simplicidade** - KISS (Keep It Simple, Stupid)
4. **Testabilidade** - Código fácil de testar
5. **Performance** - Eficiência sem sacrificar clareza

---

## 🏗️ **ARQUITETURA E ESTRUTURA**

### 📁 **Estrutura de Pastas**

#### **Frontend (React/TypeScript):**
```
apps/frontend/src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   └── shared/         # Componentes compartilhados
├── features/           # Features específicas
│   ├── auth/
│   ├── youtube/
│   └── guests/
├── hooks/              # Custom hooks
├── lib/                # Utilities e helpers
├── types/              # Definições de tipos
├── services/           # API clients e services
├── store/              # Estado global (Zustand/Redux)
├── utils/              # Funções utilitárias
└── assets/             # Imagens, ícones, etc
```

#### **Backend (Node.js/Express):**
```
backend/src/
├── controllers/        # Route handlers
├── services/           # Business logic
├── models/             # Database models (Prisma)
├── middleware/         # Express middleware
├── routes/             # Route definitions
├── utils/              # Utility functions
├── types/              # TypeScript types
├── config/             # Configuration files
└── tests/              # Test files
```

### 🏷️ **Convenções de Nomenclatura**

#### **Arquivos e Pastas:**
```bash
# Componentes React (PascalCase)
UserProfile.tsx
GuestCard.tsx
YouTubeAnalytics.tsx

# Hooks (camelCase com 'use' prefix)
useAuth.ts
useYouTubeData.ts
useLocalStorage.ts

# Services e Utils (camelCase)
apiClient.ts
youtubeService.ts
dateUtils.ts

# Types e Interfaces (PascalCase)
User.ts
Guest.ts
YouTubeChannel.ts

# Pastas (kebab-case)
youtube-integration/
guest-management/
api-client/

# Constantes (SCREAMING_SNAKE_CASE)
API_ENDPOINTS.ts
ERROR_MESSAGES.ts
```

#### **Variáveis e Funções:**
```typescript
// ✅ Variáveis (camelCase)
const userName = 'João Silva';
const isAuthenticated = true;
const userPreferences = {};

// ✅ Constantes (SCREAMING_SNAKE_CASE)
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;

// ✅ Funções (camelCase)
function calculateDuration() {}
const handleUserLogin = () => {};
const processYouTubeData = async () => {};

// ✅ Booleans (is/has/can/should prefix)
const isLoading = false;
const hasPermission = true;
const canEdit = false;
const shouldUpdate = true;

// ✅ Classes (PascalCase)
class YouTubeService {}
class DatabaseConnection {}

// ✅ Interfaces/Types (PascalCase)
interface UserData {}
type ApiResponse<T> = {};
```

---

## ⚛️ **PADRÕES REACT**

### 🏗️ **Estrutura de Componentes**

#### **Template Padrão:**
```typescript
// UserProfile.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, UserPermissions } from '../types';
import { Button } from '../ui/button';
import { useAuth } from '../hooks/useAuth';

interface UserProfileProps {
  user: User;
  permissions?: UserPermissions;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  className?: string;
}

export function UserProfile({ 
  user, 
  permissions, 
  onEdit, 
  onDelete,
  className 
}: UserProfileProps) {
  // 1. Estado local
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 2. Hooks personalizados
  const { currentUser, hasPermission } = useAuth();
  
  // 3. Estado derivado (useMemo)
  const displayName = useMemo(() => {
    return user.name || user.email || 'Usuário Anônimo';
  }, [user.name, user.email]);
  
  const canEdit = useMemo(() => {
    return hasPermission('user.edit') && user.id === currentUser?.id;
  }, [hasPermission, user.id, currentUser?.id]);
  
  // 4. Handlers (useCallback)
  const handleEditClick = useCallback(() => {
    if (!canEdit) return;
    setIsEditing(true);
    onEdit?.(user);
  }, [canEdit, onEdit, user]);
  
  const handleDeleteClick = useCallback(async () => {
    if (!hasPermission('user.delete')) return;
    
    setLoading(true);
    try {
      await onDelete?.(user.id);
    } finally {
      setLoading(false);
    }
  }, [hasPermission, onDelete, user.id]);
  
  // 5. Efeitos
  useEffect(() => {
    // Log analytics quando componente é exibido
    analytics.track('user_profile_viewed', { userId: user.id });
  }, [user.id]);
  
  // 6. Early returns
  if (!user) {
    return (
      <div className="user-profile-skeleton">
        Carregando perfil...
      </div>
    );
  }
  
  // 7. Render principal
  return (
    <div className={`user-profile ${className || ''}`}>
      <div className="user-profile__header">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={`Avatar de ${displayName}`}
          className="user-profile__avatar"
        />
        <div className="user-profile__info">
          <h2 className="user-profile__name">{displayName}</h2>
          <p className="user-profile__email">{user.email}</p>
        </div>
      </div>
      
      <div className="user-profile__actions">
        {canEdit && (
          <Button 
            onClick={handleEditClick}
            disabled={loading}
            variant="outline"
          >
            Editar
          </Button>
        )}
        
        {hasPermission('user.delete') && user.id !== currentUser?.id && (
          <Button 
            onClick={handleDeleteClick}
            disabled={loading}
            variant="destructive"
          >
            {loading ? 'Removendo...' : 'Remover'}
          </Button>
        )}
      </div>
    </div>
  );
}

// 8. Export com display name para debugging
UserProfile.displayName = 'UserProfile';
```

### 🎣 **Custom Hooks**

#### **Padrões para Hooks:**
```typescript
// useYouTubeData.ts
import { useState, useEffect, useCallback } from 'react';
import { YouTubeChannel, YouTubeAnalytics } from '../types';
import { youtubeService } from '../services/youtubeService';

interface UseYouTubeDataOptions {
  autoFetch?: boolean;
  refreshInterval?: number;
}

interface UseYouTubeDataReturn {
  channel: YouTubeChannel | null;
  analytics: YouTubeAnalytics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export function useYouTubeData(
  options: UseYouTubeDataOptions = {}
): UseYouTubeDataReturn {
  const { autoFetch = true, refreshInterval } = options;
  
  // Estado
  const [channel, setChannel] = useState<YouTubeChannel | null>(null);
  const [analytics, setAnalytics] = useState<YouTubeAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Função de fetch
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [channelData, analyticsData] = await Promise.all([
        youtubeService.getChannel(),
        youtubeService.getAnalytics()
      ]);
      
      setChannel(channelData);
      setAnalytics(analyticsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  // Auto fetch
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);
  
  // Refresh interval
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, fetchData]);
  
  return {
    channel,
    analytics,
    loading,
    error,
    refetch: fetchData,
    clearError
  };
}
```

### 🎨 **Padrões de CSS/Styling**

#### **CSS Modules (preferido):**
```typescript
// UserProfile.module.css
.userProfile {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.userProfile__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.userProfile__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.userProfile__name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.userProfile__email {
  color: var(--text-muted);
  margin: 0;
}

// No componente
import styles from './UserProfile.module.css';

<div className={styles.userProfile}>
  <div className={styles.userProfile__header}>
    {/* content */}
  </div>
</div>
```

#### **Tailwind (alternativo):**
```typescript
// Com clsx para conditional classes
import clsx from 'clsx';

const buttonClasses = clsx(
  'px-4 py-2 rounded-md font-medium transition-colors',
  {
    'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
    'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled
  }
);

<button className={buttonClasses}>
  Click me
</button>
```

---

## 🔧 **PADRÕES BACKEND**

### 🎯 **Estrutura de Controllers**

```typescript
// userController.ts
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { CreateUserDto, UpdateUserDto } from '../types/user';
import { ApiResponse } from '../types/api';
import { validateDto } from '../utils/validation';
import { logger } from '../config/logger';

export class UserController {
  // GET /users
  public static async getUsers(
    req: Request,
    res: Response<ApiResponse<User[]>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = 1, limit = 20, search } = req.query;
      
      const users = await userService.getUsers({
        page: Number(page),
        limit: Number(limit),
        search: search as string
      });
      
      res.json({
        success: true,
        data: users.data,
        meta: {
          total: users.total,
          page: users.page,
          limit: users.limit
        }
      });
    } catch (error) {
      logger.error('Error fetching users', { error, query: req.query });
      next(error);
    }
  }
  
  // GET /users/:id
  public static async getUserById(
    req: Request,
    res: Response<ApiResponse<User>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      
      const user = await userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'Usuário não encontrado'
          }
        });
        return;
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Error fetching user', { error, userId: req.params.id });
      next(error);
    }
  }
  
  // POST /users
  public static async createUser(
    req: Request,
    res: Response<ApiResponse<User>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const createUserDto = validateDto(CreateUserDto, req.body);
      
      const user = await userService.createUser(createUserDto);
      
      logger.info('User created successfully', { userId: user.id });
      
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Error creating user', { error, body: req.body });
      next(error);
    }
  }
  
  // PUT /users/:id
  public static async updateUser(
    req: Request,
    res: Response<ApiResponse<User>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updateUserDto = validateDto(UpdateUserDto, req.body);
      
      const user = await userService.updateUser(id, updateUserDto);
      
      logger.info('User updated successfully', { userId: id });
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Error updating user', { error, userId: req.params.id });
      next(error);
    }
  }
  
  // DELETE /users/:id
  public static async deleteUser(
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      
      await userService.deleteUser(id);
      
      logger.info('User deleted successfully', { userId: id });
      
      res.json({
        success: true,
        data: null,
        message: 'Usuário removido com sucesso'
      });
    } catch (error) {
      logger.error('Error deleting user', { error, userId: req.params.id });
      next(error);
    }
  }
}
```

### 🔧 **Padrões de Services**

```typescript
// userService.ts
import { prisma } from '../config/database';
import { User, CreateUserDto, UpdateUserDto } from '../types/user';
import { PaginatedResult, PaginationOptions } from '../types/pagination';
import { hashPassword, comparePassword } from '../utils/crypto';
import { AppError } from '../utils/AppError';

export class UserService {
  public static async getUsers(
    options: PaginationOptions & { search?: string }
  ): Promise<PaginatedResult<User>> {
    const { page, limit, search } = options;
    const offset = (page - 1) * limit;
    
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {};
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
          updatedAt: true
          // Não retornar password
        }
      }),
      prisma.user.count({ where })
    ]);
    
    return {
      data: users,
      total,
      page,
      limit,
      hasNext: total > page * limit,
      hasPrev: page > 1
    };
  }
  
  public static async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
  
  public static async createUser(data: CreateUserDto): Promise<User> {
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      throw new AppError('Email já está em uso', 409, 'EMAIL_ALREADY_EXISTS');
    }
    
    // Hash da senha
    const hashedPassword = await hashPassword(data.password);
    
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return user;
  }
  
  public static async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    // Verificar se usuário existe
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    // Se está mudando email, verificar se não existe
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: data.email }
      });
      
      if (emailExists) {
        throw new AppError('Email já está em uso', 409, 'EMAIL_ALREADY_EXISTS');
      }
    }
    
    // Atualizar
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return user;
  }
  
  public static async deleteUser(id: string): Promise<void> {
    // Verificar se usuário existe
    const user = await this.getUserById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    // Soft delete (marcar como deletado)
    await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });
  }
}
```

---

## 📝 **TYPESCRIPT PATTERNS**

### 🎯 **Definição de Types**

```typescript
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UserPreferences {
  timezone: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
  };
}

// Utility types
export type UserWithoutSensitive = Omit<User, 'password'>;
export type UserPermissions = 'user.read' | 'user.write' | 'user.delete';
export type UserRole = 'admin' | 'user' | 'guest';
```

### 🔧 **Generic Types**

```typescript
// types/api.ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  message?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

// Service response type
export type ServiceResult<T> = Promise<T>;
export type ServiceError = Error & { code?: string; statusCode?: number };
```

### 🛡️ **Type Guards**

```typescript
// utils/typeGuards.ts
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    typeof (obj as User).id === 'string' &&
    typeof (obj as User).email === 'string'
  );
}

export function isApiError(obj: unknown): obj is { error: { code: string; message: string } } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    typeof (obj as any).error === 'object' &&
    'code' in (obj as any).error &&
    'message' in (obj as any).error
  );
}

// Usage
if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.email);
}
```

---

## 🧪 **PADRÕES DE TESTE**

### ⚡ **Testes Unitários (Jest)**

```typescript
// __tests__/userService.test.ts
import { UserService } from '../services/userService';
import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';

// Mock Prisma
jest.mock('../config/database');
const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('getUserById', () => {
    it('should return user when found', async () => {
      // Arrange
      const userId = 'user-123';
      const mockUser = {
        id: userId,
        name: 'João Silva',
        email: 'joao@example.com',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockedPrisma.user.findUnique.mockResolvedValue(mockUser);
      
      // Act
      const result = await UserService.getUserById(userId);
      
      // Assert
      expect(result).toEqual(mockUser);
      expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: expect.objectContaining({
          id: true,
          name: true,
          email: true
        })
      });
    });
    
    it('should return null when user not found', async () => {
      // Arrange
      mockedPrisma.user.findUnique.mockResolvedValue(null);
      
      // Act
      const result = await UserService.getUserById('nonexistent');
      
      // Assert
      expect(result).toBeNull();
    });
  });
  
  describe('createUser', () => {
    it('should create user successfully', async () => {
      // Arrange
      const createUserDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123'
      };
      
      const mockCreatedUser = {
        id: 'user-123',
        ...createUserDto,
        password: 'hashed-password',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockedPrisma.user.findUnique.mockResolvedValue(null); // Email não existe
      mockedPrisma.user.create.mockResolvedValue(mockCreatedUser);
      
      // Act
      const result = await UserService.createUser(createUserDto);
      
      // Assert
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: createUserDto.name,
        email: createUserDto.email
      }));
    });
    
    it('should throw error when email already exists', async () => {
      // Arrange
      const createUserDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123'
      };
      
      mockedPrisma.user.findUnique.mockResolvedValue({
        id: 'existing-user',
        email: createUserDto.email
      } as any);
      
      // Act & Assert
      await expect(UserService.createUser(createUserDto))
        .rejects
        .toThrow(AppError);
      
      await expect(UserService.createUser(createUserDto))
        .rejects
        .toThrow('Email já está em uso');
    });
  });
});
```

### 🔧 **Testes de Integração**

```typescript
// __tests__/integration/userController.test.ts
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../config/database';
import { generateTestUser, generateJWT } from '../utils/testHelpers';

describe('User Controller Integration', () => {
  let authToken: string;
  let testUser: any;
  
  beforeAll(async () => {
    // Setup test user
    testUser = await generateTestUser();
    authToken = generateJWT(testUser.id);
  });
  
  afterAll(async () => {
    // Cleanup
    await prisma.user.deleteMany({
      where: { email: { contains: 'test' } }
    });
  });
  
  describe('GET /api/users', () => {
    it('should return paginated users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200);
      
      expect(response.body).toMatchObject({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String)
          })
        ]),
        meta: expect.objectContaining({
          total: expect.any(Number),
          page: 1,
          limit: 10
        })
      });
    });
    
    it('should return 401 without auth token', async () => {
      await request(app)
        .get('/api/users')
        .expect(401);
    });
  });
  
  describe('POST /api/users', () => {
    it('should create new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newUser)
        .expect(201);
      
      expect(response.body).toMatchObject({
        success: true,
        data: expect.objectContaining({
          name: newUser.name,
          email: newUser.email
        })
      });
      
      // Verify user was created in database
      const createdUser = await prisma.user.findUnique({
        where: { email: newUser.email }
      });
      expect(createdUser).toBeTruthy();
    });
  });
});
```

---

## 🚨 **ERROR HANDLING**

### 🛡️ **Classe de Erro Customizada**

```typescript
// utils/AppError.ts
export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;
  
  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Errors específicos
export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 422, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}
```

### 🔧 **Middleware de Error Handling**

```typescript
// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../config/logger';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log do erro
  logger.error('Error occurred', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Se é um erro operacional conhecido
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message
      }
    });
    return;
  }
  
  // Erros específicos do Prisma
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    
    if (prismaError.code === 'P2002') {
      res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_ENTRY',
          message: 'Registro já existe'
        }
      });
      return;
    }
  }
  
  // Erros de validação
  if (error.name === 'ValidationError') {
    res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message
      }
    });
    return;
  }
  
  // Erro genérico
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Erro interno do servidor' 
        : error.message
    }
  });
}
```

---

## 📊 **LOGGING E MONITORING**

### 📝 **Logger Configuration**

```typescript
// config/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'sistema-lancei-essa' },
  transports: [
    // File transports
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    }),
    
    // Console transport for development
    ...(process.env.NODE_ENV !== 'production' ? [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ] : [])
  ]
});

export { logger };
```

### 📊 **Structured Logging**

```typescript
// Exemplos de uso do logger
import { logger } from '../config/logger';

// Info logs
logger.info('User logged in successfully', {
  userId: user.id,
  email: user.email,
  ip: req.ip,
  userAgent: req.get('User-Agent')
});

// Error logs
logger.error('YouTube API call failed', {
  error: error.message,
  stack: error.stack,
  userId: user.id,
  endpoint: '/youtube/analytics',
  statusCode: 500
});

// Debug logs
logger.debug('Processing YouTube callback', {
  state: req.query.state,
  code: req.query.code?.substring(0, 10) + '...',
  userId: user.id
});

// Warn logs
logger.warn('User attempting unauthorized action', {
  userId: user.id,
  action: 'delete_user',
  targetUserId: req.params.id,
  permissions: user.permissions
});
```

---

## 🔒 **SECURITY PATTERNS**

### 🛡️ **Input Validation**

```typescript
// utils/validation.ts
import Joi from 'joi';

export const userSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
    ).required().messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    })
  }),
  
  update: Joi.object({
    name: Joi.string().min(2).max(100),
    email: Joi.string().email(),
    avatar: Joi.string().uri().allow(null)
  })
};

export function validateDto<T>(schema: Joi.ObjectSchema, data: unknown): T {
  const { error, value } = schema.validate(data, { 
    abortEarly: false,
    stripUnknown: true 
  });
  
  if (error) {
    const message = error.details.map(d => d.message).join(', ');
    throw new ValidationError(message);
  }
  
  return value;
}
```

### 🔐 **Authentication Middleware**

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/AppError';
import { userService } from '../services/userService';

interface AuthRequest extends Request {
  user?: User;
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token not provided');
    }
    
    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    const user = await userService.getUserById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
}

export function requirePermission(permission: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }
    
    if (!req.user.permissions?.includes(permission)) {
      return next(new UnauthorizedError('Insufficient permissions'));
    }
    
    next();
  };
}
```

---

## 📋 **CHECKLIST DE CODE REVIEW**

### ✅ **Checklist Geral**
- [ ] Código segue convenções de nomenclatura
- [ ] Funções têm responsabilidade única
- [ ] Não há duplicação de código
- [ ] Variáveis têm nomes descritivos
- [ ] Código está bem comentado (quando necessário)
- [ ] Não há console.log esquecidos
- [ ] Error handling adequado
- [ ] Testes cobrem cenários principais

### ✅ **Checklist React**
- [ ] Componentes usam TypeScript
- [ ] Props têm interfaces definidas
- [ ] useEffect tem dependencies corretas
- [ ] useState é usado corretamente
- [ ] Componentes são memoizados quando necessário
- [ ] Event handlers usam useCallback
- [ ] CSS segue padrões do projeto

### ✅ **Checklist Backend**
- [ ] Endpoints seguem padrões REST
- [ ] Input validation implementada
- [ ] Responses seguem formato padrão
- [ ] Logs estruturados adicionados
- [ ] Database queries otimizadas
- [ ] Error handling implementado
- [ ] Testes de integração criados

### ✅ **Checklist Segurança**
- [ ] Inputs são validados e sanitizados
- [ ] Não há dados sensíveis em logs
- [ ] Authentication/Authorization implementadas
- [ ] SQL injection prevenido
- [ ] CORS configurado corretamente
- [ ] Rate limiting implementado

---

<div align="center">

### 🎉 **Padrões Estabelecidos!**
**Base sólida para código consistente e de alta qualidade!**

**📚 Próximo:** [Guia de Contribuição](contributing.md)

</div>

---

**📝 Última atualização:** 29/01/2025  
**🔄 Próxima revisão:** 29/02/2025  
**📧 Dúvidas:** dev@sistemaLanceiEssa.com 