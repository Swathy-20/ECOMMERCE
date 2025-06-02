// controllers/imageController.js
import  { cloudinaryInstance } from '../config/cloudinary.js';
import {Image} from '../models/Image.js';
import streamifier from 'streamifier';

// Upload image to Cloudinary and save info to DB
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const { thumbnail } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    // Upload to Cloudinary
    const result = cloudinaryInstance.uploader.upload_stream(
        { folder: 'uploads' },
        async (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Cloudinary upload failed', error });
            }

            const newImage = new Image({
                imageUrl: result.secure_url,
                thumbnail: thumbnail === 'true', // because it's sent as a string from form-data
            });

            const savedImage = await newImage.save();
            res.status(201).json(savedImage);
        }
    );

    // Pipe the file buffer to cloudinary stream
    streamifier.createReadStream(file.buffer).pipe(result);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading image', error: err });
  }
};


