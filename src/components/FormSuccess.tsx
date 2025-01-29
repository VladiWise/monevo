import { BsCheckCircle } from "react-icons/bs";

interface FormSuccessProps {
  message: string | undefined;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-green-100 text-green-600 p-3 rounded-xl flex items-center gap-x-2 w-full">
      <BsCheckCircle size={24} />
      <p className="flex-1">{message}</p>
    </div>
  );
}
