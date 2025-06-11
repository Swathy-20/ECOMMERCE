import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";

export const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/user/signup", formData, {
        withCredentials: true,
      });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
     <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-5xl flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
       <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-8">
       <img
                src="https://fivedottwelve.com/wp-content/uploads/2022/06/84_ecommerce_2.png"
                alt="Mobile shopping"
                className="w-full h-full max-w-xl md:max-w-md"
              />
          </div>
          <div className="w-full lg:w-1/2 p-10 text-gray-900">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isAdminSignup ? "Admin Sign Up" : "User Sign Up"}
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <p className="text-sm text-gray-500 mb-6">Enter your details below</p>


        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          /> */}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div></div>
     
       </main>
    </div>
  );
};

