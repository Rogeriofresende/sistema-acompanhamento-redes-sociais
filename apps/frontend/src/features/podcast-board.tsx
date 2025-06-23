import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import KanbanColumn from "@/features/kanban-column";
import GuestCard from "@/features/guest-card";
import GuestDetailsDialog from "@/features/guest-details-dialog";
import AddGuestDialog from "@/features/add-guest-dialog";
import AddColumnDialog from "@/features/add-column-dialog";
import { useNavigate } from "react-router-dom";

interface Guest {
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
}

interface Column {
  id: string;
  title: string;
  color: string;
}

export default function PodcastBoard() {
  const navigate = useNavigate();

  // Default columns
  const defaultColumns: Column[] = [
    {
      id: "possible",
      title: "Possíveis convidados",
      color: "bg-gray-50 dark:bg-gray-900/20",
    },
    {
      id: "invited",
      title: "Convite feito",
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "accepted",
      title: "Convite aceito",
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: "scheduled",
      title: "Agendada gravação",
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: "form",
      title: "Formulário preenchido",
      color: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      id: "confirmed",
      title: "Confirmação no dia",
      color: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      id: "recorded",
      title: "Gravado",
      color: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      id: "files",
      title: "Arquivos enviados",
      color: "bg-teal-50 dark:bg-teal-900/20",
    },
  ];

  // Sample guests data
  const initialGuests: Guest[] = [
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@example.com",
      status: "possíveis convidados",
      tags: ["Especialista UX", "Design"],
      notes: "Convidada recomendada pelo Carlos.",
    },
    {
      id: "2",
      name: "Carlos Mendes",
      email: "carlos.mendes@example.com",
      avatarUrl: "https://github.com/furkanksl.png",
      status: "convite feito",
      date: "Enviado em 15/05/2023",
      tags: ["Desenvolvedor", "React"],
      notes: "Prefere gravar pela manhã.",
    },
    {
      id: "3",
      name: "Mariana Costa",
      email: "mariana.costa@example.com",
      avatarUrl: "https://github.com/yahyabedirhan.png",
      status: "agendada gravação",
      date: "20/06/2023 - 14:00",
      tags: ["Marketing", "SEO"],
      formCompleted: false,
      confirmationSent: false,
      notes: "Tem experiência com SEO para conteúdo de vídeo.",
    },
    {
      id: "4",
      name: "Pedro Alves",
      email: "pedro.alves@example.com",
      avatarUrl: "https://github.com/kdrnp.png",
      status: "confirmação no dia",
      date: "Hoje - 15:30",
      tags: ["Empreendedor", "Startup"],
      formCompleted: true,
      confirmationSent: false,
      notes: "Fundador da startup XYZ.",
    },
    {
      id: "5",
      name: "Juliana Martins",
      email: "juliana.martins@example.com",
      avatarUrl: "https://github.com/buyuktas18.png",
      status: "gravado",
      date: "Gravado em 10/05/2023",
      tags: ["Psicologia", "Carreira"],
      linkedin: "https://linkedin.com/in/julianamartins",
      instagram: "https://instagram.com/julianamartins",
      youtube: "https://youtube.com/julianamartins",
      website: "https://julianamartins.com",
      formCompleted: true,
      confirmationSent: true,
      recordingCompleted: true,
      filesSent: false,
      notes: "Excelente entrevista sobre psicologia nas organizações.",
    },
  ];

  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [addGuestDialogOpen, setAddGuestDialogOpen] = useState(false);

  // Function to get guests for a specific column
  const getGuestsForColumn = (columnTitle: string) => {
    return guests.filter(
      (guest) => guest.status.toLowerCase() === columnTitle.toLowerCase()
    );
  };

  // Function to handle adding a new guest
  const handleAddGuest = (
    guest: Omit<Guest, "id" | "status"> & { columnId: string }
  ) => {
    const column = columns.find((col) => col.id === guest.columnId);
    if (!column) return;

    const newGuest: Guest = {
      id: `guest-${Date.now()}`,
      status: column.title,
      name: guest.name,
      email: guest.email,
      tags: guest.tags,
      notes: guest.notes,
    };

    setGuests([...guests, newGuest]);
  };

  // Function to handle adding a new column
  const handleAddColumn = (columnName: string) => {
    const newColumn: Column = {
      id: `column-${Date.now()}`,
      title: columnName,
      color: "bg-gray-50 dark:bg-gray-900/20", // Default color
    };

    setColumns([...columns, newColumn]);
  };

  // Function to handle moving a guest forward in the process
  const handleMoveForward = (guestId: string) => {
    const guestIndex = guests.findIndex((g) => g.id === guestId);
    if (guestIndex === -1) return;

    const guest = guests[guestIndex];
    const currentColumnIndex = columns.findIndex(
      (col) => col.title.toLowerCase() === guest.status.toLowerCase()
    );

    if (currentColumnIndex < columns.length - 1) {
      const nextColumn = columns[currentColumnIndex + 1];
      const updatedGuest = { ...guest, status: nextColumn.title };

      // Update specific flags based on the column
      if (nextColumn.id === "form") {
        updatedGuest.formCompleted = true;
      } else if (nextColumn.id === "confirmed") {
        updatedGuest.confirmationSent = true;
      } else if (nextColumn.id === "recorded") {
        updatedGuest.recordingCompleted = true;
      } else if (nextColumn.id === "files") {
        updatedGuest.filesSent = true;
      }

      const updatedGuests = [...guests];
      updatedGuests[guestIndex] = updatedGuest;
      setGuests(updatedGuests);
    }
  };

  // Function to handle moving a guest backward in the process
  const handleMoveBackward = (guestId: string) => {
    const guestIndex = guests.findIndex((g) => g.id === guestId);
    if (guestIndex === -1) return;

    const guest = guests[guestIndex];
    const currentColumnIndex = columns.findIndex(
      (col) => col.title.toLowerCase() === guest.status.toLowerCase()
    );

    if (currentColumnIndex > 0) {
      const prevColumn = columns[currentColumnIndex - 1];
      const updatedGuest = { ...guest, status: prevColumn.title };

      // Update specific flags based on the column being moved from
      if (prevColumn.id === "invited") {
        updatedGuest.formCompleted = false;
      } else if (prevColumn.id === "accepted") {
        updatedGuest.confirmationSent = false;
      } else if (prevColumn.id === "scheduled") {
        updatedGuest.recordingCompleted = false;
      } else if (prevColumn.id === "recorded") {
        updatedGuest.filesSent = false;
      }

      const updatedGuests = [...guests];
      updatedGuests[guestIndex] = updatedGuest;
      setGuests(updatedGuests);
    }
  };

  // Function to handle deleting a guest
  const handleDeleteGuest = (guestId: string) => {
    setGuests(guests.filter((guest) => guest.id !== guestId));
  };

  // Function to handle viewing guest details
  const handleViewDetails = (guestId: string) => {
    const guest = guests.find((g) => g.id === guestId);
    if (guest) {
      setSelectedGuest(guest);
      setDetailsDialogOpen(true);
    }
  };

  // Function to handle sending email to a guest
  const handleSendEmail = (guestId: string) => {
    const guest = guests.find((g) => g.id === guestId);
    if (guest) {
      // Navigate to email composition page with guest data
      // For now, we'll just simulate this with a mailto link
      const subject = `Podcast - ${guest.name}`;
      const body = `Olá ${guest.name},\n\nGostaríamos de convidá-lo para participar do nosso podcast.\n\nAtenciosamente,\nEquipe do Podcast`;

      window.location.href = `mailto:${guest.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  // Function to handle viewing calendar for a guest
  const handleViewCalendar = (guestId: string) => {
    const guest = guests.find((g) => g.id === guestId);
    if (guest) {
      // Navigate to calendar page
      navigate("/calendar", { state: { guest } });
    }
  };

  // Function to handle sending form to a guest
  const handleSendForm = () => {
    if (!selectedGuest) return;

    const guestIndex = guests.findIndex((g) => g.id === selectedGuest.id);
    if (guestIndex === -1) return;

    const updatedGuest = { ...selectedGuest, formCompleted: true };
    const updatedGuests = [...guests];
    updatedGuests[guestIndex] = updatedGuest;

    setGuests(updatedGuests);
    setSelectedGuest(updatedGuest);
  };

  // Function to handle sending confirmation to a guest
  const handleSendConfirmation = () => {
    if (!selectedGuest) return;

    const guestIndex = guests.findIndex((g) => g.id === selectedGuest.id);
    if (guestIndex === -1) return;

    const updatedGuest = { ...selectedGuest, confirmationSent: true };
    const updatedGuests = [...guests];
    updatedGuests[guestIndex] = updatedGuest;

    setGuests(updatedGuests);
    setSelectedGuest(updatedGuest);
  };

  // Function to handle sending files to a guest
  const handleSendFiles = () => {
    if (!selectedGuest) return;

    const guestIndex = guests.findIndex((g) => g.id === selectedGuest.id);
    if (guestIndex === -1) return;

    const updatedGuest = { ...selectedGuest, filesSent: true };
    const updatedGuests = [...guests];
    updatedGuests[guestIndex] = updatedGuest;

    setGuests(updatedGuests);
    setSelectedGuest(updatedGuest);
  };

  // Function to open add guest dialog
  const handleOpenAddGuestDialog = () => {
    setAddGuestDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Convidados</h1>
        <div className="flex gap-2">
          <AddGuestDialog
            onAddGuest={handleAddGuest}
            columns={columns.map((col) => ({ id: col.id, title: col.title }))}
            open={addGuestDialogOpen}
            onOpenChange={setAddGuestDialogOpen}
          />

          <AddColumnDialog onAddColumn={handleAddColumn} />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 h-full">
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            count={getGuestsForColumn(column.title).length}
            onAddCard={handleOpenAddGuestDialog}
            color={column.color}
          >
            {getGuestsForColumn(column.title).map((guest, index) => (
              <GuestCard
                key={guest.id}
                id={guest.id}
                name={guest.name}
                email={guest.email}
                avatarUrl={guest.avatarUrl}
                status={guest.status}
                date={guest.date}
                tags={guest.tags}
                onMoveForward={() => handleMoveForward(guest.id)}
                onMoveBackward={() => handleMoveBackward(guest.id)}
                onSendEmail={() => handleSendEmail(guest.id)}
                onViewDetails={() => handleViewDetails(guest.id)}
                onDelete={() => handleDeleteGuest(guest.id)}
                onViewCalendar={() => handleViewCalendar(guest.id)}
              />
            ))}
          </KanbanColumn>
        ))}
      </div>

      {selectedGuest && (
        <GuestDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          guest={selectedGuest}
          onSendEmail={() => handleSendEmail(selectedGuest.id)}
          onSendForm={!selectedGuest.formCompleted ? handleSendForm : undefined}
          onSendConfirmation={
            selectedGuest.formCompleted && !selectedGuest.confirmationSent
              ? handleSendConfirmation
              : undefined
          }
          onSendFiles={
            selectedGuest.recordingCompleted && !selectedGuest.filesSent
              ? handleSendFiles
              : undefined
          }
        />
      )}
    </div>
  );
}
