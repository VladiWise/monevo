"use client";

import { signIn } from "next-auth/react";
import { YandexIcon } from "@/components/SvgIcons";

import { SiVk } from "react-icons/si";
import { Button } from "@/components/Button";
import { DEFAULT_LOGIN_REDIRECT } from "@/paths";

export function Social() {
  function onClick(provider: "vk" | "yandex") {
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
      <Button variant="secondary" onClick={() => onClick("yandex")}>
        <YandexIcon size={24} /> Sign in with Yandex ID
      </Button>

      <Button variant="custom" onClick={() => onClick("vk")}>
        <SiVk size={24} color="white" /> Sign in with VK ID
      </Button>
    </>
  );
}
