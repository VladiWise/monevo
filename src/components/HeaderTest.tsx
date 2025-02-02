import Link from "next/link";

import { AiFillBank } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiFillSignal } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { MdMiscellaneousServices } from "react-icons/md";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: <AiFillHome size={24} /> },
  { href: "/about", label: "About", icon: <AiFillSignal size={24} /> },
  { href: "/contact", label: "Contact", icon: <AiFillShopping size={24} /> },
  {
    href: "/accounts",
    label: "Accounts",
    icon: <MdMiscellaneousServices size={24} />,
  },
  { href: "/test", label: "TEST", icon: <AiFillBank size={24} /> },
  { href: "/dashboard", label: "Dashboard", icon: <AiFillBank size={24} /> },
];

export function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full  flex justify-center z-50 p-2">
      <div className="w-full sm:w-[30rem] bg-[#C1A8D6] flex justify-around rounded-xl">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-16 h-16 flex flex-col items-center justify-center p-2 hover:bg-primary/70"
          >
            <div className="flex-1 flex items-center justify-center">
              {link.icon}
            </div>
            <span className="text-xs text-white">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
