"use client"
import React, { useState } from 'react';

const RolesManagement = () => {
  const [users, setUsers] = useState([
    { name: 'Alice Smith', email: 'alice.smith@email.com', roles: ['Admin', 'Editor'] },
    { name: 'Bob Johnson', email: 'bob.johnson@email.com', roles: ['Viewer'] },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const handleAddRole = (email, role) => {
    setUsers(users.map(user =>
      user.email === email && !user.roles.includes(role)
        ? { ...user, roles: [...user.roles, role] }
        : user
    ));
    setNewRole('');
  };

  const handleRemoveRole = (email, role) => {
    setUsers(users.map(user =>
      user.email === email
        ? { ...user, roles: user.roles.filter(r => r !== role) }
        : user
    ));
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gray-300 '>
          <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage User Roles</h2>
      
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedUser(users.find(user => user.email === e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user.email}>{user.name}</option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <div>
          <h3 className="text-xl mb-4">Roles for {selectedUser.name}</h3>
          <ul>
            {selectedUser.roles.map((role, index) => (
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
    </div>
  );
};

export default RolesManagement;
