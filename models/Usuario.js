const { Schema, model } = require("mongoose");
//El Schema es una funcion que se ejecuta con ciertos argumentos 
//esos argumentos los definiremos ahora con sus caracteristicas:
const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
})

//Para exportar el UsuarioSchema es distinto a otras funciones
//necesitamos el "model()" que es proporcionado por mongoose:
module.exports = model('Usuario',UsuarioSchema);