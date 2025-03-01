import { UseFormRegister } from "react-hook-form";
import { useFormContext } from "@/components/FormContext";
import clsx from "clsx";

const className =
  "p-3 w-full rounded-xl bg-gray-100 dark:bg-darkMain font-medium text-base sm:font-bold  text-gray-700 dark:text-darkGray hover:border-gray-400 border-gray-100 dark:border-darkMain border-2";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register?: UseFormRegister<any>;
  name: string;
}

export function Select({ name, required, children, ...props }: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <select
      {...register(name, { required: required })}
      className={clsx(className, errors && errors[name] && "border-primary")}
      {...props}
    >
      {children}
    </select>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input({ name, value, required, ...props }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <input
      className={clsx(className, errors && errors[name] && "border-primary")}
      defaultValue={value}
      {...register(name, { required: required })}
      {...props}
    />
  );
}
