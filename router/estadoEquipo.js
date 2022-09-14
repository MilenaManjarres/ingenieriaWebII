const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarEstado } = require('../helpers/validar-estado');

const router = Router();

// POST - METODO CREAR ESTADOEQUIPO

router.post('/', async function(req, res){
    try{
        const validaciones = validarEstado(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }    

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date(); 
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        
        res.send(estadoEquipo);
    
       } catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
       } 
});

// PUT - METODO ACTUALIZAR ESTADOEQUIPO

router.put('/:estadoEquipoId', async function(req, res){
    try{
        const validaciones = validarEstado(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }    

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo) {
            return res.status(400).send('Estado de equipo no existe');
        }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        
        res.send(estadoEquipo);
    
       } catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
       }  
});

// GET - METODO CONSULTAR ESTADOEQUIPO

router.get('/', async function(req, res){
    try {
        const estadoEquipo = await EstadoEquipo.find();
        res.send(estadoEquipo);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    } 
});

module.exports = router; 