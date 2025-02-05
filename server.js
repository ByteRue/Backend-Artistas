const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/artistasDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de artista
const artistaSchema = new mongoose.Schema({
    id: String,
    name: String,
    category: String,
    profilePhoto: String,
    information: String,
    shortInformation: String,
    gallery: [String],
    links: [String]
});

const Artista = mongoose.model('Artista', artistaSchema);

// Endpoint: Obtener listado de artistas
app.get('/artistas/', async (req, res) => {
    try {
        const artistas = await Artista.find({}, 'id name category profilePhoto shortInformation');
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los artistas', error });
    }
});

// Endpoint: Obtener perfil de un artista específico
app.get('/artistas/:id', async (req, res) => {
    try {
        const artista = await Artista.findOne({ id: req.params.id });
        if (!artista) {
            return res.status(404).json({ message: 'Artista no encontrado' });
        }
        res.json(artista);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil del artista', error });
    }
});

// Endpoint: Añadir un nuevo artista
app.put('/añadirArtista', async (req, res) => {
    try {
        const { id, name, category, profilePhoto, information, shortInformation, gallery, links } = req.body;

        const nuevoArtista = new Artista({
            id,
            name,
            category,
            profilePhoto,
            information,
            shortInformation,
            gallery,
            links
        });

        await nuevoArtista.save();

        // Respuesta para confirmar la creación del artista
        res.status(201).json({
            card: {
                profilePhoto,
                name,
                category,
                shortInformation
            },
            profileComplete: {
                id,
                name,
                category,
                profilePhoto,
                information,
                gallery,
                links
            }
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al agregar el artista', error });
    }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

