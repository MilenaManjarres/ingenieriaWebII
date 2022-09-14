const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validarInventario } = require('../helpers/validar-inventario');

const router = Router();

// POST - METODO CREAR INVENTARIO

router.post('/', async function(req, res){
    try {
        const validaciones = validarInventario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeInventarioPorserial = await Inventario.findOne({ serial: req.body.serial });
        
         if (existeInventarioPorserial) {
            return res.status(400).send('El serial ya se encuentra registrado con otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.referencia = req.body.referencia;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    } 
});

// PUT - METODO ACTUALIZAR INVENTARIO

router.put('/:inventarioId', async function(req, res){
    try {
        const validaciones = validarInventario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(400).send('Inventario no existe');
        }

        const existeInventarioPorserial = await Inventario
            .findOne({ serial: req.body.serial, _id: { $ne: inventario._id } });
        
         if (existeInventarioPorserial) {
            return res.status(400).send('El serial ya se encuentra registrado con otro equipo');
        }

        inventario.serial = req.body.serial;
        inventario.referencia = req.body.referencia;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    } 
});

// GET - METODO CONSULTAR INVENTARIO

router.get('/', async function(req, res){
    try {
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },    
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', select: 'nombre marca'
            },
            {
                path: 'estadoEquipo', select: 'nombre marca'
            }
        ]);
        
        res.send(inventarios);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error en la peticion');
    } 
});

module.exports = router; 