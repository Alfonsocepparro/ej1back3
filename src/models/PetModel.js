import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
});

export const Pet = mongoose.model("Pet", petSchema);
