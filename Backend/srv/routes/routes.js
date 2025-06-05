const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reminderController = require('../controllers/reminderController');

// Rutas de usuario
router.post('/register', userController.newUser);
router.post('/login', userController.login);

// Rutas de recordatorios (ejemplo)
router.post('/newReminder', reminderController.newReminder);
router.put('/editReminder/:id', reminderController.editReminder);
router.delete('/deleteReminder/:id', reminderController.deleteReminder);
router.get('/listReminders/:usuario', reminderController.listReminders);

module.exports = router;