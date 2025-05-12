export const getErrorMessage = (error: unknown, userMessage = "Something went wrong"): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "error" in error) {
    message = String(error.error);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = userMessage;
  }

  return message;
};
