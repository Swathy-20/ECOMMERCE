import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import { User } from "../models/userModel.js";

// Register
export const registerUser = async (req, res) => {
  const { name, email, mobile, password, confirmPassword} = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: 'User already exists' });
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "password not same" })
  }
  let profilePicUrl = "";
    if (req.file) {
      const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path, {
        folder: "user-profiles",
      });
      profilePicUrl = cloudinaryRes.secure_url;
    
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    mobile,
    profilePic: profilePicUrl
   
  });
 
  generateToken(res, user._id);

  res.status(201).json({ _id: user._id, name: user.name, email: user.email, mobile: user.mobile });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  generateToken(res, user._id);

  res.json({ _id: user._id, name: user.name, email: user.email });
};

// Logout
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.json({ message: 'Logged out successfully' });
};

// Get user profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const checkUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     console.log("✅ User from DB:", user);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user", 
    });
  } catch (error) {
    console.error("❌ Error checking user:", error.message);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

