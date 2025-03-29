"use client"; // Error boundaries must be Client Components

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-full min-h-fit w-full overflow-x-hidden">
        <h2>{error.message || "Something went wrong!"}</h2>
        <button
          onClick={async () => {
            window.location.reload();
          }}
        >
          Try again
        </button>
      </main>
    </>
  );
}
