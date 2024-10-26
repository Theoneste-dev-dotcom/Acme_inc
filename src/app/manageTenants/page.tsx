"use client"
import Header from "@/components/manageTenants/Header";
import SearchBar from "@/components/manageTenants/SearchBar";
import TenantTable from "@/components/manageTenants/TenantTable";
import Footer from "@/components/manageTenants/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

 export type TenatsType = {
  id:number, fullName:string,createdAt:Date, email:string, tenant?: string, status?: string, users?: number
}[]
export type tenantType = {
  id:number, fullName:string, createdAt:Date, email:string, tenant?: string, status?: string, users?: number
}
const ManageTenants = () => {
  const [myTenants, setMyTenants] = useState<TenatsType>([])
useEffect(()=>{
 axios.get("http://localhost:8005/users/", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`
  }
 })
 .then(res=> {
  console.log(res.data)
  toast.success("Users fetched successfully")
  setMyTenants([...res.data])
  
 })
 .catch(error=> {
  toast.error("Failed to fetch products")
  console.log(error)
 })
},[])


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-12">
     <div className="px-40 pb-12">
     <h1 className="text-4xl text-gray-300 font-bold mb-4 ">Manage tenants</h1>
     <p className="text-gray-500 mb-6 ">Explore and manage your tenants</p>
     </div>
        <SearchBar />
        <TenantTable tenants={myTenants} />
      </div>
      <Footer />
      <Toaster/>
    </div>
  );
};

export default ManageTenants;
