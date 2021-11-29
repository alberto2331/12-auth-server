const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT=(req, res=response,next)=>{

    const pruebaToken = req.header('x-token');
    if(!pruebaToken){
        return res.status(401).json({
            ok: false,
            mensaje: 'Error en el token'
        })
    }
    try {
        /*la funcion verify necesita 2 argumentos:
            1) el token
            2) la llave con la que se creo el jwt--> la tenemos almacenada en nuestro ".env"
        */
        const {uid , name} = jwt.verify(pruebaToken, process.env.SECRET_JWT_SEED)
        req.uid= uid;   //CUIDADO CON SOBREESCRIBIR PROPIEDADES DEL REQ
        req.name= name; //CUIDADO CON SOBREESCRIBIR PROPIEDADES DEL REQ
    } catch (error) { //aca le damos tratamiento a la posibilidad de que venga token pero erroneo.
        return res.status(401).json({
            ok: false,
            mensaje: 'token no valido'
        })
    }
    //si todo sale bien entonces llamo a la funcion next:
    next();
}

module.exports = {
    validarJWT   
}