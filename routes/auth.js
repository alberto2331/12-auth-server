
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

//Lo almacenamos en una variable para poder manipularlo en este archivo:
const router= Router();
//Para exportar usamos:
module.exports= router;
//Para crear un usuario necesitamos:
router.post('/new',[
    check('name', 'Mensaje de error: el nombre es un campo obligatorio').not().isEmpty(),
    check('email', 'Mensaje de error: el email es obligatorio').isEmail().isLength(),
    check('password', 'Mensaje de error: la constraseña es obligatoria').isLength({min: 6}),
    validarCampos //notese que van sin parentesis porque no quiero que se ejecute la funcion
], crearUsuario)
//Para hacer un login
router.post('/',[
    check('email', 'Mensaje de error: el email es obligatorio').isEmail().isLength(),
    check('password', 'Mensaje de error: la constraseña es obligatoria').isLength({min: 6}),
    validarCampos //notese que van sin parentesis porque no quiero que se ejecute la funcion
],loginUsuario)
//Validar y revalidar token:
router.get('/renew', validarJWT,revalidarToken)