const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('./config/config');

const app = express();
require('./database/database');

// ? ---Inicia Settings---
app.set("port", process.env.PORT);

// ? ---Inicia Middleware---
app.use(express.urlencoded({
    extended: false
}));

// ? --Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.json());

// ? ---Inicia Routes---
app.use(require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`Escuchando puerto ${app.get('port')}`);
});