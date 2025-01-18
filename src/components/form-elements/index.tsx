import { UseFormRegister } from "react-hook-form";

const className =
  "p-3 w-full rounded-xl bg-gray-100 font-bold text-gray-500 hover:border-gray-400 border-gray-100 border-2";

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
      className={className}
      {...props}
    >
      {children}
    </select>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>; // Updated to match react-hook-form's register return type
  name: string; // Overriding name to make it required
}

export function Input({ register, name, value, ...props }: InputProps) {
  return (
    <input
      className={className}
      defaultValue={value}
      {...(register && { ...register(name) })}
      {...props}
    />
  );
}
