import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance";
// import { FaHeart, FaRegHeart,FaStar } from "react-icons/fa";
import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [detail, setDetail] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosInstance.get(`/product-detail/getproductById/${productId}`);
        const detail = res.data;
        const imageRes = await Promise.all(
          detail.images.map((imgId) =>
            axiosInstance.get(`/image/get-image/${imgId}`).then((res) => res.data)
          )
        );
        setImages(imageRes);
        setMainImage(imageRes[0]);
        setDetail(detail);
        setSelectedColor(detail.colors[0]);
        setSelectedSize(detail.sizes[0]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load product detail:", err);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [productId]);

  const handleWishlist = async () => {
    //console.log("Wishlist button clicked");

  const authUser = JSON.parse(localStorage.getItem("authUser"));
 

  if (!authUser || !authUser.user?._id) {
    alert("Please login or signup to add to wishlist.");
    return;
  }

  const userId = authUser.user._id;
   try {
    if (wishlist) {
      // REMOVE from wishlist
      await axiosInstance.delete("/wishlist/remove-from-wishlist", {
        data: { userId, productId },
      });
      setWishlist(false);
      toast.success("Removed from wishlist");
    } else {
      // ADD to wishlist
      await axiosInstance.post("/wishlist/add-to-wishlist", { userId, productId });
      setWishlist(true);
      toast.success("Added to wishlist");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Wishlist operation failed");
  }

 
};

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!detail) return <div className="text-center p-10">No product found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left: Images */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 md:w-1/5">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                className={`cursor-pointer w-20 h-20 object-cover rounded border-2 ${
                  mainImage?.imageUrl === img.imageUrl ? "border-indigo-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={mainImage?.imageUrl}
              alt="Main Product"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right: Main Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{detail.productId.name}</h2>
          <p className="text-gray-600 mb-2">{detail.description}</p>
          <p className="text-indigo-600 text-xl font-semibold mb-4">₹{detail.productId.price}</p>

          {/* Ratings with Star Icon */}
          <div className="flex items-center mb-4 text-yellow-500">
        <AiFillStar />
        <span className="ml-1 text-black">{detail.ratings} star</span>
      </div>
          {/* Color Options */}
          <div className="mb-4">
            <p className="text-sm font-medium">Color:</p>
            <div className="flex gap-2 mt-1">
              {detail.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded border ${
                    selectedColor === color ? "bg-indigo-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mb-4">
            <p className="text-sm font-medium">Size:</p>
            <div className="flex gap-2 mt-1">
              {detail.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded border ${
                    selectedSize === size ? "bg-indigo-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow">
              Add to Cart
            </button>
             <button
              style={{ zIndex: 10 }}
          onClick={handleWishlist}
          className={`flex items-center gap-1 border px-4 py-2 rounded ${
            wishlist ? "border-red-500  text-red-500" : ""
          }`}
        >
          <AiOutlineHeart />
          Wishlist
        </button>

           
            <button
              className="text-indigo-600 underline"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* Additional Info */}
          {showMore && (
            <div className="mt-4 text-sm space-y-1">
              <p><strong>Brand:</strong> {detail.brand}</p>
              <p><strong>Stock:</strong> {detail.stock}</p>
              <p><strong>Return Policy:</strong> {detail.returnPolicy}</p>
              <p><strong>Specifications:</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Weight: {detail.specifications.weight}</li>
                <li>Material: {detail.specifications.material}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
