const fs = require('fs');
const path = require('path');
const userDir = path.join(__dirname, '../model/users');

// Ejemplo de función para agregar un nuevo recordatorio
exports.newReminder = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};

exports.editReminder = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};

exports.deleteReminder = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};

exports.listReminders = (req, res) => {
    // El usuario debe enviarse como parámetro en la URL: /api/listReminders/:usuario
    const usuario = req.params.usuario;

    if (!usuario) {
        return res.status(400).json({ mensaje: 'Falta el usuario' });
    }

    const nombreArchivo = `${usuario.replace(/\s+/g, '_').toLowerCase()}.json`;
    const rutaArchivo = path.join(userDir, nombreArchivo);

    if (!fs.existsSync(rutaArchivo)) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuarioData = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'));
    const recordatorios = usuarioData.recordatorios || [];

    res.status(200).json(recordatorios);
};