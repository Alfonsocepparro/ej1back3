import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Usuarios",
      version: "1.0.0",
      description: "Documentación de la API de Users"
    }
  },
  apis: ['./src/routers/*.js'] 
};

const specs = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
