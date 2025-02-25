const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
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
        sqlSelect = `SELECT * FROM Movies ORDER BY title ${sort}`;
      } else {
        sqlSelect = `SELECT * FROM Movies WHERE genre = ? ORDER BY title ${sort}`;
      }
      //const sqlSelect = "SELECT * FROM Movies WHERE genre = ?";
      const [result] = await connection.query(sqlSelect, [genre]);
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

server.get('/movie/:movieId', async (req, res) =>{
  const {movieId} = req.params; 
  console.log(req.params);
  const connection = await connectBD();
  const sql = "SELECT * FROM movies WHERE idMovies = ?";
  const [result] = await connection.query(sql, [movieId]);
  console.log(result);
  connection.end();
  res.render("movie", { movie: result[0] });
})

//register
server.post("/sign-up", async (req, res)=>{
  const connection = await connectBD();
  const {email, password} = req.body;
  console.log(req.body);
  const selectEmail = 'SELECT email FROM  Users WHERE  email = ? ';
  const [emailResult] = await connection.query(selectEmail, [email]);

  if (emailResult.length === 0) {
    console.log(password);
    //antes de hacer el insert debo encriptar la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);

    const insertUser =
      'INSERT INTO Users (email, password, user, name,plan_details) values (?, ?, ?, ?, ?)';
    const [result] = await connection.query(insertUser, [email, passwordHashed, "", "", ""]);

    res.status(201).json({ success: true, userId: result.insertId });
  } else {
    //el usuario ya existe -->  respondo con mensaje de error
    res.status(200).json({ success: false, message: 'Usuario ya existe' });
  }
})


// init express aplication
const serverPort = process.env.PORT;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

