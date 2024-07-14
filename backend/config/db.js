import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://phuc111239:111239@cluster0.7n5cbwd.mongodb.net/FoodDelivery').then(() => console.log("DB Connected"));
}

