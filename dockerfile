FROM node:18-slim

# Instala Chromium y sus dependencias
RUN apt-get update && \
    apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Configura la variable de entorno para indicar la ruta de Chromium
ENV CHROME_BIN=/usr/bin/chromium

CMD ["node", "index.js"]