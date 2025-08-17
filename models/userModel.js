const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      maxlength: 10,
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp:{
      type:Number,

    },
    otp_expiry:{
      type:Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
