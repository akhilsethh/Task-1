import React, { useState, useEffect } from "react";

const ProductForm = ({ addProduct, editingProduct, updateProduct }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setDescription(editingProduct.description);
      setImage(editingProduct.image);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { title, price, category, description, image };

    if (editingProduct) {
      updateProduct(editingProduct.id, product);
    } else {
      addProduct(product);
    }

    setTitle(""); setPrice(""); setCategory(""); setDescription(""); setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6 shadow">
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 mb-2 w-full" required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="border p-2 mb-2 w-full" required />
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="border p-2 mb-2 w-full" required />
      <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="border p-2 mb-2 w-full" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 mb-2 w-full" required />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        {editingProduct ? "Update" : "Add"} Product
      </button>
    </form>
  );
};

export default ProductForm;
