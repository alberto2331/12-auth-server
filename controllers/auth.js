const { response } =require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async(req,res  =  response)=>{
    const{ email , name  , password } = req.body;
    try {
        //Verificamos que no haya un correo igual:
        const usuario = await Usuario.findOne({email: email});
                //El findOne va a buscar a alguien en la base de datos con el email que recibo como argumento
                //primer verificación: busca y devuelve un objeto, si el usuario existe entonces...
            if(usuario){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario ya existe'
                });    
            }
        //Crear usuario con el modelo:
        const dbUser = new Usuario(req.body) //El modelo solo espera el "email", "name" y "password"
        //Encriptaremos la contraseña:-->HASHEAR CONTRASEÑA
        const salt = bcrypt.genSaltSync(10); //siendo 10 la cantidad de vueltas que dara para crear la contraseña
        dbUser.password = bcrypt.hashSync(password,salt);
        //Generar el JWT: ESTO LO UTILIZA ANGULAR COMO METODO DE AUTENTICACIÓN PASIVA.
        const token = await generarJWT(dbUser.id , dbUser.name); 
                    //si esto sale bien el "token" va a ser igual al resolve
                    //si esto sale mal el "token" va a ser igual al reject
        //Crear usuario de DB:
        await dbUser.save(); 
            //--> cuando se termine de ejecutar el await deberíamos tener el usuario con todos sus atributos
        //Generar respuesta exitosa:
            return res.status(201).json({
                ok: true,
                uid: dbUser.id,
                name,
                email, 
                token
            })

    } catch (error) {
        console.log(error)//mostramos el error por consola para que no lo pueda ver el usuario
        return res.status.json({
            ok: false,
            mensaje: 'Por favor comuniquese con el administrador'
        });    
    }        
}

const loginUsuario = async(req,res  =  response)=>{
    //Me lleve a "validar-campos.js" la linea de codigo que reutilizo
    const {email , password}= req.body;
    try {
        const dbUser = await Usuario.findOne({email});
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo no existe'
            })
        }
        //si llegamos hasta aca significa que tenemos un usuario pero todavía no validamos la contraseña:
        const validPassword = bcrypt.compareSync(password , dbUser.password); //Esto compara contraseñas
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                mensaje: 'El password esta mal'
            })
        }
        //Si llegamos a este punto es porque tenemos un email y contraseña válidos. Generamos el token reutilizando el codigo:
        const token = await generarJWT(dbUser.id , dbUser.name);
        //Ahora hacemos la respuesta del servicio:
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email, //nuevo
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Hable con administrador'
        })
    }
}

const revalidarToken = async(req,res  =  response)=>{
 
    const {uid} = req;
    //Para obtener el email voy a consultar a la base de datos usando el id:
    const dbUser = await Usuario.findById(uid);
    const token = await generarJWT(dbUser.id, dbUser.name);
    
    return res.json({
        ok: true,        
        uid,
        name: dbUser.name,
        email:dbUser.email,   
        token,        
    });
}
module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}