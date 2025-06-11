import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";
import { Header } from "../../components/common/Header";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/admin/login", formData, {
        withCredentials: true,
      });
      localStorage.setItem("authAdmin", JSON.stringify(res.data));
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
    <Header/>
    <main className="flex-1 flex items-center justify-center px-4 py-12">


     
        <div className="flex w-full max-w-5xl flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
          <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-8">
           <img
                src="https://fivedottwelve.com/wp-content/uploads/2022/06/84_ecommerce_2.png"
                alt="Mobile shopping"
                className="w-full max-w-xl md:max-w-md"
              />
          </div>
            <div className="w-full lg:w-1/2 p-10">


        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Log in</h2>
            <p className="text-sm text-gray-500 mb-6">Enter your details below</p>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  </main>
</div>
);
};
