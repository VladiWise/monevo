"use client";

import { signIn } from "next-auth/react";

import { FaGithub, FaYandex } from "react-icons/fa";
import { Button } from "../Button";
import { DEFAULT_LOGIN_REDIRECT } from "@/paths";

export function Social() {
  function onClick(provider: "github" | "yandex") {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }
  return (
    <>
      <div className="flex items-center ">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <section className="flex items-center w-full gap-x-2">
        <Button
          variant="simple"
          className="w-full flex items-center gap-x-2"
          onClick={() => onClick("yandex")}
        >
          <FaYandex size={24} color="red" /> Sign in with Yandex ID
        </Button>
      </section>
      <section className="flex items-center w-full gap-x-2">
        <Button
          variant="simple"
          className="w-full flex items-center gap-x-2"
          onClick={() => onClick("github")}
        >
          <FaGithub size={24} color="black" /> Sign in with Github
        </Button>
      </section>
    </>
  );
}
