const { Router } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const router = Router();

router.get('/usuario', verificaToken, async (req, res) => {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 5);
    await Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec()
        .then(async (usuarios) => {
            await Usuario.countDocuments({ estado: true })
                .then((cuantos) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos
                    });
                })
        }).catch(err => {
            return res.status(400).json({
                ok: false,
                err
            });
        });
});

router.post('/usuario', [verificaToken, verificaAdmin_Role], async (req, res) => {
    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });
    await usuario.save()
        .then(usuarioDB => {
            res.json({
                ok: true,
                usuarioDB
            });
        }).catch(err => {
            return res.status(400).json({
                ok: false,
                err
            });
        });
});

router.put('/usuario/:id', [verificaToken, verificaAdmin_Role], async (req, res) => {
    // * lista blanca (o conjunto de claves válidas)
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(usuario => {
            res.json({
                ok: true,
                usuario
            });
        }).catch(err => {
            return res.status(400).json({
                ok: false,
                err
            });
        });
});

router.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], async (req, res) => {
    const { id } = req.params;
    const cambiaEstado = {
        estado: false
    };
    await Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true })
        .then(usuarioBorrado => {
            res.json({
                ok: true,
                usuarioBorrado
            });

        }).catch(err => {
            return res.status(400).json({
                ok: false,
                err: 'El usuario no existe'
            });
        });

});
// await Usuario.findByIdAndRemove(id)
//     .then(usuarioBorrado => {
//         if(!usuarioBorrado) {
//             throw new Error('usuario no encontrado');
//         }
//         res.json({
//             ok: true,
//             usuarioBorrado
//         });

//     }).catch(err => {
//         return res.status(400).json({
//             ok: false,
//             err: err.message
//         });
//     });


module.exports = router;