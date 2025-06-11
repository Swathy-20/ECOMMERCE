import React, { useEffect, useState }  from "react";
import { Outlet,useLocation} from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import {  useSelector,useDispatch } from "react-redux";
import { axiosInstance } from "../config/axioInstance";

import { clearUser, saveUser } from "../redux/features/userSlice";
import { UserHeader } from "../components/user/UserHeader";
import { AdminHeader } from "../components/admin/AdminHeader";


export const MainLayout = () => {
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
  
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/user/check-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("✅ check-user response:", response.data);
        dispatch(saveUser(response.data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setIsLoading(false);
      }
    };
  
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/admin/check-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(saveUser(response.data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      if (isAdminRoute) {
        checkAdmin();
      } else {
        checkUser();
      }
    }, [location.pathname]);
    useEffect(() => {
  console.log("Redux user state:", user);
}, [user]);
  
    return isLoading ? null : (
      <div>
        {!isAdminRoute && (user?.isUserAuth ? <UserHeader /> : <Header />)}
  
        <div className="min-h-96">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };
