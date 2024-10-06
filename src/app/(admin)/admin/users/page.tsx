"use client";
import { useState } from "react";

const staticUserData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Blocked" },
  { id: 3, name: "Sam Wilson", email: "sam@example.com", status: "Active" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(staticUserData);

  const toggleBlock = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2 flex space-x-2">
                <button
                  className={`${
                    user.status === "Active" ? "bg-red-500" : "bg-green-500"
                  } text-white px-4 py-1 rounded`}
                  onClick={() => toggleBlock(user.id)}
                >
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-1 rounded"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
