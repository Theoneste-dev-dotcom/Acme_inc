
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { ProductTypes, ProductsTypes } from "@/app/products/page";
import axios from "axios";
import { useActiveUserContext } from "@/context";
const AddProductForm = ({ setProducts }) => {

  const {id} = useActiveUserContext()
  const [product, setProduct] = useState<ProductTypes>({name: "",  price: 0,  description: "", available:false, ownerId: 0}); 


  useEffect(()=>{
    if(id != 0){
      setProduct({...product, ownerId:id})
    }
  }, [id])
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(product.name !="" && product.description != "" && product.price !=0 && product.ownerId !=0 ) {
        console.log(product)
         axios.post("http://localhost:8005/api/products", product, {
            headers: {
              Authorization:`Bearer ${localStorage.getItem("authToken")}`
            }
         })
         .then((res) => {
          console.log(product)
           console.log(res.data)
           setProducts(prev => [...prev, res.data])
           toast.success("Product added successfully")
       
         })
         .catch(error => {
          console.log(error)
          toast.error("Failed to add product")
         })
      } else {
        toast.warning(`Your active id is ${product.ownerId}`)
      }

    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === "checkbox" ? checked : name === "price" ? parseInt(value) || 0 : value,
      }));
    };
    
    return (
      <form className="bg-white p-6 rounded-lg shadow-md px-20 mt-10">
        <h2 className="text-xl font-bold mb-4">Add a new product</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            name="price"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                    onChange={handleChange}
          />
        </div>
     
        <div className="flex items-center mb-4">
        
          <input
            type="checkbox"
            className="mr-2"
            name="available"
            onChange={handleChange}
            placeholder="_"
          />
          <label>Available to users</label>
        </div>
        <button type="submit"
         className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Add Product</button>
         <Toaster/>
      </form>
    );
  };
export default AddProductForm  