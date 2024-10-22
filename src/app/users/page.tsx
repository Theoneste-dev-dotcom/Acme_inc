import Sidebar from "@/components/users/Sidebar";
import UsersTable from "@/components/users/UserTable";

const App = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-300">Users</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Invite Users</button>
        </div>
        <UsersTable />
      </div>
    </div>
  );
};

export default App;
