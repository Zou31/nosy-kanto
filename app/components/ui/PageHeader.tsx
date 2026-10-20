import SectionTitle from "./SectionTitle";
import ActionButton from "./ActionButton";

type PageHeaderProps = {
  icon: string;
  title: string;
  description: string;
  buttonIcon: string;
  buttonLabel: string;
  onButtonClick: () => void;
};

export default function PageHeader({
  icon,
  title,
  description,
  buttonIcon,
  buttonLabel,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <SectionTitle icon={icon} title={title} />

      <p className="mt-3 text-neutral-600">
        {description}
      </p>

      <div className="mt-6">
        <ActionButton
          icon={buttonIcon}
          label={buttonLabel}
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
}
