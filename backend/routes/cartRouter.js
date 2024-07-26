import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMidldleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMidldleware, addToCart)
cartRouter.post("/remove", authMidldleware, removeFromCart)
cartRouter.post("/get", authMidldleware, getCart)

export default cartRouter;

