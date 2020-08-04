const express = require('express');
const mongoose = require('mongoose');
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

// ? ---Inicia Routes---
app.use(require('./routes/usuario'));

app.listen(app.get('port'), () => {
    console.log(`Escuchando puerto ${app.get('port')}`);
});