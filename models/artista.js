import mongoose from 'mongoose';

const artistaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    profilePhoto: { type: String, required: true }, // Aquí almacenamos la ruta del archivo
    information: { type: String, required: true },
    shortInformation: { type: String, required: true },
    links: { type: [String], default: [] }, // Usar un array de enlaces
    gallery: { type: [String], default: [] }  // Si necesitas guardar múltiples imágenes en galería
});

export default mongoose.model('Artista', artistaSchema);

