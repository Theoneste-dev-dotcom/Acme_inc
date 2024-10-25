"use client";
import UpdateProductForm from "./UpdateProductForm";
import { ProductsTypes, ProductTypes } from "@/app/products/page";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductTable = ({ products }: { products: ProductsTypes }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductTypes | null>(null);

  const handleUpdateClick = (product: ProductTypes) => {
    setCurrentProduct(product);
    setIsUpdating(true);
  };

  const handleUpdateClose = () => {
    setIsUpdating(false);
    setCurrentProduct(null);
  };


  return (
    <div className="overflow-x-auto mb-8 px-20">
      <div className="mb-6 px-20">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-700 text-white hover:bg-gray-900 text-left">
            <th className="p-4 font-medium text-gray-50">Product</th>
            <th className="p-4 font-medium text-gray-50">Price</th>
            <th className="p-4 font-medium text-gray-50">Status</th>
            <th className="p-4 font-medium text-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductRow key={index} product={product} onUpdateClick={handleUpdateClick} />
          ))}
        </tbody>
      </table>

      {isUpdating && currentProduct && (
        <UpdateProductForm params={{ productId: currentProduct.id }} onClose={handleUpdateClose} />
      )}
      <Toaster />
    </div>
  );
};

const ProductRow = ({ product, onUpdateClick }: { product: ProductTypes; onUpdateClick: (product: ProductTypes) => void }) => {
  const router = useRouter();

  const handleUpdateClick = (id:number) => {
    router.push("/products/update/"+product.id)
  }
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8005/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("Product deleted successfully");
        toast.success(`Product with id ${id} deleted successfully`);
        location.reload()

     })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to delete the product");
      });
  };

  const statusClass = product.available ? "bg-gray-200 text-gray-700" : "bg-gray-200 text-gray-500";

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200">
      <td className="p-4 text-gray-700">{product.name}</td>
      <td className="p-4 text-blue-500">${product.price}</td>
      <td className="p-4">
        <span className={`py-1 px-3 rounded-md ${statusClass}`}>{product.available ? "Active" : "Inactive"}</span>
      </td>
      <td className="p-4 flex flex-row gap-4">
        <button className="text-blue-500" onClick={handleUpdateClick}>Update</button>
        <button className="text-red-500" onClick={() => handleDelete(product.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ProductTable;
