"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hrefggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auhref px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tech Tips Hub
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link href="/categories" className="hover:text-yellow-500">
            Categories
          </Link>
          <Link href="/premium" className="hover:text-yellow-500">
            Premium
          </Link>
          <Link href="/about" className="hover:text-yellow-500">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-yellow-500">
            Contact
          </Link>
          <Link
            href="/login"
            className="hover:text-yellow-500 bg-yellow-500 px-4 py-2 rounded hover:bg-gray-500"
          >
            Login
          </Link>
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
              className="hover:text-yellow-500"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={hrefggleMenu}
              className="hover:text-yellow-500"
            >
              Categories
            </Link>
            <Link
              href="/premium"
              onClick={hrefggleMenu}
              className="hover:text-yellow-500"
            >
              Premium
            </Link>
            <Link
              href="/about"
              onClick={hrefggleMenu}
              className="hover:text-yellow-500"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={hrefggleMenu}
              className="hover:text-yellow-500"
            >
              Contact
            </Link>
            <Link
              href="/login"
              onClick={hrefggleMenu}
              className="hover:text-yellow-500 bg-yellow-500 px-4 py-2 rounded"
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
