import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
 
    Name: {
      type: String,
      required:true,
    },
    Email: {
      type: String,
      required:true,
    },
   
  },
  { timestamps: true } // Add the timestamps option to automatically create createdAt and updatedAt fields
);
const userModel = new mongoose.model("testuser", userSchema);
export default userModel;