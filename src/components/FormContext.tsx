import React, { createContext, useContext } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface FormProviderProps {
  className?: string;
  children: React.ReactNode;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
}

const FormContext = createContext<UseFormReturn<FieldValues> | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({
  className,
  children,
  form,
  onSubmit,
}: FormProviderProps) => {
  return (
    <FormContext.Provider value={form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
