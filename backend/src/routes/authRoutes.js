const express = require('express');
const router = express.Router();

const { googleSignIn } = require('../controllers/authController');

// Exemplo de rota
router.post('/google', googleSignIn);

module.exports = router;
