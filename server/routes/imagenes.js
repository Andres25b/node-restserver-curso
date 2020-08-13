const { Router } = require('express');
const { verificaTokenImg } = require('../middlewares/autenticacion');
const fs = require('fs');
const path = require('path');

const router = Router();

router.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    const {tipo} = req.params;
    const {img} = req.params;
    const pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        const noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
});

module.exports = router;