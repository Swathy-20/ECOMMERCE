import { Admin } from "../models/adminModel.js";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authAdmin = async(req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Admin Auth Error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

