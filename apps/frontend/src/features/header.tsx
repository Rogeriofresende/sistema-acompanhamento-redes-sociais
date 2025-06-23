import React from "react";
import { ThemeToggle } from "@/features/theme-toggle";
import { HomeIcon, VideoIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage: "dashboard" | "videos" | "newsletter";
  onNavigateToDashboard: () => void;
  onNavigateToVideos: () => void;
  onNavigateToNewsletter: () => void;
}

export function Header({
  currentPage,
  onNavigateToDashboard,
  onNavigateToVideos,
  onNavigateToNewsletter,
}: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Lancei Essa
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant={currentPage === "dashboard" ? "default" : "ghost"}
            onClick={onNavigateToDashboard}
            className="flex items-center space-x-2"
          >
            <HomeIcon className="h-4 w-4" />

            <span>Dashboard</span>
          </Button>
          <Button
            variant={currentPage === "videos" ? "default" : "ghost"}
            onClick={onNavigateToVideos}
            className="flex items-center space-x-2"
          >
            <VideoIcon className="h-4 w-4" />

            <span>Videos</span>
          </Button>
          <Button
            variant={currentPage === "newsletter" ? "default" : "ghost"}
            onClick={onNavigateToNewsletter}
            className="flex items-center space-x-2"
          >
            <MailIcon className="h-4 w-4" />

            <span>Newsletter</span>
          </Button>
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
