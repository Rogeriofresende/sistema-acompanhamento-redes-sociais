import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MailIcon,
  LinkIcon,
  GlobeIcon,
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GuestDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest: {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string;
    status: string;
    date?: string;
    tags?: string[];
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
    notes?: string;
    formCompleted?: boolean;
    confirmationSent?: boolean;
    recordingCompleted?: boolean;
    filesSent?: boolean;
  };
  onSendEmail?: () => void;
  onSendForm?: () => void;
  onSendConfirmation?: () => void;
  onSendFiles?: () => void;
}

export default function GuestDetailsDialog({
  open,
  onOpenChange,
  guest,
  onSendEmail,
  onSendForm,
  onSendConfirmation,
  onSendFiles,
}: GuestDetailsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status: string) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Detalhes do Convidado</span>
            <Badge className={getStatusBadge(guest.status)}>
              {guest.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Informações completas e ações para este convidado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={guest.avatarUrl} alt={guest.name} />

            <AvatarFallback className="text-lg">
              {getInitials(guest.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{guest.name}</h2>
            {guest.email && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MailIcon className="h-4 w-4 mr-1" />

                <span>{guest.email}</span>
              </div>
            )}
            {guest.date && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />

                <span>{guest.date}</span>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {guest.tags && guest.tags.length > 0 ? (
                    guest.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Nenhuma tag adicionada
                    </span>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Status do Processo</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Formulário preenchido</span>
                    <Badge
                      variant={guest.formCompleted ? "default" : "outline"}
                      className={
                        guest.formCompleted
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : ""
                      }
                    >
                      {guest.formCompleted ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confirmação enviada</span>
                    <Badge
                      variant={guest.confirmationSent ? "default" : "outline"}
                      className={
                        guest.confirmationSent
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : ""
                      }
                    >
                      {guest.confirmationSent ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gravação concluída</span>
                    <Badge
                      variant={guest.recordingCompleted ? "default" : "outline"}
                      className={
                        guest.recordingCompleted
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : ""
                      }
                    >
                      {guest.recordingCompleted ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Arquivos enviados</span>
                    <Badge
                      variant={guest.filesSent ? "default" : "outline"}
                      className={
                        guest.filesSent
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : ""
                      }
                    >
                      {guest.filesSent ? "Sim" : "Não"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="space-y-3">
              {guest.linkedin && (
                <div className="flex items-center">
                  <LinkedinIcon className="h-4 w-4 mr-2 text-blue-600" />

                  <a
                    href={guest.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {guest.linkedin}
                  </a>
                </div>
              )}

              {guest.instagram && (
                <div className="flex items-center">
                  <InstagramIcon className="h-4 w-4 mr-2 text-pink-600" />

                  <a
                    href={guest.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {guest.instagram}
                  </a>
                </div>
              )}

              {guest.youtube && (
                <div className="flex items-center">
                  <YoutubeIcon className="h-4 w-4 mr-2 text-red-600" />

                  <a
                    href={guest.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {guest.youtube}
                  </a>
                </div>
              )}

              {guest.tiktok && (
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <a
                    href={guest.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {guest.tiktok}
                  </a>
                </div>
              )}

              {guest.website && (
                <div className="flex items-center">
                  <GlobeIcon className="h-4 w-4 mr-2 text-gray-600" />

                  <a
                    href={guest.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {guest.website}
                  </a>
                </div>
              )}

              {!guest.linkedin &&
                !guest.instagram &&
                !guest.youtube &&
                !guest.tiktok &&
                !guest.website && (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma rede social adicionada
                  </p>
                )}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="space-y-4">
              {guest.notes ? (
                <p className="text-sm">{guest.notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma nota adicionada
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-wrap gap-2">
          {onSendEmail && (
            <Button variant="outline" onClick={onSendEmail}>
              <MailIcon className="h-4 w-4 mr-2" />
              Enviar E-mail
            </Button>
          )}

          {onSendForm && !guest.formCompleted && (
            <Button variant="outline" onClick={onSendForm}>
              <LinkIcon className="h-4 w-4 mr-2" />
              Enviar Formulário
            </Button>
          )}

          {onSendConfirmation &&
            guest.formCompleted &&
            !guest.confirmationSent && (
              <Button variant="outline" onClick={onSendConfirmation}>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Enviar Confirmação
              </Button>
            )}

          {onSendFiles && guest.recordingCompleted && !guest.filesSent && (
            <Button variant="outline" onClick={onSendFiles}>
              <LinkIcon className="h-4 w-4 mr-2" />
              Enviar Arquivos
            </Button>
          )}

          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
