const express = require('express');
const {getConnection} = require('./db/db-connect-mongo');
const cors = require('cors');

const app = express();
const port = 3000;

// IMPLEMENTACION CORS / Sirve para que el API sea consumido desde ReactJS APP (Front de la aplicacion)
app.use(cors());

getConnection();

// PARSEO JSON / Sirve para solicitar el formato JSON
app.use(express.json());

app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/usuario', require('./router/usuario'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


