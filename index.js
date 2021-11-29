
//Entre comillas va el nombre del paquete que quiero importar y guardar en la constante:
const express = require('express');
const cors = require('cors');
const path = require('path');//path viene en NODE
const { dbConnection } = require('./db/config');
require('dotenv').config();

console.log(process.env);
//Aplicacion de express:
const app = express();

//Conexión a Base de Datos:
dbConnection();

//Directorio Publico:
app.use(express.static('public') );

//Cors:
app.use(  cors()  );

//Lectura y parseo del body:
app.use(express.json());

//Levantamos la aplicación de express:
app.listen( process.env.PORT ,()=>{
    console.log(`La app esta funcionando en el puerto ${process.env.PORT}`);
});
/*configuracion de rutas: usamos un mediawere--> funcion que se ejecuta cuando el interprete
pase evaluando cada linea. el use es el mediawere
*/
app.use('/api/auth',require('./routes/auth'));
//Manejar demas rutas:
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
    /*siendo:
    1) __dirname: path donde esta desplegado nuestro servidor
    2) 'public/index.html': lo que quiero servir
    */
})