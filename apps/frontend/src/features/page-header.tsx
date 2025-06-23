import React from "react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description: string;
  onNavigateToVideos?: () => void;
}

export function PageHeader({
  title,
  description,
  onNavigateToVideos,
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleNavigateToVideos = () => {
    navigate("/videos");
    if (onNavigateToVideos) {
      onNavigateToVideos();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
