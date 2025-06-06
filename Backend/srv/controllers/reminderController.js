
// Código
const fs = require('fs');
const path = require('path');
const userDir = path.join(__dirname, '../model/users');

exports.editReminder = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};

// Ejemplo de función para agregar un nuevo recordatorio
exports.newReminder = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};

exports.deleteReminder = (req, res) => {
    const { usuario } = req.body; // usuario (username) debe enviarse en el body
    const reminderId = req.params.id;

    if (!usuario || !reminderId) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const nombreArchivo = `${usuario.replace(/\s+/g, '_').toLowerCase()}.json`;
    const rutaArchivo = path.join(userDir, nombreArchivo);

    if (!fs.existsSync(rutaArchivo)) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuarioData = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'));
    const recordatorios = usuarioData.recordatorios;

    const indice = recordatorios.findIndex(r => String(r.id) === String(reminderId));
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }

    recordatorios.splice(indice, 1);

    fs.writeFileSync(rutaArchivo, JSON.stringify(usuarioData, null, 2));
    res.status(200).json({ mensaje: 'Recordatorio eliminado correctamente' });
};

exports.listReminders = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};