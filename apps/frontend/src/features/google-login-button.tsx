import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from "react-router-dom";

interface GoogleLoginButtonProps {
  onLogin: () => void;
}

export function GoogleLoginButton({ onLogin }: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('1. Token recebido do Google');
      
      // Envia o token do Google para o backend
      const response = await api.auth.googleLogin(credentialResponse.credential);
      
      console.log('2. Resposta do backend:', response);
      
      // Salva as informações do usuário no contexto
      login(response.user, response.token);
      
      console.log('3. Login salvo no contexto');
      
      // Chama o callback onLogin
      onLogin();
      
      console.log('4. onLogin chamado');
      
      // Navega para o dashboard
      console.log('5. Navegando para dashboard...');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Erro no login:', err);
      setError(err.message || 'Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleError = () => {
    setError('Erro ao fazer login com Google');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground text-sm">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md z-10">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}
        
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="outline"
          size="large"
          width={384}
          text="signin_with"
          locale="pt-BR"
        />
      </div>
    </div>
  );
}
