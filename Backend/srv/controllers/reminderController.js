const fs = require('fs');
const path = require('path');
const userDir = path.join(__dirname, '../model/users');

exports.editReminder = (req, res) => {
    // Implementación aquí...
    res.json({ mensaje: 'Funcionalidad en desarrollo' });
};


exports.newReminder = (req, res) => {
    const { usuario, nombreContacto, fechaCumpleanos, nota } = req.body;

    if (!usuario || !nombreContacto || !fechaCumpleanos) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const nombreArchivo = `${usuario.replace(/\s+/g, '_').toLowerCase()}.json`;
    const rutaArchivo = path.join(userDir, nombreArchivo);

    if (!fs.existsSync(rutaArchivo)) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuarioData = JSON.parse(fs.readFileSync(rutaArchivo, 'utf-8'));
    const recordatorios = usuarioData.recordatorios || [];

    // Generar un ID consecutivo
    let nuevoId = 1;
    if (recordatorios.length > 0) {
        const ids = recordatorios.map(r => r.id || 0);
        nuevoId = Math.max(...ids) + 1;
    }

    const nuevoRecordatorio = {
        id: nuevoId,
        nombreContacto,
        fechaCumpleanos,
        nota: nota || ""
    };

    recordatorios.push(nuevoRecordatorio);
    usuarioData.recordatorios = recordatorios;

    fs.writeFileSync(rutaArchivo, JSON.stringify(usuarioData, null, 2));
    res.status(201).json({ mensaje: 'Recordatorio agregado correctamente', recordatorio: nuevoRecordatorio });
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