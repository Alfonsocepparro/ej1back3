// src/app.js

import express from "express";
import { connectDB } from "./db.js";
import mocksRouter from "./routers/mocks.router.js";
import { User } from "./models/UserModel.js";
import { Pet } from "./models/PetModel.js";

const app = express();
app.use(express.json());

app.use("/api/mocks", mocksRouter);

app.get("/users", async (_, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/pets", async (_, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

connectDB();

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor en puerto ${PORT}`));
