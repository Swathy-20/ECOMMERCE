import React, { useState } from "react";
import { axiosInstance } from "../../config/axioInstance";

export const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Step 1: Create the product
      const res = await axiosInstance.post("/product/create-product", formData);
      const productId = res.data.saved._id;

      // Step 2: Upload the image (if selected)
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);

        await axiosInstance.post(`/product/image/${productId}`, formDataImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setMessage("Product created successfully");
      setFormData({ name: "", price: "" });
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Product
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};
