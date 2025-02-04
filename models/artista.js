import mongoose from 'mongoose';

const artistaSchema = new mongoose.Schema({
    name: String,
    category: String,
    profilePhoto: String, // Guardaremos la URL de la imagen
    information: String,
    shortInformation: String,
    links: String
});

export default mongoose.model('Artista', artistaSchema);

