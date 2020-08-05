const { Router } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await Usuario.findOne({ email })
        .then((usuarioDB) => {
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: '(Usuario) o contraseña incorrectos'
                    }
                });
            }

            if (!bcrypt.compareSync(password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o (contraseña) incorrectos'
                    }
                });
            }
            // * Generar token
            const token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});

            res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });

        }).catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            });
        });
});


module.exports = router;