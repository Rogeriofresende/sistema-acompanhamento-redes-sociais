const express = require('express');
const router = express.Router();
const { updateEmail, updateRole, updateProfile } = require('../../controllers/userController');
const requireAuth = require('../middlewares/requireAuth');

// PATCH /api/user/email
router.patch('/user/email', requireAuth, updateEmail);

// PATCH /api/user/role
router.patch('/user/role', requireAuth, updateRole);

// PATCH /api/user/upgrade
router.patch('/user/upgrade', requireAuth, updateProfile);

module.exports = router; 