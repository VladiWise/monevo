"use server";

import { AuthError } from "next-auth";


import { z } from "zod";
import { signIn } from "@/auth";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/paths";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = await LoginSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }


  const { email, password } = validatedFields.data;


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });

  } catch (error: unknown) {

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }

  return { success: "Logged in successfully" };

};