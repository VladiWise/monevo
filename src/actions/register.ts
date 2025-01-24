"use server";

import { z } from "zod";
import api from "@/libs/fetch";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = await RegisterSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const response = await api.post("/users", values);

    console.log("response", response);
    return { success: response.message };
  } catch (error: any) {
    console.log("error!!!!", error);


    return { error: error.message };
  }





};