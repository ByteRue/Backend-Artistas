import express from 'express';
import Artista from '../models/artista.js';

const router = express.Router();

// Ruta para guardar un nuevo artista
router.post('/', async (req, res) => {
    try {
        const { name, category, profilePhoto, information, shortInformation, links } = req.body;
        const nuevoArtista = new Artista({ name, category, profilePhoto, information, shortInformation, links });
        await nuevoArtista.save();
        res.status(201).json({ message: 'Artista creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el artista', error });
    }
});

// Ruta para obtener todos los artistas
router.get('/', async (req, res) => {
    try {
        const artistas = await Artista.find();
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los artistas', error });
    }
});

export default router;
