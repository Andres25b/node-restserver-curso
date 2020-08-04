require('./config/config');
const express = require('express');

const app = express();

// ? ---Inicia Middleware---
app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());
// ? ---Termina Middleware---


app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {

    const { nombre, edad, correo } = req.body;

    if (nombre === undefined) {

        res.status(400).json({
            ok: false,
            message: 'The name is required'
        });

    } else {

        res.json({
            nombre,
            edad,
            correo
        });

    }

});

app.put('/usuario/:id', (req, res) => {

    const { id } = req.params;
    res.json({
        id
    });

});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});