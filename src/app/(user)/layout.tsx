import UserSidebar from "@/components/ui/user/sidebar/UserSidebar";
import React, { ReactNode } from "react";

const UserDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between xl:gap-3 bg-slate-50 text-black">
      <div className="lg:w-[20%] xl:w-[16%]">
        <UserSidebar />
      </div>
      <div className="min-h-screen w-full lg:w-[79.5%] xl:w-[84%]">
        <div className="min-h-[calc(100%-120px)] flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
