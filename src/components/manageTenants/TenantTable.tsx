
import { TenatsType } from "@/app/manageTenants/page";
import { tenantType } from "@/app/manageTenants/page";
const TenantTable = ({ tenants }: {
  tenants:TenatsType
}) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-medium text-gray-600">Tenant</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Users</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <TenantRow key={index} tenant={tenant} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const TenantRow = ({ tenant }:{
    tenant:tenantType
  }) => {
    const action = tenant.status === "Active" ? "Manage" : "Activate";
    const actionClass =
      tenant.status === "Active"
        ? "bg-gray-200 text-gray-700"
        : "bg-blue-500 text-white";
    return (
      <tr className="border-b border-gray-200">
        <td className="p-4 text-gray-300">{tenant.tenant}</td>
        <td className={`p-4 ${tenant.status === "Active" ? "text-green-500" : "text-red-500"}`}>
          {tenant.status}
        </td>
        <td className="p-4 text-gray-400">{tenant.users}</td>
        <td className="p-4">
          <button className={`py-2 px-4 rounded-md ${actionClass}`}>{action}</button>
        </td>
      </tr>
    );
  };


  export default TenantTable
  