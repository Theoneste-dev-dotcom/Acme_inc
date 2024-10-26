const Header = () => {
    return (
      <header className="flex justify-between items-center p-6 bg-white shadow-md px-40 sticky top-0">
        <div className="text-xl text-gray-300 font-bold">Acme Co</div>
        <nav className="space-x-6">
          <a href="/welcome" className="text-gray-700">Dashboard</a>
          <a href="#" className="text-gray-700">Features</a>
          <a href="#" className="text-gray-700">Pricing</a>
          <a href="#" className="text-gray-700">Docs</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">New feature</button>
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">Invite team</button>
          <div className="text-2xl">👤</div>
        </div>
      </header>
    );
  };
  
  export default Header