const validarInventario = (req) => {
    const validaciones = [];

    if (!req.body.serial) {
        validaciones.push('Serial es requerido');
    }

    if (!req.body.referencia) {
        validaciones.push('Referencia es requerida');
    }

    if (!req.body.descripcion) {
        validaciones.push('Descripcion es requerida');
    }

    if (!req.body.color) {
        validaciones.push('Color es requerido');
    }

    if (!req.body.foto) {
        validaciones.push('Foto es requerida');
    }

    if (!req.body.fechaCompra) {
        validaciones.push('Fecha Compra es requerida');
    }

    if (!req.body.precio) {
        validaciones.push('Precio es requerido');
    }

    if (!req.body.marca) {
        validaciones.push('Marca es requerida');
    }

    if (!req.body.tipoEquipo) {
        validaciones.push('Tipo Equipo es requerido');
    }

    if (!req.body.estadoEquipo) {
        validaciones.push('Estado Equipo es requerido');
    }

    return validaciones;
    
}

module.exports = {
    validarInventario,
}