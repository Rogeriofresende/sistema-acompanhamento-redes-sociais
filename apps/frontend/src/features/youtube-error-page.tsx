import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function YoutubeErrorPage() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/connect-youtube");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Erro ao conectar com YouTube
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Não foi possível conectar sua conta do YouTube. Por favor, tente novamente.
        </p>
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
          <button
            onClick={handleGoToDashboard}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Ir para o Dashboard
          </button>
        </div>
      </div>
    </div>
  );
} 