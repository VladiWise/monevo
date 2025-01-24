"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../Button";

export function Social() {
  return (
    <section className="flex items-center w-full gap-x-2">
      <Button variant="simple" className={"w-full"} onClick={() => {}}>
        <FcGoogle size={24} />
      </Button>

      <Button variant="simple" className={"w-full"} onClick={() => {}}>
        <FaGithub size={24} color="black" />
      </Button>
    </section>
  );
}
