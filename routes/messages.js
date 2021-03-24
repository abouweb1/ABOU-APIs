const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/messages');

router.get('/getAllMesages', (req, res) => messageControllers.getAllMessages(req, res));

router.post('/sendMessage', (req, res) => messageControllers.sendMessage(req, res));

router.patch('/replied/:id', (req, res) => messageControllers.replied(req, res));

router.delete('/deleteMessage/:id', (req, res) => messageControllers.deleteMessage(req, res));

module.exports = router;