const fs = require('fs');
const path = require('path');
const userDir = path.join(__dirname, '../model/users');

if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir);
}

// Función para iniciar sesión
exports.login = (req, res) => {
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};

// Función para registrar un nuevo usuario
exports.newUser = (req, res) => {
    const { user, nombre, correo, contrasena } = req.body;
    if (!user || !nombre || !correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const usuarioId = Date.now();
    const nombreArchivo = `${user.replace(/\s+/g, '_').toLowerCase()}.json`; // Usa el username
    const rutaArchivo = path.join(userDir, nombreArchivo);

    if (fs.existsSync(rutaArchivo)) {
        return res.status(409).json({ mensaje: 'El usuario ya existe' });
    }

    const usuarioData = {
        id: usuarioId,
        usuario: user,
        nombre: nombre,
        email: correo,
        password: contrasena,
        recordatorios: []
    };

    fs.writeFileSync(rutaArchivo, JSON.stringify(usuarioData, null, 2));
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
};

// Puedes agregar aquí la función login y otras relacionadas al usuario