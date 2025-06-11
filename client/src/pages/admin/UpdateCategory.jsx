import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";
import toast from "react-hot-toast";

export const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", image: null });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(`/admin/category/get-category/${id}`);
        setFormData({ name: res.data.name, image: null });
      } catch (error) {
        toast.error("Failed to fetch category");
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axiosInstance.put(`/admin/category/update-category/${id}`, data);
      toast.success("Category updated successfully");
      navigate("/admin/categories");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Update Category</h2>
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};
