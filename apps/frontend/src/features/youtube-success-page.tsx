import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function YoutubeSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para o dashboard após 3 segundos
    // O status do YouTube será verificado via API, não localStorage
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          YouTube conectado com sucesso!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Redirecionando para o dashboard...
        </p>
      </div>
    </div>
  );
} 