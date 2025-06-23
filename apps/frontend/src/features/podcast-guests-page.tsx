import React from "react";
import { Link } from "react-router-dom";
import PodcastBoard from "@/features/podcast-board";
import { Button } from "@/components/ui/button";
import { UsersIcon, DownloadIcon, UploadIcon } from "lucide-react";

export default function PodcastGuestsPage() {
  const handleExportData = () => {
    alert("Exporting guest data...");
  };

  const handleImportData = () => {
    alert("Importing guest data...");
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <UsersIcon className="h-6 w-6 mr-2 text-violet-600 dark:text-violet-400" />

          <h1 className="text-2xl font-bold">Podcast Guests</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/podcast-guests/people">
            <Button variant="outline" className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              View People
            </Button>
          </Link>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleImportData}
          >
            <UploadIcon className="h-4 w-4" />
            Import
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExportData}
          >
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-160px)]">
        <PodcastBoard />
      </div>
    </div>
  );
}
