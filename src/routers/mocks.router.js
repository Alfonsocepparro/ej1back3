import express from "express";
import { faker } from "@faker-js/faker";
import { generateMockUsers } from "../mocks/mockUsers.js";
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
router.get("/mockingusers", async (req, res) => {
  const users = await generateMockUsers(50);
  res.json({ users });
});

// POST /generateData
router.post("/generateData", async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  const mockUsers = await generateMockUsers(users);
  const insertedUsers = await User.insertMany(mockUsers);

  const mockPets = Array.from({ length: pets }, () => ({
    name: faker.animal.dog(),
    type: "dog",
    breed: faker.animal.dog(),
    age: faker.number.int({ min: 1, max: 10 })
  }));
  const insertedPets = await Pet.insertMany(mockPets);

  res.json({
    message: "Datos generados correctamente",
    usersCreated: insertedUsers.length,
    petsCreated: insertedPets.length
  });
});

export default router;
