import mongoose,{Schema} from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    
    image: {
      type: String, // Store Cloudinary image URL or filename
      default: '',
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', categorySchema);

