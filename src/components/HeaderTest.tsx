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
    href: "/",
    label: "Home",
    icon: <GoHomeFill size={ICON_SIZE} />,
  },
  {
    href: "/charts",
    label: "Charts",
    icon: <BsFillBarChartFill size={ICON_SIZE} />,
  },
  {
    href: "/services",
    label: "Services",
    icon: <IoIosBrowsers size={ICON_SIZE} />,
  },
  {
    href: "/accounts",
    label: "Accounts",
    icon: <FaImagePortrait size={ICON_SIZE} />,
  },
  {
    href: "/dashboard",
    label: "Assets",
    icon: <FaBox size={ICON_SIZE} />,
  },
];

export function BottomNavbar() {
  const pathname = usePathname();

  console.log("ROUTER", pathname);

  return (
    <nav className="fixed bottom-0 left-0 w-full  flex justify-center z-50 sm:p-2">
      <div className="w-full sm:w-[30rem] flex justify-around sm:rounded-xl bg-white border-t-2 border-gray-200">
        {navLinks.map((link) => {
          // Check if the current route matches the link's href.
          const isActive = pathname === link.href;

          const color = isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR;

          // Clone the icon element to override its `fill` color dynamically.
          const icon = React.cloneElement(link.icon, {
            fill: isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR,
            size: ICON_SIZE,
          } as HTMLAttributes<SVGElement>);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "w-16 h-16 flex flex-col items-center justify-center p-2 hover:bg-primary/70"
              )}
            >
              <div className="flex-1 flex items-center justify-center">
                {icon}
              </div>
              <span
                className={clsx(
                  "text-xs font-semibold text-gray-500",
                  `text-[${color}]`
                )}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
