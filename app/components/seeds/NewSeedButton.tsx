import Button from "../ui/Button";

type NewSeedButtonProps = {
  onClick: () => void;
};

export default function NewSeedButton({ onClick }: NewSeedButtonProps) {
  return (
    <Button onClick={onClick}>
      ➕ Nouvelle Graine
    </Button>
  );
}
