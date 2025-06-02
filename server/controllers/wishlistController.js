import { Wishlist } from "../models/wishlistModel.js";


// @desc    Get wishlist for a user
export const getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;

    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    res.status(200).json({wishlist,message: 'Wishlist fetched successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

// @desc    Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // Create a new wishlist
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      // Avoid duplicates
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

// @desc    Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};
