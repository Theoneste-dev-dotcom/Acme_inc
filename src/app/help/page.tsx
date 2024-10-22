import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-300">Acme Co</h1>
          <nav className="space-x-4">
            <a href="/welcome" className="text-gray-700 hover:underline">Dashboard</a>
            <a href="/help" className="text-gray-700 hover:underline">Home</a>
            <a href="#" className="text-gray-700 hover:underline">API Reference</a>
            <a href="#" className="text-gray-700 hover:underline">Support</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">New Issue</button>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex">
        <div className="w-2/3 space-y-6">
          <h2 className="text-3xl font-bold text-gray-300 mb-6 mt-6">Help & Support</h2>

          {/* FAQs Section */}
          <div className="space-y-2">
            <details className="bg-white p-4 rounded-md shadow">
              <summary className="text-gray-300 font-semibold cursor-pointer">
                How do I invite a teammate?
              </summary>
              <p className="mt-2 text-gray-600">
                You can invite teammates to Linear by navigating to the team settings and clicking
                on the &quotes;Invite teammates&quotes; button. From there, you can enter their email address and
                send them an invitation.
              </p>
            </details>
            <details className="bg-white p-4 rounded-md shadow">
              <summary className="font-semibold cursor-pointer text-gray-300">Can I delete an issue?</summary>
              <p className="mt-2 text-gray-600">
                You can invite teammates to Linear by navigating to the team settings and clicking
                on the &quotes;Invite teammates&quotes; button. From there, you can enter their email address and
                send them an invitation.
              </p>
            </details>
            <details className="bg-white p-4 rounded-md shadow">
              <summary className="font-semibold cursor-pointer text-gray-300">What are issue views?</summary>
              <p className="mt-2 text-gray-600">
                You can invite teammates to Linear by navigating to the team settings and clicking
                on the &quotes;Invite teammates&quotes; button. From there, you can enter their email address and
                send them an invitation.
              </p>
            </details>
          </div>

          {/* Support Request Form */}
          <div className="mt-6">
            <h3 className="text-2xl mb-8 mt-6 font-bold text-gray-300">Submit a support request</h3>
            <p className="text-gray-600">
              If you need help with something that isn&apos;t covered in our FAQs, you can submit a
              support request here.
            </p>
            <textarea
              placeholder="Type your question or problem here..."
              className="w-full h-32 mt-4 p-3 border rounded-md"
            ></textarea>
            <button className="my-4 bg-blue-600 text-white px-4 py-2 rounded-md mt-2">
              Submit request
            </button>
          </div>
        </div>

        {/* Sidebar Section */}
        <aside className="w-1/3 pl-8">
          <div className="bg-white p-4 rounded-md shadow mb-4">
            <h4 className="font-bold mb-2">Contact us</h4>
            <p className="text-gray-600 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 13.5l8.39-6.56A2.1 2.1 0 0 0 20.5 5H3.5a2.1 2.1 0 0 0-1.89 2l8.39 6.56a.5.5 0 0 0 .6 0z" />
              </svg>
              support@acme.co
            </p>
            <p className="text-gray-600 flex items-center mt-2">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.341v21.317c0 .741.6 1.341 1.325 1.341H12.82v-9.28H9.692v-3.617h3.128V7.734c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.794.142v3.24h-1.917c-1.505 0-1.796.715-1.796 1.76v2.309h3.587l-.468 3.617h-3.119v9.28h6.107c.725 0 1.325-.6 1.325-1.341V1.34C24 .6 23.4 0 22.675 0z" />
              </svg>
              1-800-123-4567
            </p>
          </div>

          <div className="space-y-2">
            <button className="bg-blue-600 text-white px-4 py-2 w-full rounded-md">
              New Issue
            </button>
            <button className="bg-gray-100 px-4 py-2 w-full rounded-md text-gray-700">
              Favorites
            </button>
            <button className="bg-gray-100 px-4 py-2 w-full rounded-md text-gray-700">
              Teams
            </button>
            <button className="bg-gray-100 px-4 py-2 w-full rounded-md text-gray-700">
              Projects
            </button>
          </div>
        </aside>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-100 p-8 mt-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <a href="/about" className="text-gray-500 hover:text-gray-900">About</a>
            <a href="/blog" className="text-gray-500 hover:text-gray-900">Blog</a>
            <a href="/press" className="text-gray-500 hover:text-gray-900">Press</a>
            <a href="/support" className="text-gray-500 hover:text-gray-900">Support</a>
          </div>

          <p className="text-gray-500">@2022 Acme Co</p>

          <div className="flex space-x-4">
            <a href="https://twitter.com" className="text-gray-500 hover:text-gray-900">Twitter</a>
            <a href="https://facebook.com" className="text-gray-500 hover:text-gray-900">Facebook</a>
            <a href="https://instagram.com" className="text-gray-500 hover:text-gray-900">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpAndSupport;
