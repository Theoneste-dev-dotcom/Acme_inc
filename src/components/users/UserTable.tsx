"use client"
import React, { useState } from 'react';

const UsersTable = () => {
  const [users, setUsers] = useState([
    { name: 'Alice Smith', role: 'Admin', email: 'alice.smith@email.com', status: 'Active' },
    { name: 'Bob Johnson', role: 'Editor', email: 'bob.johnson@email.com', status: 'Active' },
    { name: 'Charlie Brown', role: 'Viewer', email: 'charlie.brown@email.com', status: 'Invited' },
  ]);

  const handleDelete = (email) => {
    setUsers(users.filter(user => user.email !== email));
  };

  const handleResendInvite = (email) => {
    alert(`Resent invite to ${email}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Search users"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-4 text-gray-300">{user.name}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-white ${
                  user.role === 'Admin'
                    ? 'bg-blue-500'
                    : user.role === 'Editor'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-gray-300">{user.email}</td>
              <td className="p-4 text-gray-300">{user.status}</td>
              <td className="p-4">
                {user.status === 'Invited' ? (
                  <button
                    onClick={() => handleResendInvite(user.email)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Resend Invite
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <button className="px-3 py-2 border border-gray-300 rounded-lg mx-1">{'<'}</button>
        <span className="px-3 py-2">1</span>
        <button className="px-3 py-2 border border-gray-300 rounded-lg mx-1">{'>'}</button>
      </div>
    </div>
  );
};

export default UsersTable;
