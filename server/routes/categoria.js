const { Router } = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const Categoria = require('../models/categoria');

const router = Router();

// * ====================
// *  Mostrar Categorias 
// * ====================
router.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });
});

// * ===============================
// *  Mostrar una Categorias por ID
// * ===============================
router.get('/categoria/:id', verificaToken, (req, res) => {
    const { id } = req.params;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// * =======================
// *  Crear nueva Categoria
// * =======================
router.post('/categoria', verificaToken, (req, res) => {
    const { descripcion } = req.body;
    const categoria = new Categoria({
        descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// * =======================
// *  Actualizar Categoria
// * =======================
router.put('/categoria/:id', verificaToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

// * ====================
// *  Eliminar Categoria
// * ====================
router.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    const { id } = req.params;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });
    });
});

module.exports = router;