// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');
// const JWT_SECRET = 'tu_secreto_super_seguro';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const JWT_SECRET = 'tu_secreto_super_seguro';

exports.registrar = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        if (!['admin', 'vendedor'].includes(rol)) {
            return res.status(400).json({ mensaje: 'Rol no válido' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';

        db.query(query, [nombre, email, hashedPassword, rol], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensaje: 'Error al registrar usuario' });
            }
            res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
        });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// exports.login = (req, res) => {
//     const { email, password } = req.body;

//     const query = 'SELECT * FROM usuarios WHERE email = ?';
//     db.query(query, [email], async (err, resultados) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ mensaje: 'Error en la consulta' });
//         }

//         if (resultados.length === 0) {
//             return res.status(401).json({ mensaje: 'Correo o password incorrectos' });
//         }

//         const usuario = resultados[0];
//         const coincide = await bcrypt.compare(password, usuario.password);
//         if (!coincide) {
//             return res.status(401).json({ mensaje: 'Correo o password incorrectos' });
//         }

//         // SIN TOKEN, solo confirmación
//         res.status(200).json({
//             mensaje: 'Inicio de sesión exitoso',
//             usuario: {
//                 id: usuario.id,
//                 nombre: usuario.nombre,
//                 rol: usuario.rol
//             }
//         });
//     });
// };

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error en la consulta' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Correo o password incorrectos' });
        }

        const usuario = resultados[0];
        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            return res.status(401).json({ mensaje: 'Correo o password incorrectos' });
        }

        // Crear el token con el rol del usuario
        const token = jwt.sign(
            {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            },
            JWT_SECRET,
            { expiresIn: '1h' } // El token expirará en 1 hora
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token: token
        });
    });
};