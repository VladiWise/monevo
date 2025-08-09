"use client";

import { useTransition, useState } from "react";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/Button";
import { Input } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { login } from "@/auth-actions/login";

export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setsuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "monevo@example.com",
      password: "123456",
    },
  });

  const {
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(undefined);
    setsuccess(undefined);

    startTransition(() => {
      login(values).then((response) => {
        setError(response.error);
        setsuccess(response.success);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLable="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <FormProvider
        form={form}
        onSubmit={onSubmit}
        className="flex flex-col gap-3"
      >
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
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          isPending={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </FormProvider>
    </CardWrapper>
  );
}
