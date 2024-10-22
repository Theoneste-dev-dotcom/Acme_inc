import profile from '../../images/profile.jpg'
import Image from 'next/image';

const Header = () => {
    return (
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-xl font-bold text-gray-400">Acme Inc.</div>
        <nav className="space-x-6">
          <a href="/welcome" className="text-gray-700">Dashboard</a>
          <a href="#" className="text-gray-700">Home</a>
          <a href="#" className="text-gray-700">Products</a>
          <a href="#" className="text-gray-700">Users</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">New</button>
          <div className="relative">
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">1</span>
            <button className="text-gray-700 text-2xl">🔔</button>
          </div>
          <Image src={profile} alt="User Avatar" className="rounded-full w-10 h-10" />
        </div>
      </header>
    );
  };
  
  export default Header