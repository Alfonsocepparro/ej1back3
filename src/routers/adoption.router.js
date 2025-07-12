import express from "express";
import { Adoption } from "../models/AdoptionModel.js";
import { User } from "../models/UserModel.js";
import { Pet } from "../models/PetModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate("user pet");
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener adopciones" });
  }
});

// GET :id
router.get("/:id", async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate("user pet");
    if (!adoption) {
      return res.status(404).json({ error: "Adopción no encontrada" });
    }
    res.json(adoption);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la adopción" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, pet } = req.body;
    if (!user || !pet) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const existingUser = await User.findById(user);
    const existingPet = await Pet.findById(pet);
    if (!existingUser || !existingPet) {
      return res.status(404).json({ error: "Usuario o mascota no encontrados" });
    }

    const adoption = new Adoption({ user, pet });
    const saved = await adoption.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear adopción:", error);
    res.status(500).json({ error: "Error interno al crear adopción" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Adoption.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Adopción no encontrada" });
    }
    res.json({ message: "Adopción eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la adopción" });
  }
});

export default router;
