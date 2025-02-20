const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json({limit: "50mb"}));
require("dotenv").config();

async function connectBD() {
  const conex = await mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSDB,
    database: process.env.DATABASE
  });
  conex.connect();
  return conex;   
}


// const fakeMovies = [
//   {
//     id: 1,
//     title: "Wonder Woman",
//     genre: "Action",
//     image:
//       "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
//     category: "Superhero",
//     year: 2017,
//     director: "Patty Jenkins",
//   },
//   {
//     id: 2,
//     title: "Inception",
//     genre: "Science Fiction",
//     image:
//       "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
//     category: "Thriller",
//     year: 2010,
//     director: "Christopher Nolan",
//   },
// ];

//ENDPOINTS

//escuchar las peticiones para pedir peliculas

// server.get("/movies", (req, res) => {
//   if(fakeMovies.length === 0){
//     res.status(404).json({success:false, error:"No se ha encontrado el recurso"});
//   } else {
//     res.status(200).json({success:true, movies: fakeMovies});
//   }
// })

server.get("/moviesFilter", async (req, res)=>{  
  try {
      console.log(req.query);
      const {genre, sort} = req.query;

      const connection = await connectBD();

      let sqlSelect = "";
      if(genre === ""){
        sqlSelect = "SELECT * FROM Movies ORDER BY ?";
      } else {
        sqlSelect = "SELECT * FROM Movies WHERE genre = ? ORDER BY ?";
      }
      //const sqlSelect = "SELECT * FROM Movies WHERE genre = ?";
      const [result] = await connection.query(sqlSelect, [genre, sort]);
      connection.end();

      console.log(result);

      if(result.length === 0){
          res.status (404).json({
            success: false,
            message: "No se encontraron películas"
          });
      }else{
          res.status (200).json({
            success: true,
            movies:  result,
          });
      }

  } catch (error) {
      console.log(error);
      res.status(500).json({    //500 = error en el servidor
        success: false,
        message: error,
      });     
  }
});

// server.get("/api/petsFilter", async (req,res)=>{
//   try {
//       // console.log(req.query);
//       // { name: 'pepa', order: 'name' } en la consola si pongo la url en el servidor
//       const {name, order} = req.query;

//       const connection = await connectBD();

//       const ordenamiento = order ? `ORDER BY ${order} ASC` : "";
//       const select = `SELECT * FROM pets WHERE name like ? ${ordenamiento}`
//       //donde está ? en el mysql iría "pepa"
//       //se podría poner ${name} pero es menos seguro
//       //order by y limit no se puede usar ?

//       const [result] = await connection.query(select, [name]);
//       connection.end();

//       res.json({
//           data: result,
//       });


//   } catch (error) {
//       res.status (500).json({    //500 = error en el servidor
//           status: "error",
//           message: error,
//       });     
//   }
// });




// init express aplication
const serverPort = process.env.PORT;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
