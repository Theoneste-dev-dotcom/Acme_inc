"use client"
import Sidebar from '@/components/users/Sidebar';
import React, { useState } from 'react';

const PermissionsManagement = () => {
  const [users, setUsers] = useState([
    { name: 'Alice Smith', email: 'alice.smith@email.com', permissions: ['read', 'write'] },
    { name: 'Bob Johnson', email: 'bob.johnson@email.com', permissions: ['read'] },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPermission, setNewPermission] = useState('');

  const handleAddPermission = (email, permission) => {
    setUsers(users.map(user =>
      user.email === email && !user.permissions.includes(permission)
        ? { ...user, permissions: [...user.permissions, permission] }
        : user
    ));
    setNewPermission('');
  };

  const handleRemovePermission = (email, permission) => {
    setUsers(users.map(user =>
      user.email === email
        ? { ...user, permissions: user.permissions.filter(p => p !== permission) }
        : user
    ));
  };

  return (
   <div className='flex flex-row bg-gray-50 w-[100vw] h-[100vh]'>
    <Sidebar/>
     <div className="p-6  shadow-md rounded-lg flex-1">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Manage User Permissions</h2>

      <div className="mb-4">
        <select
          onChange={(e) => setSelectedUser(users.find(user => user.email === e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="" className='text-gray-400'>Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user.email}>{user.name}</option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <div>
          <h3 className="text-xl mb-4">Permissions for {selectedUser.name}</h3>
          <ul>
            {selectedUser.permissions.map((permission, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{permission}</span>
                <button
                  onClick={() => handleRemovePermission(selectedUser.email, permission)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Permission
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <input
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              type="text"
              placeholder="New permission"
              className="p-2 border border-gray-300 rounded-lg w-full mb-2"
            />
            <button
              onClick={() => handleAddPermission(selectedUser.email, newPermission)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Add Permission
            </button>
          </div>
        </div>
      )}
    </div>
   </div>
  );
};

export default PermissionsManagement;
