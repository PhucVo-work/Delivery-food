import express from "express"
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js"
import multer from "multer"

// Với router này chúng ta có thể sử dụng hầu hết các phương thức của CRUD (GET, POST, PUT, PATCH, DELETE)
const foodRouter = express.Router(); 

//image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
//create 
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)
// Route để cập nhật món ăn
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter