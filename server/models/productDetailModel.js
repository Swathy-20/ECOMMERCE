import mongoose from "mongoose";

const productDetailSchema = new mongoose.Schema(
  {
    productId: { 
      type: mongoose.Schema.Types.ObjectId, ref: "Product", 
      required: true },
    
    description: { 
        type: String, 
        required: true 
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },

    brand: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },

    ratings: {
        type: Number,
        default: 0
    },
   colors: [{ type: String }],
   sizes: [{ type: String }],
   specifications: {
     weight: { type: String },
     material: { type: String },
   },

   returnPolicy: { type: String },
 },
 { timestamps: true }
);

export const ProductDetail = mongoose.model("ProductDetail", productDetailSchema);