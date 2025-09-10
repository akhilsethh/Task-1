import React from "react";

const ProductList = ({ products, deleteProduct, setEditingProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-2" />
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="font-bold">${product.price}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white p-1 rounded w-1/2">Edit</button>
            <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-1 rounded w-1/2">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
