import React, { useState } from "react";
import ConnectCard from "@/features/connect-card";
import { ChannelLogo } from "@/features/channel-logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface YoutubeConnectPageProps {
  onConnect: () => void;
}

export default function YoutubeConnectPage({
  onConnect,
}: YoutubeConnectPageProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const jwt = localStorage.getItem("lanceiessa_token");
      const res = await axios.get("/api/youtube/auth", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.data.authUrl) {
        window.location.href = res.data.authUrl;
      }
    } catch (err) {
      // Tratar erro (exibir mensagem para o usuário, se desejar)
      alert("Erro ao conectar com o YouTube. Faça login novamente ou tente mais tarde.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <ChannelLogo size="lg" />
      </div>

      <ConnectCard
        title="Conectar com YouTube"
        description="Para continuar, precisamos que você conecte sua conta do YouTube para acessar seus dados."
        onConnect={handleConnect}
        isConnecting={isConnecting}
      />

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Lancei Essa. Todos os direitos reservados.
      </div>
    </div>
  );
}
