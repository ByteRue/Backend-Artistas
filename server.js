import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import artistaRoutes from './routes/artistaRoutes.js'; // Importamos las rutas

const app = express();

// URL de conexión a MongoDB
const dbURI = 'mongodb://localhost:27017/artistasDB';  // Asegúrate de que este nombre coincida con el de tu base de datos

// Conectar a MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB", error));

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({
  origin: 'http://localhost:3000',  // La URL donde corre tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Servir archivos estáticos para los perfiles generados
app.use('/perfiles', express.static('public/perfiles'));
// Acceder a las imágenes subidas desde el navegador
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Usar las rutas definidas en 'artistaRoutes.js'
app.use('/artistas', artistaRoutes);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
