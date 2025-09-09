import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add product
  const addProduct = (product) => {
    axios.post("https://fakestoreapi.com/products", product)
      .then(res => {
        setProducts([...products, { ...res.data, id: products.length + 1 }]);
      })
      .catch(err => console.error(err));
  };

  // Update product
  const updateProduct = (id, updatedProduct) => {
    axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct)
      .then(() => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
        setEditingProduct(null);
      })
      .catch(err => console.error(err));
  };

  // Delete product
  const deleteProduct = (id) => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => setProducts(products.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  // Filter products
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Management Dashboard</h1>

      <ProductForm
        addProduct={addProduct}
        editingProduct={editingProduct}
        updateProduct={updateProduct}
      />

      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border p-2 mb-6 w-full"
      />

      <ProductList
        products={filteredProducts}
        deleteProduct={deleteProduct}
        setEditingProduct={setEditingProduct}
      />
    </div>
  );
}

export default App;
