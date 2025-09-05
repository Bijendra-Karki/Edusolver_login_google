import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // make sure .env is loaded

mongoose.connect(process.env.DATABASE, {
  
})
.then(() => console.log("✅ Database connected"))
.catch(err => console.error("❌ Database connection error:", err));
