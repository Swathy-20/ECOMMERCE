import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axioInstance";

export const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get(`/wishlist/get-wishlist/${userId}`);
      setWishlist(res.data.wishlist.products);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axiosInstance.post(`/wishlist/remove-from-wishlist`, { userId, productId });
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-10">Wishlist</h2>
      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]?.imageUrl || "https://via.placeholder.com/80"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600 font-semibold">₹{item.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item._id)}
              className="border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
