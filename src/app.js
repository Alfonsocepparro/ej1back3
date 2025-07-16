import express from "express";
import mocksRouter from "./routers/mocks.router.js";
import usersRouter from "./routers/users.router.js";
import adoptionRouter from "./routers/adoption.router.js";
import { Pet } from "./models/PetModel.js";
import { swaggerDocs } from './docs/swagger.js';

const app = express();

app.use(express.json());

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/adoptions", adoptionRouter);

app.get("/pets", async (_, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

// Swagger jagger
swaggerDocs(app);

export default app;
