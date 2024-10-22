"use client";
import Pagination from "@/components/Pagination";
import TableRow from "@/components/ui/admin/TableRow";
import { useGetUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import { useState } from "react";

const AdminManagement = () => {
  const { data: users } = useGetUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const userss = users?.filter((user: IUser) => user.role === "admin") || [];
  const totalPages = users ? Math.ceil(userss?.length / usersPerPage) : 0;
  return (
    <div className="bg-white p-4 rounded shadow mb-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <TableRow role="admin" />
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminManagement;
