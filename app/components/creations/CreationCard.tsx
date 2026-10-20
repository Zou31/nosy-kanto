import { CreationProject } from "../../types";
import { CREATION_STATUS } from "../../constants";

type Props = {
  project: CreationProject;
};

export default function CreationCard({ project }: Props) {
  const status = CREATION_STATUS[project.status];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">
        {project.name}
      </h3>

      <p className="mt-1 text-neutral-600">
        {project.description}
      </p>

      <p className="mt-2 text-sm">
        Collection : <strong>{project.collection}</strong>
      </p>

      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-sm ${status.color}`}
      >
        {status.label}
      </span>
    </div>
  );
}
