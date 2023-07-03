const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());



const connection = mysql.createConnection({
    host: "localhost",
    user: "Andres",
    password: "2468102123",
    database: "empleados"
});

app.post('/log', (req, res) => {
    const sql = 'SELECT * FROM usuarios WHERE mail = ?';
    const values = [req.body.mail];
  
    connection.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Login Fallido');
      }
  
      if (rows.length > 0) {
        const user = rows[0];
        const contraseñaH = user.contraseña;
        if (contraseñaH === req.body.contraseña) {
          // Contraseña correcta, realizar lógica de autenticación
          // y devolver respuesta exitosa si es válido
          return res.json('Login Exitoso');
        }
      }
  
      // Usuario no encontrado o contraseña incorrecta
      return res.status(401).json('Login Fallido');
    });
  });


app.post("/registrar", (req, res) =>{
   const nombre = req.body.nombre;
   const mail = req.body.mail
   const contraseña = req.body.contraseña;

   connection.query('INSERT INTO usuarios(nombre, mail, contraseña) values(?,?,?)',[nombre, mail, contraseña],
   (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Registrado con Exito");
        }
   });
});


app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    connection.query('INSERT INTO personal(nombre, edad, pais, cargo, anios) values(?,?,?,?,?)',[nombre, edad, pais, cargo, anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Registro Exitoso!");
        }
    });
    
});

app.get("/personal", (req, res) => {
    

    connection.query('SELECT * FROM personal',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    connection.query('UPDATE personal SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',[nombre, edad, pais, cargo, anios, id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Actualización Exitosa!");
        }
    });
    
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    connection.query("DELETE FROM personal WHERE id=?",id,   
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Eliminado con Exito");
        }
    });
    
});



app.listen(3001,() => {
    console.log("Corriendo en el puerto 3001");
});