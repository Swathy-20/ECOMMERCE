import { generateToken } from "../config/token.js";
import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    
    res.json({
      stats: {
        users,
        products,
        orders: 0,    // Placeholder for future implementation
        revenue: 0    // Placeholder for future implementation
      },
      recentOrders: [],  // Placeholder
      salesData: []      // Placeholder
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerAdmin = async (req, res) => {
  const { name, email, mobile, password, confirmPassword,role } = req.body;
  const adminExists = await Admin.findOne({ email });

  if (adminExists)
    return res.status(400).json({ message: 'Admin already exists' });
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "password not same" })
  }
 

  const admin = await Admin.create({
    name,
    email,
    password,
    role: role || 'admin',
    mobile
  });

  generateToken(res, admin._id);

  res.status(201).json({ _id: admin._id, name: admin.name, email: admin.email, mobile: admin.mobile, role: admin.role });
};


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
//     console.log("Entered:", password);
// console.log("Stored:", admin.password);


//     console.log("Match:", await admin.matchPassword(password));

    if (admin && (await admin.matchPassword(password))) {
      generateToken(res, admin._id);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    }else {
      res.status(401).json({ message: "Invalid credentials" });
    }

   

  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: 'Admin logged out' });
};

export const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('-password');
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json(admin);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const checkAdmin = async (req, res, next) => {
    try {

        res.json({  message: "admin autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};

