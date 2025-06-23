import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/features/theme-toggle";
import { ChannelLogo } from "@/features/channel-logo";
import { BrandButton } from "@/features/brand-button";
import { HomeIcon, VideoIcon, MailIcon } from "lucide-react";

interface BrandHeaderProps {
  currentPage?: string;
  onNavigateToDashboard?: () => void;
  onNavigateToVideos?: () => void;
  onNavigateToNewsletter?: () => void;
}

export function BrandHeader({
  currentPage = "dashboard",
  onNavigateToDashboard,
  onNavigateToVideos,
  onNavigateToNewsletter,
}: BrandHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <ChannelLogo size="sm" />
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <BrandButton
          variant="ghost"
          size="sm"
          active={currentPage === "dashboard"}
          to="/dashboard"
          onClick={onNavigateToDashboard}
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Dashboard
        </BrandButton>

        <BrandButton
          variant="ghost"
          size="sm"
          active={currentPage === "videos"}
          to="/videos"
          onClick={onNavigateToVideos}
        >
          <VideoIcon className="mr-2 h-4 w-4" />
          Videos
        </BrandButton>

        <BrandButton
          variant="ghost"
          size="sm"
          active={currentPage === "newsletter"}
          to="/newsletter"
          onClick={onNavigateToNewsletter}
        >
          <MailIcon className="mr-2 h-4 w-4" />
          Newsletter
        </BrandButton>
      </div>

      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
