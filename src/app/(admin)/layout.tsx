import AdminSidebar from "@/components/ui/admin/sidebar/AdminSidebar";
import React, { ReactNode } from "react";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between xl:gap-3 bg-slate-50 text-black">
      <div className="lg:w-[20%] xl:w-[16%]">
        <AdminSidebar />
      </div>
      <div className="min-h-screen w-full lg:w-[79.5%] xl:w-[84%]">
        <div className="min-h-[calc(100%-120px)] flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
