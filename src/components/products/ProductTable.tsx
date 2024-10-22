import { ProductsTypes, ProductTypes } from "@/app/products/page";

const ProductTable = ({ products }:{products: ProductsTypes}) => {
    return (
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-medium text-gray-600">Product</th>
              <th className="p-4 font-medium text-gray-600">Price</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow key={index} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const ProductRow = ({ product }: {product: ProductTypes}) => {
    const statusClass = product.status === "Active" ? "bg-gray-200 text-gray-700" : "bg-gray-200 text-gray-500";
    return (
      <tr className="border-b border-gray-200">
        <td className="p-4 text-gray-400">{product.name}</td>
        <td className="p-4 text-blue-500">${product.price}</td>
        <td className="p-4">
          <span className={`py-1 px-3 rounded-md ${statusClass}`}>{product.status}</span>
        </td>
        <td className="p-4">
          <button className="text-red-500">Delete</button>
        </td>
      </tr>
    );
  };

  
  export default ProductTable