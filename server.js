import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import morgan from "morgan" ;

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




// API
// Obtener listado artistas
app.get("/artistas", (req, res) => {
const artistas = artistasCollection.find();
  //Filtrar artista por categoría
  const musicos = artistas.filter(artista => artistas.category ==='Musicos');
  const artesanos = artistas.filter(artista => artistas.category ==='Artesanos');
  const tatuadores = artistas.filter(artista => artistas.category ==='Tatuadores');
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
});

// Obtener perfil concreto
app.get("/artistas/:id", (req, res) => {
  const artistaId = req.params.id;
  const artista = artistas.find(a => a.id === artistaId);
  res.json({
    id: artista.id,
    name: artista.name,
    category: artista.category,
    profilePhoto: artista.profilePhoto,
    information: artista.information,
    gallery: artista.gallery,
    links: artista.links
  });
});
// Añadir artista
app.post("/addArtista", (req, res) => {
  const { id, name, category, profilePhoto, information, shortInformation, gallery, links } = req.body;
  const nuevoArtista = {
    id,
    name,
    category,
    profilePhoto,
    information,
    shortInformation,
    gallery,
    links
  };
  artistas.push(nuevoArtista);
  res.status(201).json({
    message: "Artista añadido con éxito",
  });
});
// escuche
app.listen(3000, () => {
  console.log("Ready on port 3000!");
});