import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  cardData: { type: Object, require: true},

}, {minimize: false});

const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel;
