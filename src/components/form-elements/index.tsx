import { UseFormRegister } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register?: UseFormRegister<any>;
  name: string;
}

export function Select({
  register,
  name,
  value,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...(register && { ...register(name) })}
      className="bg-white p-3 w-full rounded-xl text-gray-800 hover:border-gray-400 border-gray-100 border-2"
      {...props}
    >
        {children}

    </select>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any> ; // Updated to match react-hook-form's register return type
  name: string; // Overriding name to make it required
}

export function Input({ register, name, value, ...props } : InputProps) {
  return (
    <input
      className="p-3 w-full rounded-xl text-gray-800 hover:border-gray-400 border-gray-100 border-2"
      defaultValue={value}
      {...(register && { ...register(name) })}
      {...props}
    />
  );
}
