import { cloudinaryInstance } from "../config/cloudinary.js";
import { Image } from "../models/imageModel.js";
import { ProductDetail } from "../models/productDetailModel.js";
import { Product } from "../models/productModel.js"
import streamifier from "streamifier";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    
        const newProduct = new Product({ 
          name, 
          price, 
          category: category || 'other'
        });
    const saved = await newProduct.save();

        res.status(201).json({saved, message: "Product created successfully"});
      
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("image");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadProductImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const uploadStream = cloudinaryInstance.uploader.upload_stream(
      { folder: "products" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const newImage = await Image.create({ imageUrl: result.secure_url, thumbnail: true, product: productId });
        product.image = newImage._id;
        await product.save();

        res.status(200).json(newImage);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;

   
   
          const updated = await product.save();
          res.status(200).json(updated);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      
  };

export const deleteProduct = async (req, res) => {
    try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await Image.deleteMany({ _id: { $in: product.image } });
    await ProductDetail.deleteMany({ productId });
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product and associated data deleted" });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const detail = await Product.findOne({ _id: productId });
    if (!detail) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({ category: categoryName }).populate("image");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
