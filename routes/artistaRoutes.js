import express from 'express';
import fs from 'fs';
import path from 'path';
import Artista from '../models/artista.js';

const router = express.Router();

// Ruta para crear un nuevo artista
router.post('/', async (req, res) => {
    try {
        const { nombre, categoria, descripcion, imagen, instagram, spotify } = req.body;

        // Crear nuevo artista en la base de datos
        const nuevoArtista = new Artista({ nombre, categoria, descripcion, imagen, instagram, spotify });
        await nuevoArtista.save();

        // Generar archivo de perfil
        const perfilHTML = generarPerfilHTML(nuevoArtista);
        const perfilPath = path.join('public/perfiles', `${nombre.replace(/\s+/g, '_')}.html`);
        
        fs.writeFileSync(perfilPath, perfilHTML);

        // Enviar respuesta con la URL del perfil
        res.status(201).json({
            message: "Perfil creado exitosamente",
            perfilURL: `/perfiles/${nombre.replace(/\s+/g, '_')}.html`
        });

    } catch (error) {
        console.error("Error al crear el perfil:", error);
        res.status(500).json({ error: "Error al crear el perfil" });
    }
});

// Función para generar el perfil HTML con la plantilla
function generarPerfilHTML(artista) {
    return `
    <!DOCTYPE html> 
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${artista.nombre} - Nerby Creatives</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body { background: url('') no-repeat center center/cover; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .container { width: 80vw; height: 80vh; background: rgba(255, 255, 255, 0.545); border-radius: 50px; display: flex; overflow: hidden; position: relative; }
            .left-section { width: 50%; padding: 20px; text-align: left; }
            .right-section { width: 50%; display: flex; justify-content: center; align-items: center; }
            .text-box h1 { font-size: 2.5rem; }
            .instagram-link a { color: rgb(97, 6, 157); text-decoration: none; }
            .instagram-link a:hover { color: rgb(42, 0, 67); }
            .back-button { position: absolute; top: 20px; left: 20px; background: rgba(109, 109, 109, 0.419); color: white; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <button class="back-button" onclick="window.history.back();">Volver</button>
        <div class="container">
            <div class="left-section">
                <div class="text-box">
                    <h1>${artista.nombre}</h1>
                    <p>${artista.descripcion}</p>
                </div>
                <div class="instagram-link">
                    ${artista.spotify ? `<a href="${artista.spotify}" target="_blank">Spotify</a>` : ""}
                    ${artista.instagram ? `<a href="${artista.instagram}" target="_blank">Instagram</a>` : ""}
                </div>
            </div>
            <div class="right-section">
                <img src="${artista.imagen}" alt="Imagen de ${artista.nombre}" style="width: 100%; border-radius: 10px;">
            </div>
        </div>
    </body>
    </html>
    `;
}

export default router;
