import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
  message: string | undefined;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-600 p-3 rounded-xl flex items-center gap-x-2 w-full">
      <BsExclamationTriangle size={24} />
      <p className="flex-1">{message}</p>
    </div>
  );
}
