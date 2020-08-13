const jwt = require('jsonwebtoken');
// * ================= 
// *  Verificar Token 
// * =================
const verificaToken = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decode.usuario;

        next();
    });
};

// * =====================
// *  Verificar AdminRole
// * =====================
const verificaAdmin_Role = (req, res, next) => {
    const usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es Administrador'
            }
        });
    }
};

// * =================
// *  Verifica Imagen
// * =================
const verificaTokenImg = (req, res, next) => {

    const token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();

    });
}

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}