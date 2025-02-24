import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import fetch from "node-fetch";
// Crear una nueva instancia del cliente
const client = new Client();

client.on("qr", (qr) => {
  console.log("Escanea este QR con tu WhatsApp:", qr);
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Cliente está listo!");
});

// Escuchar mensajes entrantes
client.on("message", (message) => {
  console.log(`Mensaje recibido de ${message.from}: ${message.body}`);

  // Responder automáticamente si el mensaje contiene "hola"
  //   if (message.body.toLowerCase() === "hola") {
  //     message.reply("¡Hola! ¿Cómo estás?");
  //   }
  if (message.from.endsWith("@g.us")) {
    console.log(`📢 Mensaje en grupo ${message.from}: ${message.body}`);
    addTrackToPlaylist(
      "6bgwG0DyDO7pGuTRe65kWm	",
      message.body,
      "BQBGMwQ4JI00rEj37quX3cAguDI5oXp3FUk1LfWudyFD0uPkIokafTS-YKhjxAHJU--gotSu1_I9aDjTF1-ncYbYZtn8gjyAwQZCOVwI1OXJY4fBAxTVSGLxn6p--A9gm3g6GLJNumRQIKFuPJB_yYIXUF7lG8c1DpFrmKStfEzD4hnp5QOfE-Msxzb_XI3hhLvxOArBRhRT0Gq_KfgNp0WMS0uvlGWHHYjmsX6fHOnFrH-Ujp68_bC9W7YUA7irZOg8QCjBRaQx7atyLt0xXC3VkFKtVOHkBbA"
    );
  }
});

client.on("message_create", (message) => {
  console.log(`Mensaje enviado por el bot: ${message.body}`);

  // Comprobar si es un mensaje en grupo
  if (message.from.endsWith("@g.us")) {
    console.log("📤 Mensaje enviado a un grupo:", message.from);
  }
  addTrackToPlaylist(
    "6bgwG0DyDO7pGuTRe65kWm	",
    message.body,
    "BQBGMwQ4JI00rEj37quX3cAguDI5oXp3FUk1LfWudyFD0uPkIokafTS-YKhjxAHJU--gotSu1_I9aDjTF1-ncYbYZtn8gjyAwQZCOVwI1OXJY4fBAxTVSGLxn6p--A9gm3g6GLJNumRQIKFuPJB_yYIXUF7lG8c1DpFrmKStfEzD4hnp5QOfE-Msxzb_XI3hhLvxOArBRhRT0Gq_KfgNp0WMS0uvlGWHHYjmsX6fHOnFrH-Ujp68_bC9W7YUA7irZOg8QCjBRaQx7atyLt0xXC3VkFKtVOHkBbA"
  );
});

client.initialize();

// spotify

async function addTrackToPlaylist(playlistId, trackUrl, accessToken) {
  try {
    // Extraer el track ID de la URL de Spotify
    const trackIdMatch = trackUrl.match(/track\/([a-zA-Z0-9]+)/);
    if (!trackIdMatch) {
      throw new Error("URL de canción no válida.");
    }
    const trackId = trackIdMatch[1];

    // Endpoint de Spotify para agregar canciones a una playlist
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    // Petición a la API de Spotify
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`],
      }),
    });

    // Revisar la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en la solicitud: ${errorData.error.message}`);
    }

    console.log("Canción agregada exitosamente a la playlist.");
    return await response.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
