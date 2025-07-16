
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/mock-db");
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar con Mongo:", err.message);
  }
};
