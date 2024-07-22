import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //kiểm tra xem tài khoản đã được tạo hay chưa
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Tài khoản đã tồn tại" });
    }

    // validating email format and strong password (kiểm tra xem email và password có đủ diều kiện chưa)
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đúng địa chỉ email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Mật khẩu không được thấp hơn 8 ký tự",
      });
    }

    // hashing user password (mã hóa mật khẩu)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success: true, token})
    
} catch (error) {
    console.log(error);
    res.json({success: false, message:"Lỗi"})
  }
};

export { loginUser, registerUser };
