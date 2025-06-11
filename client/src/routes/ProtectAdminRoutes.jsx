import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectAdminRoutes = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authAdmin = JSON.parse(localStorage.getItem("authAdmin"));
    if (!authAdmin || !authAdmin._id) {
      navigate("/admin/login", { replace: true });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) return <div className="text-center p-10">Redirecting...</div>;

  return <Outlet />;
};
