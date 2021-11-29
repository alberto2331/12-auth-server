const jwt = require('jsonwebtoken');

const generarJWT = (uid , name)=>{
    const payload = {uid, name};
    //Creo una promesa para poder manejar mejor el "sign":
    return new Promise((resolve, reject)=>{
        jwt.sign( payload , process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'//se vence en 24 horas
        } ,(err, token)=>{//cuando termina la funcion tendremos error o token
            if(err){
                console.log(err);
                reject(err)
            } else{
                resolve(token)
            }
        })
    })   
}

module.exports = {
    generarJWT
}