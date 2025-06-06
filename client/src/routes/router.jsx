
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import {Signup} from "../pages/common/Signup";
import {Login} from "../pages/common/Login";
import { MainLayout } from "../layouts/MainLayout";
import { GeneralHome } from "../components/common/GeneralHome";
import { About } from "../pages/common/About";
import { Contact } from "../pages/common/Contact";
import { ProductList } from "../pages/Products/ProductList";
import { ProductDetail } from "../pages/Products/ProductDetail";


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
            element: <Signup />,
        },
        {
            path: "login",
            element: <Login />,
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
            element: <Signup role="admin" />,
        },
        {
            path: "admin/login",
            element: <Login role="admin" />,
        },

    ],
  },
]);


