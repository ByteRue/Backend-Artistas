import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer'; // Importamos multer
import Artista from '../models/artista.js';

const router = express.Router();

// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    },
});
const upload = multer({ storage });

// Ruta para subir imágenes
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const fileURL = `/uploads/${req.file.filename}`; // URL del archivo subido
        res.status(200).json({ url: fileURL });
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).json({ error: 'Error al subir el archivo' });
    }
});

// Ruta para crear un nuevo artista
router.post('/', async (req, res) => {
    try {
        console.log(req.body);  // Verifica los datos que llegan desde el frontend

        const { nombre, categoria, descripcion, imagen, instagram, spotify } = req.body;

        // Verifica si todos los campos necesarios están presentes
        if (!nombre || !categoria || !descripcion || !imagen) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        // Crear nuevo artista en la base de datos
        const nuevoArtista = new Artista({ nombre, categoria, descripcion, imagen, instagram, spotify });
        await nuevoArtista.save();

        // Generar archivo de perfil
        const perfilHTML = generarPerfilHTML(nuevoArtista);
        const perfilPath = path.join('public/perfiles', `${nombre.replace(/\s+/g, '_')}.html`);

        // Asegúrate de que la carpeta exista, si no la creas
        if (!fs.existsSync('public/perfiles')) {
            fs.mkdirSync('public/perfiles', { recursive: true });
        }

        fs.writeFileSync(perfilPath, perfilHTML);

        // Enviar respuesta con la URL del perfil
        res.status(201).json({
            message: 'Perfil creado exitosamente',
            perfilURL: `/perfiles/${nombre.replace(/\s+/g, '_')}.html`,
        });
    } catch (error) {
        console.error('Error al crear el perfil:', error);
        res.status(500).json({ error: 'Error al crear el perfil' });
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
                    ${artista.spotify ? `<a href="${artista.spotify}" target="_blank">Spotify</a>` : ''}
                    ${artista.instagram ? `<a href="${artista.instagram}" target="_blank">Instagram</a>` : ''}
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

