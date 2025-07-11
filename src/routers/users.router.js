import express from "express";
import { User } from "../models/UserModel.js";

const router = express.Router();

/* GET*/
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

/* GET id*/
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

/* POST*/
router.post("/", async (req, res) => {
  const { first_name, last_name, email, password, role, pets } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  try {
    const newUser = new User({ first_name, last_name, email, password, role, pets });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});


/* DELETE */
router.delete("/:uid", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.uid);
    if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
