import express from "express";
import mongoose from "mongoose"; // Importa mongoose
import morgan from "morgan";
import cors from "cors";

const app = express();

/// URL de conexión a MongoDB local
const dbURI = 'mongodb://localhost:27017/artistasDB';  // Asegúrate de que el nombre de la base de datos sea correcto

// Conectar con MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB", error);
  });

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());  // Habilita CORS

// Define el esquema y modelo de los artistas
const artistaSchema = new mongoose.Schema({
  name: String,
  category: String,
  shortInformation: String,
  profilePhoto: String,
  information: String,
  gallery: [String],
  links: [String]
});

const Artista = mongoose.model("Artista", artistaSchema);

// API
// Obtener listado de artistas
app.get("/artistas", async (req, res) => {
  try {
    const artistas = await Artista.find();
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los artistas" });
  }
});

// Obtener un artista por ID
app.get("/artistas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const artista = await Artista.findById(id);
    if (!artista) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }
    res.json(artista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el artista" });
  }
});

// Añadir un nuevo artista
app.put("/addArtista", async (req, res) => {
  const { name, category, profilePhoto, information, shortInformation, gallery, links } = req.body;

  try {
    const nuevoArtista = new Artista({
      name,
      category,
      profilePhoto,
      information,
      shortInformation,
      gallery,
      links
    });

    await nuevoArtista.save();
    res.status(201).json({ message: "Artista añadido con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al añadir el artista" });
  }
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
