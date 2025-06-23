// Configuração da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1717';

// Helper para fazer requisições
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem('lanceiessa_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error || 'Erro na requisição');
  }
  
  return response.json();
}

// Funções da API
export const api = {
  // Autenticação
  auth: {
    googleLogin: async (credential: string) => {
      const response = await apiRequest('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      });
      
      console.log('Resposta bruta do backend:', response);
      
      // Retorna diretamente user e token, removendo o campo success
      return {
        user: response.user,
        token: response.token
      };
    },
    
    logout: () => {
    },
    
    getUser: () => {
      const userStr = localStorage.getItem('lanceiessa_user');
      return userStr ? JSON.parse(userStr) : null;
    },
    
    isAuthenticated: () => {
      return !!localStorage.getItem('lanceiessa_token');
    },
  },
  
  // Usuário
  user: {
    updateEmail: async (email: string) => {
      return apiRequest('/api/user/email', {
        method: 'PATCH',
        body: JSON.stringify({ email }),
      });
    },
    
    updateRole: async (role: string) => {
      return apiRequest('/api/user/role', {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      });
    },
    
    updateProfile: async (profile: string) => {
      return apiRequest('/api/user/upgrade', {
        method: 'PATCH',
        body: JSON.stringify({ profile }),
      });
    },
  },
  
  // Health check
  health: async () => {
    return apiRequest('/health');
  },
}; 