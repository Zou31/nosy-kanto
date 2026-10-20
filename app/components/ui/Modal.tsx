

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-6">
      <div className="my-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#4A2B1A]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl font-bold"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
