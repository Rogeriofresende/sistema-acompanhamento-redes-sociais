import React from "react";
import YoutubeIconContainer from "@/features/youtube-icon-container";
import ConnectButton from "@/features/connect-button";
import PrivacyNotice from "@/features/privacy-notice";

interface ConnectCardProps {
  title: string;
  description: string;
  onConnect: () => void;
  isConnecting: boolean;
  className?: string;
}

export default function ConnectCard({
  title,
  description,
  onConnect,
  isConnecting,
  className,
}: ConnectCardProps) {
  return (
    <div
      className={`max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className || ""}`}
    >
      <YoutubeIconContainer className="mb-6" />

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        {title}
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        {description}
      </p>

      <ConnectButton onClick={onConnect} isLoading={isConnecting} />

      <PrivacyNotice className="mt-4 text-center" />
    </div>
  );
}
