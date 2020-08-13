const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
require('./config/config');

const app = express();
require('./database/database');

// ? ---Inicia Settings---
app.set("port", process.env.PORT);

// ? ---Inicia Middleware---
app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true
}));

// ? --Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// ? ---Inicia Routes---
app.use(require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`Escuchando puerto ${app.get('port')}`);
});