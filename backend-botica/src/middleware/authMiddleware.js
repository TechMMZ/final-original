const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_secreto_super_seguro';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded; // Aquí está el id y nombre del usuario
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = verificarToken;
