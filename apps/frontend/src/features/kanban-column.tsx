import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  title: string;
  count: number;
  children: React.ReactNode;
  onAddCard?: () => void;
  color?: string;
}

export default function KanbanColumn({
  title,
  count,
  children,
  onAddCard,
  color = "bg-gray-100 dark:bg-gray-800",
}: KanbanColumnProps) {
  return (
    <Card className="flex flex-col h-full min-w-[280px] max-w-[280px] shadow-sm">
      <CardHeader className={cn("py-3 px-3", color)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            {title}
            <span className="ml-2 bg-white dark:bg-gray-700 text-xs rounded-full px-2 py-0.5">
              {count}
            </span>
          </CardTitle>
          {onAddCard && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onAddCard}
            >
              <PlusIcon className="h-4 w-4" />

              <span className="sr-only">Adicionar convidado</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-2">{children}</div>
      </CardContent>
    </Card>
  );
}
