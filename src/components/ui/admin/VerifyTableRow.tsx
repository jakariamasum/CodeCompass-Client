"use client";

import React, { useState } from "react";
import { useGetUsers, useUserVerifyToogle } from "@/hooks/user.hook";
import { FiCheck, FiX } from "react-icons/fi";
import Image from "next/image";
import { IUser } from "@/types";
import Pagination from "@/components/Pagination";

const VerificationTable: React.FC = () => {
  const { data: users, refetch, isLoading } = useGetUsers();
  const { mutate: handleVerify } = useUserVerifyToogle(refetch);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const totalPages = users ? Math.ceil(users.length / usersPerPage) : 0;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user: IUser) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Image
                      src={user.profilePic as string}
                      alt={`${user.fname} ${user.lname}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{`${user.fname} ${user.lname}`}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.verified === "yes"
                        ? "bg-green-100 text-green-800"
                        : user.verified === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.verified === "yes"
                      ? "Verified"
                      : user.verified === "pending"
                      ? "Pending"
                      : "Not Verified"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  {user.verified === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleVerify({
                            id: user?._id,
                            userData: { verified: "yes" },
                          })
                        }
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        <FiCheck className="inline-block mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleVerify({
                            id: user?._id,
                            userData: { verified: "no" },
                          })
                        }
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiX className="inline-block mr-1" />
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default VerificationTable;
