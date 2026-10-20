import Button from "./Button";

type ActionButtonProps = {
  icon: string;
  label: string;
  onClick: () => void;
};

export default function ActionButton({
  icon,
  label,
  onClick,
}: ActionButtonProps) {
  return (
    <Button onClick={onClick}>
      {icon} {label}
    </Button>
  );
}
