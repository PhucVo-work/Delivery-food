import foodModel from "../models/foodmodels.js";
import fs from 'fs'

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
        time: req.body.time
    })
    try{
        await food.save();
        res.json({success: true, message:"Món ăn đã được thêm"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Lỗi"})
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Lỗi"})
    }
}


//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Món ăn đã được xóa"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Lỗi"})
    }
}
export {addFood, listFood, removeFood}

// CÓ THỂ THÊM CÁC PHƯƠNG THỨC KHÁC NHƯ DELETE, UPDATE