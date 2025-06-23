import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegisterGuestForm from "@/features/register-guest-form";

export default function RegisterGuestDialog({
  trigger,
  open,
  onOpenChange,
  onSubmit,
}) {
  const handleFormSubmit = (data) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Cadastrar Novo Convidado
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do novo convidado para o podcast.
          </DialogDescription>
        </DialogHeader>
        <RegisterGuestForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
