import Link from "next/link";
import Image from "next/image";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import { useUser } from "@/context/user.provider";

const Profile = () => {
  const { user } = useUser();
  const links = [
    {
      label: "Profile",
      href: user?.role === "admin" ? "/admin/profile" : "/user/profile",
      icon: (
        <FaUserCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Tickets",
      href: user?.role === "admin" ? "/admin/tickets" : "/user/tickets",
      icon: (
        <TbHeartHandshake className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <div className="border-b-2 py-2">
      <div className="flex flex-col items-center">
        <Image
          className="rounded-xl"
          src={
            user?.profilePic ||
            "https://i.ibb.co/YQd9HKR/man-avatar-clipart-illustration-free-png.png"
          }
          alt={user?.fname || "user avatar"}
          width={100}
          height={100}
        />
        <h4 className="font-medium mt-3">{user?.fname || "John Doe"}</h4>
        <p>{user?.role}</p>
        <div className="flex gap-10 my-3 text-black">
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} title={link.label}>
              {link.icon}
            </Link>
          ))}
          <button onClick={handleLogout} title="Logout">
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
