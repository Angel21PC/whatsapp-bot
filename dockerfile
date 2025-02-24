FROM node:18-slim

# Instala Chromium y sus dependencias
RUN apt-get update && \
    apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias de Node
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Configura la variable de entorno para indicar la ruta de Chromium
ENV CHROME_BIN=/usr/bin/chromium

CMD ["node", "index.js"]