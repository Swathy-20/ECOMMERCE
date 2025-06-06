import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {axiosInstance} from "../../config/axioInstance";

export const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminSignup = location.pathname.includes("admin");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  //const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const submissionData = new FormData();
    for (let key in formData) {
      submissionData.append(key, formData[key]);
    }

    // if (profilePic) {
    //   submissionData.append("profilePic", profilePic);
    // }

    if (isAdminSignup) {
      submissionData.append("role", "admin"); // optional if your backend auto assigns
    }

    try {
      const endpoint = isAdminSignup
        ? "/admin/signup"
        : "/user/signup";

      await axiosInstance.post(endpoint, submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
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

