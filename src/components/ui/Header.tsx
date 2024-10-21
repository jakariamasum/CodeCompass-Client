"use client";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  const hrefggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auhref px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#009CA6]">
          CodeCompass
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-[#009CA6]">
            Home
          </Link>

          <Link href="/about" className="hover:text-[#009CA6]">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-[#009CA6]">
            Contact
          </Link>
          {user ? (
            <Link
              href={`/${user?.role}`}
              className="hover:text-[#009CA6] bg-[#009CA6] px-4 py-2 rounded hover:bg-gray-500"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-[#009CA6] bg-[#009CA6] px-4 py-2 rounded hover:bg-gray-500"
            >
              Login
            </Link>
          )}
        </nav>

        <div className="md:hidden flex items-center">
          {isMenuOpen ? (
            <AiOutlineClose size={30} onClick={hrefggleMenu} />
          ) : (
            <AiOutlineMenu size={30} onClick={hrefggleMenu} />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 py-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              onClick={hrefggleMenu}
              className="hover:text-[#009CA6]"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={hrefggleMenu}
              className="hover:text-[#009CA6]"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={hrefggleMenu}
              className="hover:text-[#009CA6]"
            >
              Contact
            </Link>
            <Link
              href="/login"
              onClick={hrefggleMenu}
              className="hover:text-[#009CA6] bg-[#009CA6] px-4 py-2 rounded"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
