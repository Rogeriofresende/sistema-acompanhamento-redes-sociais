import React, { useState } from "react";
import { LoginForm } from "@/features/login-form";
import { GoogleLoginButton } from "@/features/google-login-button";
import { ChannelLogo } from "@/features/channel-logo";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <ChannelLogo size="lg" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Bem-vindo
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Faça login para acessar o sistema Lancei Essa
              </p>
            </div>

            <LoginForm onLogin={onLogin} />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Ou continue com
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleLoginButton onLogin={onLogin} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lancei Essa. Todos os direitos
          reservados.
        </div>
      </div>
    </div>
  );
}
