const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validar-usuario');

const router = Router();

// POST - METODO CREAR USUARIO

router.post('/', async function(req, res){
    
    try {
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        console.log('parametros de entrada',req.body);

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('El email se encuentra registrado con otro usuario');
        }
    
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date(); 
        usuario.fechaActualizacion = new Date();
    
        usuario = await usuario.save();
    
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    }   
});

// PUT - METODO ACTUALIZAR USUARIO

router.put('/:usuarioId', async function(req, res){

    try {
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        console.log('parametros de entrada', req.body, req.params);

        let usuario = await Usuario.findById(req.params.usuarioId);

        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }

        const existeUsuario = await Usuario
                .findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        
    console.log('Respuesta existe usuario', existeUsuario);

        if (existeUsuario) {
            return res.status(400).send('El email se encuentra registrado con otro usuario');
        }
    
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
    
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    }
});

// GET - METODO CONSULTAR USUARIO

router.get('/', async function(req, res){
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    }
});

module.exports = router; 

