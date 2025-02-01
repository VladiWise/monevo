import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/accounts", label: "Accounts" },
  { href: "/test", label: "TEST" },
  { href: "/dashboard", label: "Dashboard" },
];

export function BottomNavbar() {
  return (
    <section className="fixed top-0 left-0 w-full flex justify-center">
      <div className="w-[20rem] bg-[#C1A8D6] p-2 flex justify-between z-50">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-10 h-10 flex items-center justify-center bg-[#1E1EA8] rounded-lg border-2 border-black text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
