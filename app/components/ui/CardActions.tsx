import Button from "./Button";

type CardActionsProps = {
  onEdit?: () => void;
  onNext?: () => void;
  onDelete?: () => void;
};

export default function CardActions({
  onEdit,
  onNext,
  onDelete,
}: CardActionsProps) {
  return (
    <div className="mt-6 flex gap-2 border-t pt-4">
      {onEdit && (
        <Button onClick={onEdit}>
          ✏️ Modifier
        </Button>
      )}

      {onNext && (
        <Button onClick={onNext}>
          ➡️ Étape suivante
        </Button>
      )}

      {onDelete && (
        <Button onClick={onDelete}>
          🗑️ Supprimer
        </Button>
      )}
    </div>
  );
}
