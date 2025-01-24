import { BsCheckCircle } from "react-icons/bs"; 

interface FormSuccessProps {
  message: string | undefined;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-green-100 text-green-600 p-3 rounded-xl flex items-center gap-x-2 ">
      <BsCheckCircle size={24} />
      <p>{message}</p>
    </div>
  );
}
