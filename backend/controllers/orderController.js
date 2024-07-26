import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// hiển thị những đơn đặt hàng của người dùng ở frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 10,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "vnd",
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: 20 * 100 * 10,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Đã thanh toán" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Chưa thanh toán" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

// theo dõi Đơn hàng cho người dùng
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

// theo dõi đơn hàng người dùng của admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success: true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Lỗi"})
  }
}

// api cho việc cập nhật trạng thái đơn hàng
const updateStatus = async (req,res) => {
  try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Cập nhật trạng thái"})
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Lỗi"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
