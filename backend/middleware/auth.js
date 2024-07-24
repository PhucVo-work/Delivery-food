import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

const authMidldleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Xác thực hết hạn, vui lòng đăng nhập lại",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

export default authMidldleware;
