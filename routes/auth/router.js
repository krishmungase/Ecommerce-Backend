const express = require('express');
const { logout, authMiddleware } = require('../../controllers/auth/authController');
const register = require('../../controllers/auth/authController').register
const login = require('../../controllers/auth/authController').login


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/check-auth', authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, user, message: 'user is authenticated' })
})

module.exports = router;