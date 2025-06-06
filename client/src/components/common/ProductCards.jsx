import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
      const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden">
       <div
        className="cursor-pointer"
        onClick={() => navigate(`/product-detail/getproductById/${product._id}`)}
      >
        <img
          src={product?.image?.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
       
        <div className="flex justify-between items-center mt-3">
          <span className="text-indigo-600 font-bold text-lg">₹{product.price}</span>
         
        </div>
      </div>
    </div>
  );
};


