
import express from "express";
import mocksRouter from "./routers/mocks.router.js";
import usersRouter from "./routers/users.router.js";
import adoptionRouter from "./routers/adoption.router.js";
import { Pet } from "./models/PetModel.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

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
const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
