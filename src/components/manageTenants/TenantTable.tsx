import { TenatsType } from "@/app/manageTenants/page";
import { tenantType } from "@/app/manageTenants/page";
import { useState, useEffect } from "react";
import axios from "axios";

const TenantTable = ({ tenants }: { tenants: TenatsType }) => {
  return (
    <div className="overflow-x-auto px-40">
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-400 text-left">
            <th className="p-4 font-medium text-gray-50">Tenant Id</th>
            <th className="p-4 font-medium text-gray-50">Tenant Name</th>
            <th className="p-4 font-medium text-gray-50">Email</th>
            <th className="p-4 font-medium text-gray-50">Users</th>
            <th className="p-4 font-medium text-gray-50">Created At</th>
            <th className="p-4 font-medium text-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <TenantRow key={tenant.id} tenant={tenant} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TenantRow = ({ tenant }: { tenant: tenantType }) => {
  const [userCounts, setUserCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchNumberOfUsers = async (id: number) => {
      try {
        const response = await axios.get(`http://localhost:8005/api/users/yours/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });
        setUserCounts((prevCounts) => ({
          ...prevCounts,
          [id]: response.data.length,
        }));
      } catch (error) {
        console.error(error);
        setUserCounts((prevCounts) => ({
          ...prevCounts,
          [id]: 0,
        }));
      }
    };

    fetchNumberOfUsers(tenant.id);
  }, [tenant.id]);

  const action = tenant.status === "Active" ? "Manage" : "Activate";
  const actionClass =
    tenant.status === "Active"
      ? "bg-gray-200 text-gray-700"
      : "bg-blue-500 text-white";

  return (
    <tr className="border-b border-gray-200">
      <td className="p-4 text-gray-500">{tenant.id}</td>
      <td className="p-4 text-gray-500">{tenant.fullName}</td>
      <td className="p-4 text-gray-500">{tenant.email}</td>
      <td className="p-4 text-gray-400">
        {userCounts[tenant.id] !== undefined ? userCounts[tenant.id] : "Loading..."}
      </td>
      <td className="p-4 text-gray-500 flex flex-row items-center">
        <p>{new Date(tenant.createdAt).getFullYear()}/ </p>
        <p>{new Date(tenant.createdAt).getMonth() + 1}/ </p>
        <p>{new Date(tenant.createdAt).getDate()}</p>
      </td>
      <td className="p-4">
        <button className={`py-2 px-4 rounded-md ${actionClass}`}>
          {action}
        </button>
      </td>
    </tr>
  );
};

export default TenantTable;
