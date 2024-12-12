import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  }, // Only for non-Google signup
  avatar: { type: String },
  authSource: {
    enum: ["self", "google"],
  },
  createdAt: { type: Date, default: Date.now },
});

// const userModel = mongoose.model("user", userSchema);
export default mongoose.model("User", userSchema);
