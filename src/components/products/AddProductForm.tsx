import { useState } from "react";
import { ProductTypes, ProductsTypes } from "@/app/products/page";

const AddProductForm = ({ setProducts }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [visible, setVisible] = useState(false);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (name && price) {
        setProducts((prev) => [...prev, { name, price: Number(price), status: visible ? "Active" : "Inactive" }]);
        setName("");
        setPrice("");
        setVisible(false);
      }
    };
  
    return (
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Add a new product</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product name"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
        
          <input
            type="checkbox"
            className="mr-2"
            checked={visible}
            onChange={() => setVisible(!visible)}
            placeholder="_"
          />
          <label>Visible to users</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Product</button>
      </form>
    );
  };
export default AddProductForm  