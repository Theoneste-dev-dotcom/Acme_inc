"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/products/Header";
// import SearchBar from "@/components/products/SearchBar";
import ProductTable from "@/components/products/ProductTable";
import AddProductForm from "@/components/products/AddProductForm";
import { useActiveUserContext } from "@/context";
import { Toaster, toast } from "sonner";
import axios from "axios";

export type ProductsTypes = {
  id:number;
  name: string;
  price: number;
  description: string,
  available: boolean;
  status?: string;
  ownerId:number
}[];
export type ProductTypes = 
{
  id:number;
  name: string;
  price: number;
  description: string,
  available: boolean;
  status?: string;
  ownerId: number
};

const ProductsPage = () => {
  const {id} = useActiveUserContext();
const [products, setProducts] = useState<ProductsTypes>([]);

  
useEffect(()=>{
  axios.get(`http://localhost:8005/api/products/yours/${id}`, {
    headers: {
      Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
  })
  .then(res=> {
    setProducts(res.data)
  })
  .catch(error=> {
    console.log("failed to fetch products")
    toast.error("Failed to fetch products")
    console.log(error)
  })
}, [id])


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 px-20">
          Products
        </h1>
        <p className="text-gray-700 mb-6 px-20">Manage your product catalog</p>
       
        <ProductTable products={products} />
        <AddProductForm setProducts={setProducts} />
      </div>
      <Toaster/>
    </div>
  );
};

export default ProductsPage;
