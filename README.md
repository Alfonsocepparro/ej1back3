Proyecto Node.js con Express, MongoDB, Docker, Swagger y Tests funcionales.
Cómo correr el proyecto:
Clonar el repositorio

En bash
Copiar
Editar
git clone url-del-repo
cd carpeta-del-proyecto

Instalar dependencias
npm i
levantar en desarrollo 
npm run dev

correr con docker
build: docker build -t acepparro/entrega-back3:latest .
run: docker-compose up

Imagen subida a DockerHub:
https://hub.docker.com/r/alfoncepparro/entrega-back3

test funcionales:
mpm test
Se testean:

Crear adopción

Obtener todas las adopciones

Obtener por ID

Manejo de errores (petición vacía)

Eliminar adopción
swagger:
acceso: http://localhost:3000/api-docs
GET /api/users

GET /api/users/:uid

modelos: pet, user, adoption

Autor: Alfonso Cepparro
