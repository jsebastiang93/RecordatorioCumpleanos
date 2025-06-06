const express = require('express');
const app = express();
const routes = require('./srv/routes/routes');
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});