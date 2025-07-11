import express from "express";
import { faker } from "@faker-js/faker";
import { generateMockUsers } from "../mocks/mockUsers.js"
import { User } from "../models/UserModel.js";
import { Pet } from "../models/PetModel.js";


const router = express.Router();

// GET /mockingpets
router.get("/mockingpets", (req, res) => {
  const pets = Array.from({ length: 10 }, () => ({
    name: faker.animal.cat(),
    type: "cat",
    breed: faker.animal.cat(),
    age: faker.number.int({ min: 1, max: 10 })
  }));

  res.json({ pets });
});

// GET /mockingusers
router.get("/mockingusers", (req, res) => {
  const count = parseInt(req.query.count) || 50
  const users = generateMockUsers(count)
  res.json({ users })
})


// POST /generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;


    if (
      isNaN(users) || isNaN(pets) ||
      users < 0 || pets < 0 ||
      !Number.isInteger(users) || !Number.isInteger(pets)
    ) {
      return res.status(400).json({
        error: "Los campos 'users' y 'pets' deben ser números enteros positivos."
      });
    }

    const existingUsers = await User.countDocuments();
    const existingPets = await Pet.countDocuments();

    if (existingUsers > 0 || existingPets > 0) {
      return res.status(400).json({
        error: "Ya existen usuarios o mascotas en la base de datos. Eliminalos antes de generar nuevos datos."
      });
    }

    const mockUsers = await generateMockUsers(users);
    const insertedUsers = await User.insertMany(mockUsers);

    const mockPets = Array.from({ length: pets }, () => ({
      name: faker.animal.dog(),
      type: "dog",
      breed: faker.animal.dog(),
      age: faker.number.int({ min: 1, max: 10 })
    }));
    const insertedPets = await Pet.insertMany(mockPets);

    res.status(200).json({
      message: "Datos generados correctamente",
      usersCreated: insertedUsers.length,
      petsCreated: insertedPets.length
    });

  } catch (error) {
    console.error("Error al generar datos:", error);
    res.status(500).json({ error: "Error interno al generar datos" });
  }
});

export default router;
