'use client';

import { ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck
              aria-hidden="true"
              className="h-5 w-5 text-[color:var(--color-accent-primary)]"
            />
            Revisar lançamento
          </DialogTitle>
          <DialogDescription>
            Confirme a publicação das mudanças no produto. Este passo garante visibilidade e rastreabilidade.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-[color:var(--color-text-subtle)]">
          <p>
            Este diálogo demonstra os componentes do <strong>shadcn/ui</strong> sobre Radix UI, preservando navegação por teclado e foco visível.
          </p>
          <p>
            Utilize o botão de confirmar para prosseguir ou pressione <kbd>Esc</kbd> para fechar rapidamente.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogExample;
