
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectRoutes } from "./ProtectRoutes";
import { MainLayout } from "../layouts/MainLayout";
import { GeneralHome } from "../components/common/GeneralHome";
import { About } from "../pages/common/About";
import { Contact } from "../pages/common/Contact";
import { ProductList } from "../pages/Products/ProductList";
import { ProductDetail } from "../pages/Products/ProductDetail";
import { Wishlist } from "../pages/User/Wishlist";
import { ProtectAdminRoutes } from "./ProtectAdminRoutes";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminLayout } from "../layouts/AdminLayout";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { UserSignup } from "../pages/user/UserSignup";
import { AdminSignup } from "../pages/admin/AdminSignup";
import { AddProduct } from "../pages/admin/AddProduct";
import { AddProductDetail } from "../pages/admin/AddProductDetail";
import { Categories } from "../pages/admin/Categories";
import { AddCategory } from "../pages/admin/AddCategory";
import { UpdateCategory } from "../pages/admin/UpdateCategory";
import { UserLogin } from "../pages/user/Userlogin";
import { Profile } from "../components/user/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <GeneralHome />,
        },
        {
            path: "signup",
            element: <UserSignup />,
        },
        {
            path: "login",
            element: <UserLogin />,
        },
        {
              path: "about",
              element: <About />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
            {
              path: "products",
              element: <ProductList />,
            },
            
            {
              path: "product-detail/getproductById/:productId",
              element: <ProductDetail />,
            },

        {
            path: "admin/signup",
            element: <AdminSignup />,
        },
        {
            path: "admin/login",
            element: <AdminLogin/>,
        },
        {
              path: "user",
              element: <ProtectRoutes />,
              children: [
                // { path: "home", element: <Home /> },
                { path: "profile", element: <Profile /> },
                { path: "wishlist", element: <Wishlist /> },
                // { path: "cart", element: <CartPage /> },
                { path: "payment", element: <h1>Payment</h1> },
                { path: "payment/success", element: <h1>Payment Success</h1> },
                { path: "payment/cancel", element: <h1>Payment Cancelled</h1> },
               ],
            },
            {
  path: "/admin",
  element: <ProtectAdminRoutes />, 
  children: [
    {
      path: "",
      element: <AdminLayout />, 
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "profile", element: <AdminProfile /> },
        { path: "add-product", element: <AddProduct /> },
        { path: "add-product-detail", element: <AddProductDetail /> },
        { path: "add-product-detail/:productId", element: <AddProductDetail /> },
        { path: "categories", element: <Categories /> },
        { path: "add-category", element: <AddCategory /> },
        { path: "update-category/:id", element: <UpdateCategory /> },

      ],
    },
  ],
}


    ],
  },
]);
