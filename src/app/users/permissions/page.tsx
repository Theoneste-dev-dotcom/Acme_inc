"use client";
import Sidebar from "@/components/users/Sidebar";
import React, { useState, useEffect } from "react";
import { useActiveUserContext } from "@/context";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UsersType {
  id: number;
  name: string;
  email: string;
  status: string;
  permissions: string;
  role: string;
}

const PermissionsManagement = () => {
  const router = useRouter();
  const { id } = useActiveUserContext();
  const [users, setUsers] = useState<UsersType[]>([]); // holds the original user list
  const [filteredUsers, setFilteredUsers] = useState<UsersType[]>([]); // holds the filtered user list
  const [selectedUser, setSelectedUser] = useState<UsersType | null>(null);
  const [newRole, setNewRole] = useState("");
  const [search, setSearch] = useState("");

  const handleAddRole = (email: string, role: string) => {
    setUsers(
      users.map((user) =>
        user.email === email && !user.role.includes(role)
          ? { ...user, role: `${user.role}, ${role}` }
          : user
      )
    );
    setNewRole("");
  };

  const handleRemoveRole = (email: string, role: string) => {
    setUsers(
      users.map((user) =>
        user.email === email
          ? { ...user, role: user.role.replace(role, "").trim() }
          : user
      )
    );
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    axios
      .delete(`http://localhost:8005/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("User Deleted successfully");
        toast(`User with id ${id} Deleted successfully`);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to Delete the user");
      });
  };

  const handleUpdate = (userId: number) => {
    router.push("/users/update/" + userId);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8005/api/users/yours/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers([...res.data]);
        setFilteredUsers([...res.data]); // Set filtered list initially to the full user list
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filtered = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.permissions.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredUsers(filtered); // Update filtered list based on search input
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="h-[100vh] bg-gray-200 flex-1">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">
          Manage User Permissions
        </h2>
        <div className="w-full ">
          <input
            type="text"
            className="w-[97%] pl-4 mb-2 mx-1 py-3 rounded-lg"
            title="."
            placeholder="Select by role"
            onChange={handleSearch}
          />
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-400 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Permission</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 &&
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-gray-400">{user.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-6 py-2 rounded-full text-white ${
                        user.permissions === "Update"
                          ? "bg-blue-500"
                          : user.permissions === "Read"
                          ? "bg-yellow-300"
                          : "bg-green-300"
                      }`}
                    >
                      {user.permissions}
                    </span>
                  </td>

                  <td className="p-4 flex-1">
                    <div className="flex flex-col lg:flex-row gap-2">
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {selectedUser && (
          <div>
            <h3 className="text-xl mb-4">Roles for {selectedUser.name}</h3>
            <ul>
              {selectedUser.role.split(",").map((role, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{role}</span>
                  <button
                    onClick={() => handleRemoveRole(selectedUser.email, role)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Role
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                type="text"
                placeholder="New role"
                className="p-2 border border-gray-300 rounded-lg w-full mb-2"
              />
              <button
                onClick={() => handleAddRole(selectedUser.email, newRole)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Add Role
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default PermissionsManagement;
