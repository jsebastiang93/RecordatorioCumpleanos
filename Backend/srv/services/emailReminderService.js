const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const userDir = path.join(__dirname, '../model/users');

// Configura tu transportador de correo (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'recordatoriosdecumpleanos@gmail.com',
        pass: 'Dev$oftware2*'
    }
});

function revisarYEnviarRecordatorios() {
    const archivos = fs.readdirSync(userDir);

    archivos.forEach(archivo => {
        const ruta = path.join(userDir, archivo);
        const usuario = JSON.parse(fs.readFileSync(ruta, 'utf-8'));

        // Calcula la fecha de mañana en formato MM-DD
        const hoy = new Date();
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);
        const mmddManana = manana.toISOString().slice(5, 10); // MM-DD

        usuario.recordatorios.forEach(recordatorio => {
            // Suponiendo que fechaCumpleanos es "YYYY-MM-DD"
            if (recordatorio.fechaCumpleanos.slice(5, 10) === mmddManana) {
                // Envía el correo
                transporter.sendMail({
                    from: '"Recordatorio Cumpleaños" <recordatoriosdecumpleanos@gmail.com>',
                    to: usuario.email,
                    subject: `¡Mañana es el cumpleaños de ${recordatorio.nombreContacto}!`,
                    text: `Recuerda que mañana es el cumpleaños de ${recordatorio.nombreContacto}.\nNota: ${recordatorio.nota || ''}`
                }, (error, info) => {
                    if (error) {
                        console.error('Error enviando correo:', error);
                    } else {
                        console.log('Correo enviado:', info.response);
                    }
                });
            }
        });
    });
}

// Programa la tarea para que se ejecute todos los días a las 8:00 AM
cron.schedule('0 8 * * *', revisarYEnviarRecordatorios);
