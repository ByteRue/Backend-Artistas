/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'artistasDB';  // Nombre de la base de datos que estamos utilizando
const collection = 'artistas';  // Nombre de la colección donde almacenaremos los datos de los artistas

// Crear la base de datos.
use(database);

db.artistas.insertMany([
  {
    _id: ,
    name: "Daniela Chinchilla",
    category: "Artesanos",
    shortInformation: "Estudió en la UPV el grado Bellas Artes. Es una artista multidisciplinaria y actualmente se dedica a la creación de piezas con material biodegradable.",
    profilePhoto: "imgDaniela/danielaPortada.png",
    information: "Estudió en la UPV el grado Bellas Artes. Es una artista multidisciplinaria y actualmente se dedica a la creación de piezas con material biodegradable.",
    gallery: ["imgDaniela/daniela1.png", "imgDaniela/daniela2.png", "imgDaniela/daniela1.png"],
    links: ["https://www.instagram.com/danielachinchilla__/?igsh=MWtreGduOTZ0cDB1dg%3D%3D#", "https://drive.google.com/file/d/18dEsQFBzya4fF_H-Di6Delrocu8nQ-Xt/view"]
  },
  {
    _id: ,
    name: "Dario Machin",
    category: "Artesanos",
    shortInformation: "Es un artista plástico originario de la isla de Lanzarote, realizó sus estudios de grado en Bellas Artes por la Universidad Complutense de Madrid y posteriormente el máster en Producción Artística por la Universitat Politècnica de València.",
    profilePhoto: "imgDario/darioPortada.png",
    information: "Es un artista plástico originario de la isla de Lanzarote, realizó sus estudios de grado en Bellas Artes por la Universidad Complutense de Madrid y posteriormente el máster en Producción Artística por la Universitat Politècnica de València.",
    gallery: ["imgDario/dario1.png", "imgDario/dario2.png", "imgDario/dario3.png", "imgDario/dario4.png"],
    links: ["https://www.instagram.com/dariomachin_/?igsh=NHNqaTNqb2JuenMw#", "https://www.dariomachin.com/statemn"],
  },
  {
    _id: ,
    name: "Ansiedad Caramelizada",
    category: "Músicos",
    shortInformation: "Es una banda que busca equilibrio entre lo visceral y lo real. Hacen música que puede ser ruidosa o melódica, pero siempre tienen algo de lo que llevan dentro: momentos de caos, de calma y de todo lo  que hay entre medias.",
    profilePhoto: "imgAnsiedadCaramelizada/portadaAnsiedadCaramelizada.jpeg",
    information: "Somos una banda que busca equilibrio entre lo visceral y lo real. Hacemos música que puede ser ruidosa o melódica, pero siempre tiene algo de lo que llevamos dentro: momentos de caos, de calma y de todo lo que hay entre medias. Nos inspira lo cotidiano, esas cosas que parecen pequeñas pero te remueven por dentro, y tratamos de capturarlas en nuestras canciones para que conecten con quien las escuche. Queremos transmitir la belleza de lo imperfecto, la magia de los momentos fugaces que parecen insignificantes pero lo son todo. Nuestras canciones son como diarios sonoros de emociones intensas: la nostalgia, la ansiedad, el amor, y esa sensación de estar perdido pero contento. Nuestras inspiraciones vienen tanto de la música como de lo cotidiano. Bandas como Slowdive , Joy Division o Title Fight nos han marcado, pero también el cine independiente, los paisajes urbanos vacíos y las conversaciones a las tres de la mañana. Hacemos música porque es la forma más honesta que tenemos de conectar, tanto con nosotros mismos como con los demás. Es un espacio donde podemos ser vulnerables sin máscaras, y al mismo tiempo crear algo que pueda resonar en otros. También lo hacemos por esa gente que, en medio de una noche con sus colegas, escucha uno de nuestros temas y dice: Este tema me hace sentir cosas. Porque al final, se trata de compartir esa emoción que no se puede poner en palabras.",
    gallery: ["imgAnsiedadCaramelizada/ansiedadCaramelizada1.jpeg", "imgAnsiedadCaramelizada/ansiedadCaramelizada2.jpeg", "imgAnsiedadCaramelizada/ansiedadCaramelizada3.jpeg", "imgAnsiedadCaramelizada/ansiedadCaramelizada4.jpeg"],
    links: ["https://open.spotify.com/artist/1efzATzzQtPzky1sbMjVbQ?si=80yRRH2ESHiFYoe5mkOJHg", "https://www.instagram.com/ansiedadcaramelizada?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="],
  },
  {
    _id: ,
    name: "Kness",
    category: "Músicos",
    shortInformation: "Es una fusión entre toda música que tenga que ver con el ámbito urbano, trap, rap, detroit, etc. Lo que busca en el mundo urbano es darle una nueva cara y un nuevo aire. Siente que faltan artistas como él, y eso le lanza a querer seguir haciendo música.",
    profilePhoto: "imgKness/knessPortada.png",
    information: "El estilo que tengo es una fusión entre toda música que tenga que ver con el ámbito urbano, trap, rap, detroit... etc. me gusta ya que lo que busco es en el mundo urbano darle una nueva cara, un nuevo aire, siento que faltan artistas como yo, y eso me lanza a querer seguir haciendo música, porque siento que de verdad soy diferente a los demás artistas que buscan entrar en la industria. Trato de transmitir que en la música no hay límites, ni con las palabras ni con las melodías, que todo el mundo puede hacer musica de lo que quiera, la variedad es lo bonito de la música. Mis inspiraciones no han sido muy sólidas hasta no hace mucho, gente como Dano,Ébano, Hoke, D.Valentino, M4rk, artistas de tanto la nueva ola como los que ya estaban he cogido la parte que más me gusta de cada uno y he intentado hacerla a mi talla, ese es mi objetivo. No sé si soy capaz de explicarlo con detenimiento que es lo que me gusta concretamente de la música ya que sólo me sale decir que me gusta todo de ella. Desde pequeño me gusta el arte, antes iba para el dibujo, pero desde 2018 mi vida cambió a querer vivir de las melodías, de hacer sentir cosas a un desconocido sólo con mi música",
    gallery: ["imgKness/kness1.jpg", "imgKness/kness2.jpg"],
    links: ["https://open.spotify.com/artist/3hSULzDAv4I2CIbPAIgiM9?si=S7DjxGI6TACeQAZ8l_kNQQ", "https://www.instagram.com/kness.kness?igsh=MXFlNTNzOGhqOGhrdQ=="],
  },
  {
    _id: ,
    name: "Angie Grim",
    category: "Tatuadores",
    shortInformation: "Tiene un estilo Blackwork concretamente Darkwork que es una rama de dicho estilo que se caracteriza por la temática oscura y tétrica. Siempre le ha gustado todo lo relacionado con las artes oscuras desde pequeña",
    profilePhoto: "imgAngie/angiePortada.png",
    information: "El estilo que hago es Blackwork concretamente Darkwork que es una rama de dicho estilo que se caracteriza por la temática oscura y tétrica . Siempre me ha gustado todo lo relacionado con las artes oscuras desde pequeña. Con mis trabajos siempre los llevo a mi estilo y intento plasmar la idea de mis clientes desde mi punto artístico que considero que es bastante característico. Mis inspiraciónes son tantas que no podría especificar un par en concreto ya que soy una persona que le gusta nutrirse mucho de variedad de artistas y conceptos. Desde pequeña siempre he tenido claro que quería dedicarme al mundo del arte y siempre he estado haciendo diversidad de técnicas y de las pocas que me faltaba era tatuar . Fue un flechazo a primera vista el ver que podía hacer feliz a muchas personas y vivir de ello ( que es algo importante tristemente ) y también por otros factores por ejemplo que a pesar de poder dibujar bien etc . El tatuaje es un reto desde el momento uno porque da igual lo bien que dibujes que la complejidad de la técnica y la responsabilidad es altísima para hacer un buen trabajo y eso es algo que me encanta.",
    gallery: ["imgAngie/angie1.png", "imgAngie/angie2.png", "imgAngie/angie3.png", "imgAngie/angie4.png"],
    links: ["https://www.instagram.com/angiegrim?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="],
  },
  {
    _id: ,
    name: "Gonzalo",
    category: "Tatuadores",
    shortInformation: "Su estilo de tatuaje se inspira en la naturaleza y en lo orgánico, en la sensación de dibujar sin forzar, dejando que la mano y la mente fluyan libremente. Sus líneas se convierten en dibujos que expresan más allá de lo que se ve a simple vista.",
    profilePhoto: "imgGonzalo/gonzaloPortada.jpeg",
    information: "Hola, soy Gon. Mi estilo de tatuaje se inspira en la naturaleza y en lo orgánico, en la sensación de dibujar sin forzar, dejando que la mano y la mente fluyan libremente. Mis líneas se convierten en dibujos que expresan más allá de lo que se ve a simple vista. Encuentro inspiración en las montañas, los árboles, las piedras y todo lo que me rodea en la “selva” de mi barrio. Me dedico al mundo del tatuaje porque creo en dejar una huella en el lienzo más efímero y bello: la piel humana. Es un arte que permite contar historias, combinar diseño y emociones, y dar voz a pensamientos que muchas veces ni siquiera el cliente puede expresar por sí mismo. Estudié Diseño Gráfico en Valencia e Ilustración en Teruel y Córdoba, aunque siento que la vida me ha enseñado más que las aulas.",
    gallery: ["imgGonzalo/gonzalo1.jpeg", "imgGonzalo/gonzalo2.jpeg", "imgGonzalo/gonzalo3.jpeg", "imgGonzalo/gonzalo4.jpeg"],
    links: ["https://www.instagram.com/gonferal99?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "https://www.instagram.com/gonferart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="],
  },
])

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
