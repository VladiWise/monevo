"use client";

import { useTransition, useState } from "react";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/Button";
import { Input } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { register } from "@/auth-actions/register";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setsuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError(undefined);
    setsuccess(undefined);

    startTransition(async () => {
      const response = await register(values);
      setError(response.error);
      setsuccess(response.success);
    });
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLable="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <FormProvider
        form={form}
        onSubmit={onSubmit}
        className="flex flex-col gap-3"
      >
        <section className="flex flex-col gap-1 text-darkGray">
          <label>Name</label>
          <Input name="name" disabled={isPending} />
          {errors.name && (
            <p className="text-primary text-sm">{errors.name.message}</p>
          )}
        </section>

        <section className="flex flex-col gap-1 text-darkGray">
          <label>Email</label>
          <Input name="email" disabled={isPending} />
          {errors.email && (
            <p className="text-primary text-sm">{errors.email.message}</p>
          )}
        </section>

        <section className="flex flex-col gap-1 text-darkGray">
          <label>Password</label>
          <Input name="password" type="password" disabled={isPending} />

          {errors.password && (
            <p className="text-primary text-sm">{errors.password.message}</p>
          )}
        </section>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          isPending={isPending}
        >
          {isPending ? "Loading..." : "Register"}
        </Button>
      </FormProvider>
    </CardWrapper>
  );
}
