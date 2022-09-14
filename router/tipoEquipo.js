const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validarTipo } = require('../helpers/validar-tipo');

const router = Router();

// POST - METODO CREAR TIPOEQUIPO

router.post('/', async function(req, res){
    try{
        const validaciones = validarTipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date(); 
        tipoEquipo.fechaActualizacion = new Date();
    
        tipoEquipo = await tipoEquipo.save();
        
        res.send(tipoEquipo);
    
       } catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
       } 
});

// PUT - METODO ACTUALIZAR TIPOEQUIPO

router.put('/:tipoEquipoId', async function(req, res){
    try{
        const validaciones = validarTipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo) {
            return res.status(400).send('Tipo de equipo no existe');
        }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
    
        tipoEquipo = await tipoEquipo.save();
        
        res.send(tipoEquipo);
    
       } catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
       }  
});

// GET - METODO CONSULTAR TIPOEQUIPO

router.get('/', async function(req, res){
    try {
        const tipoEquipo = await TipoEquipo.find();
        res.send(tipoEquipo);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    } 
});

module.exports = router; 