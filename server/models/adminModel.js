import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        mobile: {
            type: String,
            required: true,
        },
        role:{
            type: String,
            enum:["admin","seller"],
            required :true

        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //console.log("Hashing password:", this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Add password compare method
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
};


export const Admin = mongoose.model("Admin", adminSchema);