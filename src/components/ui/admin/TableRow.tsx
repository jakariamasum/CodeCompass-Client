"use client";
import {
  useGetUsers,
  useUserDelete,
  useUserRoleToogle,
  useUserToogle,
} from "@/hooks/user.hook";
import { IUser } from "@/types";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiBlock, BiTrash } from "react-icons/bi";
import { FaUserMinus } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

const TableRow = ({ role }: { role: string }) => {
  const { data: users, refetch: userRefetch, isLoading } = useGetUsers();
  const { mutate: handleUserDelete } = useUserDelete(userRefetch);
  const { mutate: handleToogle } = useUserToogle(userRefetch);
  const { mutate: handleToogleRole } = useUserRoleToogle(userRefetch);
  const userss = users?.filter((user: IUser) => user.role === role) || [];
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td>
            <div className="flex justify-center items-center py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {userss?.map((user: IUser) => (
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
                <FcCheckmark className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => handleUserDelete(user._id)}
              className="text-red-600 hover:text-red-900 mr-4"
              aria-label={`Delete ${user?.fname}`}
            >
              <BiTrash className="h-5 w-5" />
            </button>
            {user.role === "admin" ? (
              <>
                <button
                  onClick={() => handleToogleRole(user._id)}
                  className="hover:text-[#009CA6] text-red-500"
                  aria-label={`Remove admin role from ${user.fname}`}
                >
                  <FaUserMinus className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleToogleRole(user._id)}
                  className="hover:text-[#009CA6] text-green-800"
                  aria-label={`Add admin role from ${user.fname}`}
                >
                  <AiOutlineUserAdd className="h-5 w-5" />
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;
