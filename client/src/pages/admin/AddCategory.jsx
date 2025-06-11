import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";
import toast from "react-hot-toast";

export const AddCategory = () => {
  const [formData, setFormData] = useState({ name: "", image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      return toast.error("All fields are required");
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);

    try {
      await axiosInstance.post("/admin/category/add-category", data);
      toast.success("Category added successfully");
      navigate("/admin/categories");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};
