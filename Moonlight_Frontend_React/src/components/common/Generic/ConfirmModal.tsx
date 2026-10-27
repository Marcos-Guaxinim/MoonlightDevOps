import { Button } from "./Button/Button";

type ConfirmModalProps = {
  icon: React.ReactNode;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ icon, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-base-soft border border-white/10 rounded-xl p-8 w-[340px] flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          {icon}
          <p className="text-white font-medium">{title}</p>
          <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
        </div>

        <div className="flex gap-2 justify-end">
          <Button id="modal-cancel-btn" variant="secondary" onClick={onCancel} className="px-4 py-2 rounded-md border border-white/15 text-slate-400 text-sm hover:bg-white/5 hover:text-white transition-all">
            Cancelar
          </Button>
          <Button id="modal-confirm-btn" variant="danger" onClick={onConfirm} className="px-4 py-2 rounded-md text-sm font-medium">
            Confirmar
          </Button>
        </div>

      </div>
    </div>
  );
}
