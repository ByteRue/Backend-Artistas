/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'artistasDB';  // Nombre de la base de datos que estamos utilizando
const collection = 'artistas';  // Nombre de la colección donde almacenaremos los datos de los artistas

// Crear la base de datos.
use(database);

// Crear la colección para los artistas
db.createCollection(collection, {
  capped: false,  // No es una colección con tamaño fijo
  autoIndexId: true,  // Índice automático para _id
  validator: {  // Opcional: Validaciones para los datos que se ingresen en la colección
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "category", "shortInformation", "profilePhoto", "information", "gallery", "links"],
      properties: {
        name: {
          bsonType: "string",
          description: "Debe ser un nombre de artista"
        },
        category: {
          bsonType: "string",
          description: "Debe ser una categoría de arte"
        },
        shortInformation: {
          bsonType: "string",
          description: "Debe contener una breve información sobre el artista"
        },
        profilePhoto: {
          bsonType: "string",
          description: "Debe ser la URL de la foto de perfil del artista"
        },
        information: {
          bsonType: "string",
          description: "Debe contener una descripción más detallada del artista"
        },
        gallery: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Debe ser un arreglo con URLs de imágenes de la galería del artista"
        },
        links: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Debe ser un arreglo de URLs con enlaces relacionados con el artista"
        }
      }
    }
  },
  validationLevel: "strict",  // Establecer el nivel de validación como 'strict'
  validationAction: "error"  // Si los datos no cumplen con el esquema, lanzará un error
});


// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
