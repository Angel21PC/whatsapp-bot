# Usa una imagen oficial de Node.js
FROM node:18

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente al contenedor
COPY . .

# Exponer el puerto (Cloud Run asigna un puerto dinámico)
ENV PORT=8080
EXPOSE 8080

# Comando para ejecutar el bot
CMD ["node", "index.js"]