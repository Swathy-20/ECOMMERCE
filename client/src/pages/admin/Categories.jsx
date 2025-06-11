import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";
import toast from "react-hot-toast";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category/get-categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axiosInstance.delete(`/admin/category/delete-category/${id}`);
        toast.success("Category deleted");
        fetchCategories(); // Refresh after delete
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update-category/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/add-category");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white p-4 shadow rounded-lg flex flex-col items-center text-center"
            >
              <img
                src={`http://localhost:5000/${category.image}`}
                alt={category.name}
                className="w-32 h-32 object-cover rounded-full mb-3"
              />
              <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleUpdate(category._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
