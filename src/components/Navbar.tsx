"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

import Link from "next/link";

import clsx from "clsx";
import { GoHomeFill } from "react-icons/go";
import { BsFillBarChartFill } from "react-icons/bs";
import { IoIosBrowsers } from "react-icons/io";
import { FaBox } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactElement;
};

const INACTIVE_ICON_COLOR = "#6b7280";
const ACTIVE_ICON_COLOR = "#EF3226";

const ICON_SIZE = 24;

const navLinks: NavLink[] = [
  {
    href: "/client/home",
    label: "Home",
    icon: <GoHomeFill size={ICON_SIZE} />,
  },
  {
    href: "/client/charts",
    label: "Charts",
    icon: <BsFillBarChartFill size={ICON_SIZE} />,
  },
  {
    href: "/client/services",
    label: "Services",
    icon: <IoIosBrowsers size={ICON_SIZE} />,
  },
  {
    href: "/client/bankAccounts",
    label: "Accounts",
    icon: <FaImagePortrait size={ICON_SIZE} />,
  },
  {
    href: "/client/dashboard",
    label: "Assets",
    icon: <FaBox size={ICON_SIZE} />,
  },
];

export function Navbar() {
  const pathname = usePathname();

  console.log("ROUTER", pathname);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="fixed top-14 left-0 w-[12rem] h-full z-40 hidden md:flex">
        <section className="flex flex-col gap-5 p-4 pl-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            const color = isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR;

            const icon = React.cloneElement(link.icon, {
              fill: color,
              size: ICON_SIZE,
            } as HTMLAttributes<SVGElement>);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex flex-row p-2  hover:bg-gray-500/10 rounded-xl"
                )}
              >
                <section className="flex flex-row items-center gap-3">
                  <div className="flex-1 flex items-center justify-center">
                    {icon}
                  </div>
                  <span
                    className={clsx(
                      "text-lg font-semibold",
                      isActive ? "text-primary" : `text-[#6b7280]`
                    )}
                  >
                    {link.label}
                  </span>
                </section>
              </Link>
            );
          })}
        </section>
      </nav>

      {/* MOBILE NAVBAR */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-center z-50 sm:p-2 md:hidden">
        <section className="w-full sm:w-[30rem] flex justify-around sm:rounded-xl bg-white border-t-2 border-gray-200 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            const color = isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR;

            const icon = React.cloneElement(link.icon, {
              fill: color,
              size: ICON_SIZE,
            } as HTMLAttributes<SVGElement>);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "w-16 h-16 flex flex-col items-center justify-center p-2 hover:bg-gray-500/10 rounded-xl"
                )}
              >
                <div className="flex-1 flex items-center justify-center">
                  {icon}
                </div>
                <span
                  className={clsx(
                    "text-xs font-semibold",
                    isActive ? "text-primary" : `text-[#6b7280]`
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </section>
      </nav>
    </>
  );
}
