// src/app.js

import express from "express";
import { connectDB } from "./db.js";
import mocksRouter from "./routers/mocks.router.js";
import usersRouter from "./routers/users.router.js";
import { Pet } from "./models/PetModel.js";
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express();
app.use(express.json());

app.use("/api/mocks", mocksRouter);

app.use("/api/users", usersRouter);

app.get("/pets", async (_, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

connectDB();
const swaggerDocument = YAML.load('./docs/swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor en puerto ${PORT}`));
