import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  MailIcon,
  MoreHorizontalIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GuestCardProps {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  status: string;
  date?: string;
  tags?: string[];
  onMoveForward?: () => void;
  onMoveBackward?: () => void;
  onSendEmail?: () => void;
  onViewDetails?: () => void;
  onDelete?: () => void;
  onViewCalendar?: () => void;
}

export default function GuestCard({
  id,
  name,
  email,
  avatarUrl,
  status,
  date,
  tags = [],
  onMoveForward,
  onMoveBackward,
  onSendEmail,
  onViewDetails,
  onDelete,
  onViewCalendar,
}: GuestCardProps) {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      "possíveis convidados":
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      "convite feito":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "convite aceito":
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "agendada gravação":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "formulário preenchido":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      "confirmação no dia":
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      gravado:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      "arquivos enviados":
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      "agendamento de posts":
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      "criação de títulos":
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      postado:
        "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    };

    return (
      statusMap[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger if the click is directly on the card or its content
    // and not on a button or dropdown
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest("button") &&
      !e.target.closest('[role="menuitem"]') &&
      onViewDetails
    ) {
      onViewDetails();
    }
  };

  return (
    <Card
      className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={name} />

              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{name}</h3>
              {email && (
                <p className="text-xs text-muted-foreground">{email}</p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />

                <span className="sr-only">Abrir menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {onViewDetails && (
                <DropdownMenuItem onClick={onViewDetails}>
                  Ver detalhes
                </DropdownMenuItem>
              )}
              {onSendEmail && (
                <DropdownMenuItem onClick={onSendEmail}>
                  Enviar e-mail
                </DropdownMenuItem>
              )}
              {onMoveForward && (
                <DropdownMenuItem onClick={onMoveForward}>
                  Mover para próxima etapa
                </DropdownMenuItem>
              )}
              {onMoveBackward && (
                <DropdownMenuItem onClick={onMoveBackward}>
                  Mover para etapa anterior
                </DropdownMenuItem>
              )}
              {onViewCalendar && status === "agendada gravação" && (
                <DropdownMenuItem onClick={onViewCalendar}>
                  Ver calendário
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />

              {onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600 dark:text-red-400"
                >
                  Excluir
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 space-y-2">
          {date && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />

              <span>{date}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          {onMoveBackward && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onMoveBackward}
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />

              <span className="sr-only">Mover para trás</span>
            </Button>
          )}
          {onSendEmail && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onSendEmail}
            >
              <MailIcon className="h-4 w-4" />

              <span className="sr-only">Enviar e-mail</span>
            </Button>
          )}
          {status === "confirmação no dia" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-green-600"
                onClick={onMoveForward}
              >
                <CheckIcon className="h-4 w-4" />

                <span className="sr-only">Confirmar</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600"
                onClick={onDelete}
              >
                <XIcon className="h-4 w-4" />

                <span className="sr-only">Cancelar</span>
              </Button>
            </>
          )}
          {status === "agendada gravação" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onViewCalendar}
            >
              <ClockIcon className="h-4 w-4" />

              <span className="sr-only">Ver calendário</span>
            </Button>
          )}
          {onMoveForward && status !== "confirmação no dia" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onMoveForward}
            >
              <ArrowRightIcon className="h-4 w-4" />

              <span className="sr-only">Mover para frente</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
