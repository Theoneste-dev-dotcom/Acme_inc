"use client"
import React, { useState } from "react";
import Header from "@/components/products/Header";
import SearchBar from "@/components/products/SearchBar";
import ProductTable from "@/components/products/ProductTable";
import AddProductForm from "@/components/products/AddProductForm";

export type ProductsTypes =  { name: string, price: number, status: string }[]
export type ProductTypes =  { name: string, price: number, status: string }

const productsData = [
  { name: "Product A", price: 100, status: "Active" },
  { name: "Product B", price: 200, status: "Active" },
  { name: "Product C", price: 300, status: "Inactive" },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(productsData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-300 mb-3">Products</h1>
        <p className="text-gray-500 mb-6">Manage your product catalog</p>
        <SearchBar />
        <ProductTable products={products} />
        <AddProductForm setProducts={setProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
