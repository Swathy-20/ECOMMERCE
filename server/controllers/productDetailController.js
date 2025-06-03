import { cloudinaryInstance } from "../config/cloudinary.js";
import { Category } from "../models/categoryModel.js";
import { Image } from "../models/imageModel.js";
import { ProductDetail } from "../models/productDetailModel.js"
import { Product } from "../models/productModel.js"
import fs from "fs";
import streamifier from 'streamifier';

export const createProductDetail = async (req, res) => {
  try {
    const {
      productId,
      description,
      stock,
      brand,
      category,
      ratings,
      returnPolicy,
      sizes,
      colors,
      specifications,
    } = req.body;
    

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: 'Product not found' });
    }
     const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }
     const adminId = req.admin.id;

    const productDetail = new ProductDetail({
      productId,
      description,
      stock,
      brand,category,
      ratings,
      seller: adminId,
      returnPolicy,
      images: [],
      sizes: JSON.parse(sizes), 
      colors: JSON.parse(colors),
      specifications: JSON.parse(specifications) 
    });

    const savedDetail = await productDetail.save();
    res.status(201).json(savedDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductDetailByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const detail = await ProductDetail.findOne({ productId }
    
    ).populate("productId","name price");
    if (!detail) {
      return res.status(404).json({ message: 'Product Detail not found' });
    }
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const uploadProductDetailImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetail = await ProductDetail.findOne({ productId });

    if (!productDetail) {
      return res.status(404).json({ error: "Product Detail not found" });
    }
    //console.log("Received files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No image files uploaded" });
    }

    const uploadedImages = [];

    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinaryInstance.uploader.upload_stream(
          { folder: "product-details" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });

    // Loop through files and wait for each image to upload
    for (let file of req.files) {
      try {
        const result = await uploadToCloudinary(file.buffer);
        const newImage = new Image({
          imageUrl: result.secure_url,
          thumbnail: false,
        });
        


        const savedImage = await newImage.save();
        uploadedImages.push(savedImage._id);
      } catch (err) {
        // Log and skip failed uploads, but don't send response here
        console.error("Image upload failed:", err.message);
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(500).json({ error: "All image uploads failed" });
    }

    // Update the product detail
    productDetail.images.push(...uploadedImages);
    await productDetail.save();

    return res.status(200).json({
      message: "Images uploaded successfully",
      imageIds: uploadedImages,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    //console.log("Updating detail for productId:", productId);

    const updatedFields = {
      description: req.body.description,
      stock: req.body.stock,
      ratings: req.body.ratings,
      brand: req.body.brand,
      returnPolicy: req.body.returnPolicy,
      sizes: JSON.parse(req.body.sizes || '[]'),
      colors: JSON.parse(req.body.colors || '[]'),
      specifications: JSON.parse(req.body.specifications || '{}')
    };
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
      updatedFields.category = req.body.category;
    }
    



    const updatedDetail = await ProductDetail.findOneAndUpdate({ productId }, updatedFields, {
      new: true,
    });

    if (!updatedDetail) return res.status(404).json({ message: 'Product detail not found' });

    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const deleteProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await ProductDetail.findById(id);
    if (!detail) return res.status(404).json({ message: "Product detail not found" });

    await Image.deleteMany({ _id: { $in: detail.images } });
    await ProductDetail.findByIdAndDelete(id);

    res.status(200).json({ message: "Product detail and images deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
