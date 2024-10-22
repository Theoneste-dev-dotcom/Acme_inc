import React from "react";
import Header from "@/components/manageTenants/Header";
import SearchBar from "@/components/manageTenants/SearchBar";
import TenantTable from "@/components/manageTenants/TenantTable";
import Footer from "@/components/manageTenants/Footer";

 export type TenatsType = {
  tenant: string, status: string, users: number
}[]
export type tenantType = {
  tenant: string, status: string, users: number
}
const tenants =[
  { tenant: "@acme", status: "Active", users: 10 },
  { tenant: "@acme-2", status: "Inactive", users: 0 },
  { tenant: "@acme-3", status: "Active", users: 25 },
  { tenant: "@acme-4", status: "Inactive", users: 5 },
  { tenant: "@acme-5", status: "Active", users: 15 },
  { tenant: "@acme-6", status: "Inactive", users: 2 },
  { tenant: "@acme-7", status: "Active", users: 12 },
];

const ManageTenants = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl text-gray-300 font-bold mb-4">Manage tenants</h1>
        <p className="text-gray-500 mb-6">Explore and manage your tenants</p>
        <SearchBar />
        <TenantTable tenants={tenants} />
      </div>
      <Footer />
    </div>
  );
};

export default ManageTenants;
