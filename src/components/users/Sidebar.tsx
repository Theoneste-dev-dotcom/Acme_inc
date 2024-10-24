import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl text-gray-300 font-bold mb-8">Acme Inc.</h2>
      <ul>
        <li className="mb-4">
          <a href="/welcome" className="text-gray-400 hover:text-gray-800">Dashboard</a>
        </li>
        <li className="mb-4">
          <a href="/users" className="text-gray-400 hover:text-600">Users</a>
        
        </li>
        <li className="mb-4">
          <a href="/users" className="text-gray-400 hover:text-gray-600">Invite User</a>
        </li>
        <li className="mb-4">
          <a href="/users/roles" className="text-gray-400 hover:text-gray-600">Roles</a>
        </li>
        <li className="mb-4">
          <a href="/users/permissions" className="text-gray-400 hover:text-gray-600">Permissions</a>
        </li>
        <li className="mb-4">
          <a href="/help" className="text-gray-400 hover:text-gray-600">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
