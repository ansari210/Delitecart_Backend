const mongoose = require("mongoose");

const querSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
    },
    receiver_comm_message:{
      type:String,
      required:true
    },
     store_data:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("query", querSchema);
