import express from 'express'; // Para crear el servidor
import { MongoClient, ObjectId } from 'mongodb'; // Para conectarse a MongoDB
import { multer } from 'multer'; // Para manejar archivos
// Configuración de Multer (para manejar imágenes)
const upload = multer();
// Configuración de MongoDB
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'imageDB';
let db;
// Conexión a MongoDB
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
console.log('Conectado a MongoDB');
db = client.db(dbName);
})
.catch(err => {
console.error('Error al conectar a MongoDB:', err);
});
// Middleware para parsear JSON
app.use(express.json());


/**
* 1. Guardar una imagen en la base de datos
* Endpoint: POST /upload
*/
app.post('/upload', upload.single('image'), async (req, res) => {
    const { originalname, mimetype, buffer } = req.file;
    try {
    // Insertar la imagen en la colección
    const result = await db.collection('images').insertOne({
    filename: originalname,
    contentType: mimetype,
    image: buffer, // Guardamos la imagen como binario
    uploadedAt: new Date(),
    });
    res.status(201).json({
    message: 'Imagen subida con éxito',
    id: result.insertedId,
    });
    } catch (err) {
    res.status(500).json({ error: 'Error al guardar la imagen', details: err.message });
    }
    });

    /**
* 2. Obtener una imagen por su ID
* Endpoint: GET /images/:id
*/
app.get('/images/:id', async (req, res) => {
    const { id } = req.params;
    try {
    // Buscar la imagen en la base de datos
    const image = await db.collection('images').findOne({ _id: new ObjectId(id) });
    if (!image) {
    return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    // Enviar la imagen como respuesta
    res.set('Content-Type', image.contentType);
    res.send(image.image);
    } catch (err) {
    res.status(500).json({ error: 'Error al obtener la imagen', details: err.message });
    }
    });
