import Link from "next/link";
import Image from "next/image";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";
import { useUser } from "@/context/user.provider";
import { useRouter } from "next/navigation";
import { useSingleUser } from "@/hooks/user.hook";
import { logOut } from "@/hooks/auth.hook";

const Profile = () => {
  const { user, setUser } = useUser();
  const { data: userData } = useSingleUser(user?.email as string);

  const router = useRouter();
  const links = [
    {
      label: "Profile",
      href: userData?.role === "admin" ? "/admin/profile" : "/user/profile",
      icon: <FaUserCircle className="text-black h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Tickets",
      href: "#",
      icon: (
        <TbHeartHandshake className="text-black-700  h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="border-b-2 py-2">
      <div className="flex flex-col items-center">
        <Image
          className="rounded-xl"
          src={
            userData?.profilePic ||
            "https://i.ibb.co/YQd9HKR/man-avatar-clipart-illustration-free-png.png"
          }
          alt={userData?.fname || "user avatar"}
          width={100}
          height={100}
        />
        <h4 className="font-medium mt-3">{userData?.fname || "John Doe"}</h4>
        <p>{userData?.role}</p>
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
