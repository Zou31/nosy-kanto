import Modal from "./Modal";
import Button from "./Button";

type ConfirmModalProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "🗑️ Supprimer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="space-y-6">
        <p className="text-neutral-700">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel}>
            {cancelLabel}
          </Button>

          <Button onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
