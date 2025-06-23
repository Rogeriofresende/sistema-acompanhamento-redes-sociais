import React from "react";
import { YoutubeIcon } from "lucide-react";

interface ConnectButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export default function ConnectButton({
  onClick,
  isLoading = false,
  className,
}: ConnectButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition-colors disabled:opacity-70 ${className || ""}`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Conectando...</span>
        </>
      ) : (
        <>
          <YoutubeIcon className="h-5 w-5" />
          <span>Conectar com YouTube</span>
        </>
      )}
    </button>
  );
}
