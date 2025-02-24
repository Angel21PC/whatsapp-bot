FROM node:18-slim

# Actualiza e instala chromium-browser
RUN apt-get update && \
    apt-get install -y chromium-browser && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Establece la variable con la ruta correcta del binario
ENV CHROME_BIN=/usr/bin/chromium-browser

CMD ["node", "index.js"]