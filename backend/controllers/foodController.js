import foodModel from "../models/foodmodels.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    image: image_filename,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
    time: req.body.time,
  });
  try {
    await food.save();

    res.json({ success: true, message: "Món ăn đã được thêm" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Món ăn đã được xóa" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi" });
  }
};

//update food item
const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    let updateData = {};

    // Kiểm tra và thêm các trường cần update
    if (req.body.name) updateData.name = req.body.name;
    if (req.file) {
      let image_filename = `${req.file.filename}`;
      updateData.image = image_filename;
    }
    if (req.body.price) updateData.price = req.body.price;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.amount) updateData.amount = req.body.amount;
    if (req.body.time) updateData.time = req.body.time;

    const updatedFood = await foodModel.findByIdAndUpdate(foodId, updateData, {
      new: true,
    });

    if (!updatedFood) {
      return res.json({
        success: false,
        message: "Không tìm thấy món ăn để cập nhật",
      });
    }

    // Xóa ảnh cũ nếu có sự thay đổi ảnh
    if (req.file && updatedFood.image) {
      fs.unlink(`uploads/${updatedFood.image}`, () => {});
    }

    res.json({
      success: true,
      message: "Món ăn đã được cập nhật",
      data: updatedFood,
    });
  } catch (error) {
    res.json({ success: false, message: "Lỗi" });
  }
};

export { addFood, listFood, removeFood, updateFood };
