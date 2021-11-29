const  mongoose  = require("mongoose");

const dbConnection = async()=> {
    //utilizo el "async" porque no quiero que mi app continúe sin haber cargado la base de datos primero
    //Coloco un try-catch porque puede romperse todo si la conexión falla
    try {
        //Mongoose nos ayuda con todas las interacciones a la base de datos
        //connect es una funcion asincrona, devuelve un objeto promesa.
        //con await espero a que se resuelva esa promesa
        //El connect necesita mi cadena de conexión que tengo en mi .env -->"BD_CNN"
        await mongoose.connect(process.env.BD_CNN, {
            //Lo siguiente se encuentra en la documentación oficial de Mongoose
            useNewUrlParser: true,
            useUnifiedTopology: true,            
            //Si todo lo anterior se ejecuta quiero ver un "BD_Online"
        });
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar base de datos');
    }
}

module.exports = {
    dbConnection   
}