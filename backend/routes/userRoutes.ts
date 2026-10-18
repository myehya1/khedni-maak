const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  deleteAccount,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', protect, getProfile);
router.delete('/account', protect, deleteAccount);

module.exports = router;
