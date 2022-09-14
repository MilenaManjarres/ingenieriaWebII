const { Router } = require('express');
const Marca = require('../models/Marca');
const { validarMarca } = require('../helpers/validar-marca');

const router = Router();

// POST - METODO CREAR MARCA

router.post('/', async function(req, res){
   try{
    const validaciones = validarMarca(req);

    if (validaciones.length > 0) {
        return res.status(400).send(validaciones);
    }

    let marca = new Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date(); 
    marca.fechaActualizacion = new Date();

    marca = await marca.save();
    
    res.send(marca);

   } catch(error){
    console.log(error);
    res.status(400).send('Ha ocurrido un error en la peticion');
   } 
});

// PUT - METODO ACTUALIZAR MARCA

router.put('/:marcaId', async function(req, res){
    try{
    const validaciones = validarMarca(req);

    if (validaciones.length > 0) {
        return res.status(400).send(validaciones);
    }    

    let marca = await Marca.findById(req.params.marcaId);
    if(!marca) {
        return res.status(400).send('Marca no existe');
    }
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaActualizacion = new Date();

    marca = await marca.save();
    
    res.send(marca);

   } catch(error){
    console.log(error);
    res.status(500).send('Ha ocurrido un error en la peticion');
   }
});

// GET - METODO CONSULTAR MARCA

router.get('/', async function(req, res){
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    } 
});

module.exports = router; 