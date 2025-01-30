"use server";

import { z } from "zod";
import api from "@/libs/fetch";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/libs/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  const validatedFields = await RegisterSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const response = await api.post("/users", values);

    await generateVerificationToken(values.email);

    console.log("response", response);
    return { success: response.message };
  } catch (error: unknown) {

    if (error instanceof Error) {
      return { error: error.message };
    }

    throw error;
  }

};