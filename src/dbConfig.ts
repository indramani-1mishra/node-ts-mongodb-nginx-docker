import mongoose from 'mongoose'

export const connectDb = ()=>{
    mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

}