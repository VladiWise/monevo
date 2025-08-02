"use client";

import { useState } from "react";
import { Loader } from "../Loader";
import { signIn } from "next-auth/react";
import { YandexIcon } from "@/components/SvgIcons";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/Button";
import { DEFAULT_LOGIN_REDIRECT } from "@/paths";

export function Social() {
  const [loading, setLoading] = useState(false);

  function onClick(provider: "google" | "yandex") {
    setLoading(true);
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    }).catch(() => setLoading(false));
  }
  return (
    <>
      {loading && (
        <div className="flex absolute inset-0 items-center justify-center backdrop-blur-sm">
          <Loader />
        </div>
      )}
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-darkGray"></div>
        <span className="mx-4 text-darkGray text-sm">or</span>
        <div className="flex-grow border-t border-gray-300 dark:border-darkGray"></div>
      </div>
      <Button variant="darkMain" onClick={() => onClick("yandex")}>
        <YandexIcon size={24} />{" "}
        <span className="hidden xs:block">Sign in with Yandex ID</span>
      </Button>

      <Button variant="darkMain" onClick={() => onClick("google")}>
        <FaGoogle size={24} color="white" />{" "}
        <span className="hidden xs:block">Sign in with Google</span>
      </Button>
    </>
  );
}
