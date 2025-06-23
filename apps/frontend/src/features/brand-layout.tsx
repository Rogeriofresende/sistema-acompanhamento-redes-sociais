import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { BrandHeader } from "@/features/brand-header";
import { ChannelLogo } from "@/features/channel-logo";
import { BrandButton } from "@/features/brand-button";
import { ThemeToggle } from "@/features/theme-toggle";
import {
  HomeIcon,
  VideoIcon,
  MailIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  UsersIcon,
  ChevronDownIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface BrandLayoutProps {
  currentPage?:
    | "dashboard"
    | "videos"
    | "newsletter"
    | "settings"
    | "profile"
    | "podcast-guests"
    | "documentation";
  onNavigateToDashboard?: () => void;
  onNavigateToVideos?: () => void;
  onNavigateToNewsletter?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToProfile?: () => void;
  onLogout?: () => void;
}

export function BrandLayout({
  currentPage = "dashboard",
  onNavigateToDashboard,
  onNavigateToVideos,
  onNavigateToNewsletter,
  onNavigateToSettings,
  onNavigateToProfile,
  onLogout,
}: BrandLayoutProps) {
  console.log('🔷 BrandLayout RENDERIZADO - currentPage:', currentPage);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [podcastSubmenuOpen, setPodcastSubmenuOpen] = useState(
    currentPage === "podcast-guests"
  );
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigateToDashboard = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    } else {
      navigate("/dashboard");
    }
  };

  const handleNavigateToVideos = () => {
    if (onNavigateToVideos) {
      onNavigateToVideos();
    } else {
      navigate("/videos");
    }
  };

  const handleNavigateToNewsletter = () => {
    if (onNavigateToNewsletter) {
      onNavigateToNewsletter();
    } else {
      navigate("/newsletter");
    }
  };

  const handleNavigateToSettings = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings();
    } else {
      navigate("/settings");
    }
  };

  const handleNavigateToProfile = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    } else {
      navigate("/profile");
    }
  };

  const handleLogout = () => {
    logout();
    
    if (onLogout) {
      onLogout();
    }
    
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const togglePodcastSubmenu = () => {
    setPodcastSubmenuOpen(!podcastSubmenuOpen);
  };

  // YouTube API Integration (hidden)
  // This code would be used to connect to the YouTube API
  const initYouTubeAPI = () => {
    // Initialize YouTube API client
    // const apiKey = process.env.YOUTUBE_API_KEY;
    // const clientId = process.env.YOUTUBE_CLIENT_ID;
    // ...
  }; // Beehiiv API Integration (hidden)
  // This code would be used to connect to the Beehiiv API
  const initBeehiivAPI = () => {
    // Initialize Beehiiv API client
    // const apiKey = process.env.BEEHIIV_API_KEY;
    // const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    // ...
  }; // Call API initializations (would be in useEffect in a real app)
  React.useEffect(() => {
    // initYouTubeAPI();
    // initBeehiivAPI();
  }, []);
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Sidebar header - Now with logo only */}
        <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center flex-1 overflow-hidden transition-all duration-300 ease-in-out">
            <ChannelLogo size="sm" />

            <span
              className={cn(
                "ml-2 font-semibold text-lg transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}
            >
              Lancei Essa
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col flex-1 overflow-y-auto py-4">
          <nav className="flex-1 px-2 space-y-1">
            <BrandButton
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center px-2" : ""
              )}
              active={currentPage === "dashboard"}
              to="/dashboard"
              onClick={handleNavigateToDashboard}
            >
              <HomeIcon className="h-5 w-5 min-w-5" />

              <span
                className={cn(
                  "ml-3 transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Dashboard
              </span>
            </BrandButton>
            <BrandButton
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center px-2" : ""
              )}
              active={currentPage === "videos"}
              to="/videos"
              onClick={handleNavigateToVideos}
            >
              <VideoIcon className="h-5 w-5 min-w-5" />

              <span
                className={cn(
                  "ml-3 transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Vídeos
              </span>
            </BrandButton>
            <BrandButton
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center px-2" : ""
              )}
              active={currentPage === "newsletter"}
              to="/newsletter"
              onClick={handleNavigateToNewsletter}
            >
              <MailIcon className="h-5 w-5 min-w-5" />

              <span
                className={cn(
                  "ml-3 transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Newsletter
              </span>
            </BrandButton>

            {/* Podcast Guests with submenu */}
            <div className="space-y-1">
              <BrandButton
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "justify-center px-2" : "justify-between"
                )}
                active={currentPage === "podcast-guests"}
                to={podcastSubmenuOpen ? undefined : "/podcast-guests"}
                onClick={!sidebarCollapsed ? togglePodcastSubmenu : undefined}
              >
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 min-w-5" />

                  <span
                    className={cn(
                      "ml-3 transition-all duration-300 ease-in-out",
                      sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                    )}
                  >
                    Gravação PodCast
                  </span>
                </div>
                {!sidebarCollapsed && (
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 transition-transform",
                      podcastSubmenuOpen ? "transform rotate-180" : ""
                    )}
                  />
                )}
              </BrandButton>

              {podcastSubmenuOpen && !sidebarCollapsed && (
                <div className="pl-10 space-y-1">
                  <BrandButton
                    variant="ghost"
                    className="w-full justify-start text-sm py-1"
                    active={currentPage === "podcast-guests"}
                    to="/podcast-guests"
                  >
                    Kanban Board
                  </BrandButton>
                  <BrandButton
                    variant="ghost"
                    className="w-full justify-start text-sm py-1"
                    to="/podcast-guests/people"
                  >
                    People
                  </BrandButton>
                </div>
              )}
            </div>
          </nav>

          {/* Theme toggle moved above profile section */}
          <div
            className={cn(
              "px-2 mb-4 transition-all duration-300 ease-in-out",
              sidebarCollapsed ? "flex justify-center" : ""
            )}
          >
            <div
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center" : "w-full",
                "bg-gray-50 dark:bg-gray-900"
              )}
            >
              <ThemeToggle />

              <span
                className={cn(
                  "ml-3 text-sm font-medium transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Alternar tema
              </span>
            </div>
          </div>

          <div className="px-2 space-y-1 mt-auto">
            <BrandButton
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center px-2" : ""
              )}
              active={currentPage === "profile"}
              to="/profile"
              onClick={handleNavigateToProfile}
            >
              <UserIcon className="h-5 w-5 min-w-5" />

              <span
                className={cn(
                  "ml-3 transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Perfil
              </span>
            </BrandButton>
            <BrandButton
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center px-2" : ""
              )}
              active={currentPage === "settings"}
              to="/settings"
              onClick={handleNavigateToSettings}
            >
              <SettingsIcon className="h-5 w-5 min-w-5" />

              <span
                className={cn(
                  "ml-3 transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Configurações
              </span>
            </BrandButton>
            <BrandButton
              variant="ghost"
              className={cn(
                "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-all duration-300 ease-in-out",
                sidebarCollapsed ? "justify-center px-2" : ""
              )}
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5 min-w-5" />

              <span
                className={cn(
                  "ml-3 transition-all duration-300 ease-in-out",
                  sidebarCollapsed ? "opacity-0 w-0 ml-0" : "opacity-100"
                )}
              >
                Sair
              </span>
            </BrandButton>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <ChannelLogo size="sm" />

            <span className="ml-2 font-semibold text-lg">Lancei Essa</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-950 rounded-lg w-11/12 max-w-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="space-y-2">
                <BrandButton
                  variant="ghost"
                  className="w-full justify-start"
                  active={currentPage === "dashboard"}
                  to="/dashboard"
                  onClick={() => {
                    handleNavigateToDashboard();
                    setMobileMenuOpen(false);
                  }}
                >
                  <HomeIcon className="h-5 w-5 mr-3" />
                  Dashboard
                </BrandButton>
                <BrandButton
                  variant="ghost"
                  className="w-full justify-start"
                  active={currentPage === "videos"}
                  to="/videos"
                  onClick={() => {
                    handleNavigateToVideos();
                    setMobileMenuOpen(false);
                  }}
                >
                  <VideoIcon className="h-5 w-5 mr-3" />
                  Vídeos
                </BrandButton>
                <BrandButton
                  variant="ghost"
                  className="w-full justify-start"
                  active={currentPage === "newsletter"}
                  to="/newsletter"
                  onClick={() => {
                    handleNavigateToNewsletter();
                    setMobileMenuOpen(false);
                  }}
                >
                  <MailIcon className="h-5 w-5 mr-3" />
                  Newsletter
                </BrandButton>

                {/* Podcast Guests with submenu in mobile */}
                <div className="space-y-1">
                  <button
                    onClick={() => setPodcastSubmenuOpen(!podcastSubmenuOpen)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
                      currentPage === "podcast-guests"
                        ? "bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <div className="flex items-center">
                      <UsersIcon className="h-5 w-5 mr-3" />

                      <span>Gravação PodCast</span>
                    </div>
                    <ChevronDownIcon
                      className={cn(
                        "h-4 w-4 transition-transform",
                        podcastSubmenuOpen ? "transform rotate-180" : ""
                      )}
                    />
                  </button>

                  {podcastSubmenuOpen && (
                    <div className="pl-10 space-y-1">
                      <BrandButton
                        variant="ghost"
                        className="w-full justify-start text-sm py-1"
                        active={currentPage === "podcast-guests"}
                        to="/podcast-guests"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Kanban Board
                      </BrandButton>
                      <BrandButton
                        variant="ghost"
                        className="w-full justify-start text-sm py-1"
                        to="/podcast-guests/people"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        People
                      </BrandButton>
                    </div>
                  )}
                </div>

                <BrandButton
                  variant="ghost"
                  className="w-full justify-start"
                  active={currentPage === "profile"}
                  to="/profile"
                  onClick={() => {
                    handleNavigateToProfile();
                    setMobileMenuOpen(false);
                  }}
                >
                  <UserIcon className="h-5 w-5 mr-3" />
                  Perfil
                </BrandButton>
                <BrandButton
                  variant="ghost"
                  className="w-full justify-start"
                  active={currentPage === "settings"}
                  to="/settings"
                  onClick={() => {
                    handleNavigateToSettings();
                    setMobileMenuOpen(false);
                  }}
                >
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  Configurações
                </BrandButton>
                <BrandButton
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  Sair
                </BrandButton>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Mobile header spacer */}
        <div className="h-16 lg:hidden" />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 max-w-full">
          {console.log('BrandLayout renderizando Outlet')}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Default export for backward compatibility
export default BrandLayout;
