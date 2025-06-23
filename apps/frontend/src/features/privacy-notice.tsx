import React from "react";

interface PrivacyNoticeProps {
  className?: string;
}

export default function PrivacyNotice({ className }: PrivacyNoticeProps) {
  return (
    <p
      className={`text-xs text-gray-500 dark:text-gray-400 ${className || ""}`}
    >
      Ao conectar, você autoriza Lancei Essa a acessar informações da sua conta
      do YouTube conforme nossa política de privacidade.
    </p>
  );
}
