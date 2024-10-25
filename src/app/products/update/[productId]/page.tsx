"use client";
import { Toaster, toast } from "sonner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/products/Header";
import { useActiveUserContext } from "@/context";
import { Router } from "next/router";

interface ParamsType {
  params: {
    productId: number;
  };
}

const UpdateProductForm = ({ params }: ParamsType) => {
  const {id} = useActiveUserContext();
  const router = useRouter();
  const { productId } = params;
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    available: false,
    ownerId:id
  });
  const [loading, setLoading] = useState(false);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8005/api/products/${productId}`, { headers })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        toast.success("Product fetched successfully");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:8005/api/products/${productId}`, product, { headers })
      .then((res) => {
        console.log(res.data);
        toast.success("Product updated successfully");
        onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onClose = () => {
    router.push("/products")
    console.log("Cancel button clicked");
  };

  return (
    <div>
      <Header />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Update Product</h2>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Product name"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="price"
              placeholder="Price"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              name="available"
              checked={product.available}
              onChange={handleChange}
            />
            <label>Available to users</label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default UpdateProductForm;
