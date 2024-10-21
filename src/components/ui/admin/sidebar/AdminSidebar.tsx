"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import {
  MdAdminPanelSettings,
  MdOutlineDashboard,
  MdPayment,
  MdVerifiedUser,
} from "react-icons/md";
import { FaBars, FaUsers } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Profile from "../../Profile";
import styles from "./Style.module.css";

const AdminSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node) &&
      window.innerWidth <= 768
    ) {
      closeSidebar();
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
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
        } lg:translate-x-0`}
        ref={navbarRef}
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="px-3 text-black fixed">
          <div className="flex justify-between pb-5 border-b">
            <span className="font-bold text-2xl">CodeCompass</span>

            <button onClick={closeSidebar} className="text-black lg:hidden">
              <IoIosCloseCircle className="text-3xl" />
            </button>
          </div>
          <Profile />

          {/* Sidebar Links */}
          <p className="px-3 my-2">Main</p>
          <div>
            <Link
              href="/admin"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/admin"
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
              href="/admin/users"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/admin/users"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <FaUsers size={18} />
              <span className="ml-4">Users</span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/admins"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/admin/admins"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <MdAdminPanelSettings size={18} />
              <span className="ml-4">Admins</span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/posts"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/admin/posts"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <BsStack size={18} />
              <span className="ml-4">Posts</span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/verify"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/admin/verify"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <MdVerifiedUser size={18} />
              <span className="ml-4">Verification</span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/payments"
              passHref
              className={`flex items-center py-3 px-4 font-semibold ${
                pathname === "/admin/payments"
                  ? "bg-[#dfeaff]"
                  : "text-gray-600 hover:bg-[#f5f8fe]"
              }`}
            >
              <MdPayment size={18} />
              <span className="ml-4">Payments</span>
            </Link>
          </div>

          <p className="px-3 my-2">Others</p>

          <div>
            <Link
              href="/"
              passHref
              className="flex items-center py-3 px-4 font-semibold text-gray-600 hover:bg-[#f5f8fe]"
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

export default AdminSidebar;
