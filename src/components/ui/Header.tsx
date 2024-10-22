"use client";

import { useUser } from "@/context/user.provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface NavItem {
  href: string;
  label: string;
}

interface NavLinkProps extends NavItem {
  className?: string;
}

interface User {
  role: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useUser() as { user: User | null };
  const pathname = usePathname();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const NavLink: React.FC<NavLinkProps> = ({ href, label, className = "" }) => (
    <Link
      href={href}
      className={`transition duration-300 ease-in-out ${
        pathname === href
          ? "text-[#009CA6] font-semibold"
          : "text-white hover:text-[#009CA6]"
      } ${className}`}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-[#009CA6] hover:text-[#00b8c2] transition duration-300"
        >
          CodeCompass
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          {user ? (
            <NavLink
              href={`/${user.role}`}
              label="Dashboard"
              className="bg-[#009CA6] px-4 py-2 rounded hover:bg-[#00b8c2] text-white"
            />
          ) : (
            <NavLink
              href="/login"
              label="Login"
              className="bg-[#009CA6] px-4 py-2 rounded hover:bg-[#00b8c2] text-white"
            />
          )}
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:text-[#009CA6] transition duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            {user ? (
              <NavLink
                href={`/${user.role}`}
                label="Dashboard"
                className="bg-[#009CA6] px-4 py-2 rounded hover:bg-[#00b8c2] text-white text-center"
              />
            ) : (
              <NavLink
                href="/login"
                label="Login"
                className="bg-[#009CA6] px-4 py-2 rounded hover:bg-[#00b8c2] text-white text-center"
              />
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
