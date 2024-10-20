"use client";
import { useGetUsers, useUserDelete, useUserToogle } from "@/hooks/user.hook";
import { IUser } from "@/types";
import { BiBlock, BiTrash } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";

const UserManagement = () => {
  const { data: users, refetch: userRefetch } = useGetUsers();
  const { mutate: handleUserDelete } = useUserDelete(userRefetch);
  const { mutate: handleToogle } = useUserToogle(userRefetch);

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
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user: IUser) => (
              <tr key={user?._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span>{user?.fname} </span>
                  {user?.lname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user?.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user?.active ? "Active" : "In-active"}
                </td>
                <td className="px-6 py-4  whitespace-nowrap text-left text-sm font-medium">
                  {user?.active ? (
                    <button
                      onClick={() => handleToogle(user._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      aria-label={`Edit ${user?.fname}`}
                    >
                      <BiBlock className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToogle(user._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      aria-label={`Edit ${user?.fname}`}
                    >
                      <FcApprove className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Delete ${user?.fname}`}
                  >
                    <BiTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
