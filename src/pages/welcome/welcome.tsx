import React from 'react';
import "./globals.css";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Acme Inc</h2>
          <p className="text-sm text-gray-400">acme.inc</p>
        </div>

        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-blue-500 font-semibold">Overview</a>
          <a href="#" className="text-gray-600">Users</a>
          <a href="#" className="text-gray-600">Settings</a>
          <a href="#" className="text-gray-600">Usage</a>
          <a href="#" className="text-gray-600">API</a>
        </nav>

        <div className="mt-auto pt-10">
          <a href="#" className="text-gray-600">Switch to another account</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Welcome back, Acme Inc</h1>
        
        {/* Recently Viewed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Recently viewed</h2>
          <div className="space-y-4">
            {/* Recently viewed item */}
            {["3", "5", "7"].map((days, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-medium">Acme Inc</h3>
                    <p className="text-sm text-gray-400">Updated {days} days ago</p>
                  </div>
                </div>
                <div className="text-gray-400">⋮</div>
              </div>
            ))}
          </div>
        </section>

        {/* Admin Options */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Admin options</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">Team</h3>
                <p className="text-sm text-gray-400">Manage your team members and roles</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-gray-400">Manage your organization’s settings and usage</p>
              </div>
            </div>
          </div>
        </section>

        {/* User Options */}
        <section>
          <h2 className="text-xl font-semibold mb-4">User options</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">Profile</h3>
                <p className="text-sm text-gray-400">Manage your profile and account settings</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">Sign out</h3>
                <p className="text-sm text-gray-400">Sign out of your account</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
