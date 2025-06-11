import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ['clothing', 'electronics', 'home', 'beauty', 'other'],
      default: 'other'
    },
    
    image: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
    
  
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
