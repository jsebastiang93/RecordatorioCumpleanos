const express = require('express');
const app = express();
const routes = require('./srv/routes/routes');
const PORT = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api', routes);

// Inicializa el cronjob de recordatorios por email
require('./srv/services/emailReminderService');

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});