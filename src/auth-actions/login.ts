"use server";

import { AuthError } from "next-auth";


import { z } from "zod";
import { signIn } from "@/auth";
// import { generateVerificationToken } from "@/libs/tokens";
import { getUserByEmail } from "@/services/UserService";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/paths";

export const login = async (values: z.infer<typeof LoginSchema>) => {

  const validatedFields = await LoginSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }


  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }


  // if (!existingUser.emailVerified) {
  //   await generateVerificationToken(existingUser.email);


  //   return { success: "Confirmation email sent" };
  // }



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