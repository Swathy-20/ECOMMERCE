import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react"; 
import { axiosInstance } from "../../config/axioInstance"; 

export const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("authAdmin"));
    if (!storedAdmin) {
      navigate("/admin/login");
    } else {
      setAdmin(storedAdmin);
    }
  }, [navigate]);

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
     

      {/* Profile Content */}
      <main className="flex-1 p-6 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
              <UserCircle size={80} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{admin.name}</h1>
              <p className="text-gray-500">{admin.email}</p>
              <span className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full mt-2 inline-block">
                {admin.role || "Admin"}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Email</span>
              <span>{admin.email}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="font-medium">Role</span>
              <span>{admin.role || "Admin"}</span>
            </div>
            <div className="flex justify-between text-gray-600">
    <span className="font-medium">Status</span>
    <span
      className={`font-semibold ${
        admin.isActive ? "text-green-600" : "text-red-500"
      }`}
    >
      {admin.isActive ? "Active" : "Inactive"}
    </span>
  </div>
          </div>

          <div className="mt-6 text-right">
            <button
  onClick={async () => {
    try {
      await axiosInstance.get("/admin/logout", { withCredentials: true });
      localStorage.removeItem("authAdmin");  
      navigate("/admin/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
>
  Logout
</button>
          </div>
        </div>
      </main>
    </div>
  );
};


