import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMidldleware from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", authMidldleware, addToCart)
cartRoute.post("/remove", authMidldleware, removeFromCart)
cartRoute.post("/get", authMidldleware, getCart)

export default cartRoute;

