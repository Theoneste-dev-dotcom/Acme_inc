
import { usePathname } from 'next/dist/client/components/navigation';

const Sidebar = () => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl text-gray-300 font-bold mb-8">Acme Inc.</h2>
      <ul>
        <li className="mb-4">
          <a href="/welcome" className="text-gray-400 hover:text-gray-800">Dashboard</a>
        </li>
        <li className="mb-4">
          <a href="/users" className={`text-gray-400 hover:text-gray-600 ${pathname =="/users" && 'text-blue-400'}`}>Users</a>
        
        </li>
        <li className="mb-4">
          <a href="/users/invite" className={`text-gray-400 hover:text-gray-600 ${pathname =="/users/invite"&&'text-blue-400'}`}>Invite User</a>
        </li>
        <li className="mb-4">
          <a href="/users/roles" className={`text-gray-400 hover:text-gray-600 ${pathname =="/users/roles"&& 'text-blue-400'}`}>Roles</a>
        </li>
        <li className="mb-4">
          <a href="/users/permissions" className={`text-gray-400 hover:text-gray-600 ${pathname =="/users/permissions" &&'text-blue-400'}`}>Permissions</a>
        </li>
        <li className="mb-4">
          <a href="/users/help" className={`text-gray-400 hover:text-gray-600 ${pathname =="/users/help" &&'text-blue-400'}`}>Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
