# img
FROM node:20

# Crear workdir
WORKDIR /app

# Copiar archivos
COPY . .

# I dependencias
RUN npm install

# puerto
EXPOSE 3000

#correr app
CMD ["npm", "start"]
