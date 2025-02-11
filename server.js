import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import morgan from "morgan" ;
import { ObjectId } from "mongodb";

const app = express();

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'artistasDB';
let db;
let artistasCollection;
let artistas;



// Conexión a la base de datos MongoDB
MongoClient.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(client =>{
  console.log('conectado a mongodb');
  db = client.db(dbName);
artistasCollection = db.collection('artistas');
})
.then(data =>{
  artistas = data;
  console.log("artistascargados")
})
  .catch(err =>{
  console.error('Error al conectar a MongoDB:', err);
  });

  
  
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cors());

//Crear artistas 
const crearArtista = async (id, name, information,  gallery, links) => {
  try {
    const nuevoArtista = {
      id: id,
      name: name,
      information: information,
      gallery : gallery,
      links: links
    }
    const result = await artistasCollection.insertOne(nuevoArtista);  // Esto es lo correcto
    
    console.log('Artista guardado:', nuevoArtista);  // Cambié `artistaGuardado` por `nuevoArtista`
    return nuevoArtista;
    
  } catch (error) {
    console.error('Error al crear artista:', error);
    throw error; // Re-lanzar el error para que se pueda manejar
  }
};



// API
// Obtener listado artistas
app.get("/artistas", async (req, res) => {
  try {
const artistas = await artistasCollection.find({}).toArray();
console.log("Artistas obtenidos:", artistas);
  //Filtrar artista por categoría
  const musicos = artistas.filter(artista => artista.category ==='Músicos');
  const artesanos = artistas.filter(artista => artista.category ==='Artesanos');
  const tatuadores = artistas.filter(artista => artista.category ==='Tatuadores');
  //Mapeamos a los artistas
  const musicosList = musicos.map(artista => ({
    id: artista.id,
    name: artista.name,
    category: artista.category,
    profilePhoto: artista.profilePhoto,
    shortInformation: artista.shortInformation
  }));
  const artesanosList = artesanos.map(artista => ({
    id: artista.id,
    name: artista.name,
    category: artista.category,
    profilePhoto: artista.profilePhoto,
    shortInformation: artista.shortInformation
  }));
  const tatuadoresList = tatuadores.map(artista => ({
    id: artista.id,
    name: artista.name,
    category: artista.category,
    profilePhoto: artista.profilePhoto,
    shortInformation: artista.shortInformation
  }));
  
  //Devolviendo lista artistas categorizados
  res.json({
  musicos: musicosList,
  artesanos: artesanosList,
  tatuadores: tatuadoresList
  });
  }catch (error) {
    console.error("Error al obtener artistas:", error);
    res.status(500).json({ error: "Error al obtener artistas" });
  }
});

// Obtener perfil concreto
app.get("/artistas/:id", async (req, res) => {
  const artistaId = req.params.id;

  // Verificar si el ID es válido antes de usar ObjectId
  if (!ObjectId.isValid(artistaId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const artista = await db.collection("artistas").findOne({ _id: new ObjectId(artistaId) });

    if (!artista) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.json({
      id: artista._id, // Asegúrate de devolver el ID correcto
      name: artista.name,
      category: artista.category,
      profilePhoto: artista.profilePhoto,
      information: artista.information,
      gallery: artista.gallery,
      links: artista.links
    });
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
});
// Añadir artista
// Añadir artista
app.post("/addArtista", async (req, res) => {
    console.log(req.body); //ver los datos
  try {
    const { name, category, profilePhoto, information, shortInformation, gallery, links } = req.body;
    const artistaExistente = await artistasCollection.findOne({ name });

    if (artistaExistente) {
      return res.status(400).json({ error: `El artista con el nombre ${name} ya existe.` });
    }

    // Creamos el objeto para el artista con todos los datos
    const nuevoArtista = {
      name,
      category,
      profilePhoto,
      information,
      shortInformation,
      gallery,
      links,
      tarjeta: {
        profilePhoto,  // Foto de perfil
        name,           // Nombre del artista
        category,       // Categoría
        shortInformation // Información breve
      }
    };

    // Insertamos el nuevo artista en la base de datos
    await artistasCollection.insertOne(nuevoArtista);

    res.status(201).json({
      message: "Artista añadido con éxito",
    });
  } catch (error) {
    console.error("Error al añadir artista:", error);
    res.status(500).json({ error: "Error al añadir artista" });
  }
});


// escuche
app.listen(3000, () => {
  console.log("Ready on port 3000!");
});