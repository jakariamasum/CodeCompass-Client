"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import styles from "./Style.module.css";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import Profile from "../../Profile";
import { BiHome } from "react-icons/bi";

const UserSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  console.log(pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  // Close the sidebar when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      closeSidebar();
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-black"
        onClick={toggleSidebar}
      >
        <FaBars className="text-3xl" />
      </button>
      <nav
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarShow : ""
        }`}
        ref={navbarRef}
      >
        <div className="px-3 text-black">
          {/* Sidebar top area */}
          <div className="flex justify-between pb-5 border-b">
            {/* Main logo */}
            <span className="font-bold text-2xl">CodeCompass</span>

            {/* Close button for mobile view */}
            <button onClick={closeSidebar} className="text-black lg:hidden">
              <IoIosCloseCircle className="text-3xl" />
            </button>
          </div>

          <div>
            <Profile />
          </div>

          {/* Sidebar Links */}
          <p className="px-3 my-2">Main</p>
          <div>
            <Link
              href="/user"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/user"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <MdOutlineDashboard size={18} />
              <span className="ml-4">Dashboard</span>
            </Link>
          </div>
          <div>
            <Link
              href="/user/post"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/user/post"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <IoCreate size={18} />
              <span className="ml-4">Create Post</span>
            </Link>
          </div>
          {/* Sidebar Links */}
          <p className="px-3 my-2">Others</p>
          <div>
            <Link
              href="/"
              passHref
              className={`flex items-center py-3 px-4 font-semibold text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <BiHome size={18} />
              <span className="ml-4">Home</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserSidebar;
