const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  createRide,
  getRides,
  getRideById,
  updateRide,
  deleteRide,
  joinRide,
  cancelRide,
} = require('../controllers/rideController');

router.post('/', protect, createRide);
router.get('/', getRides);

router.get('/:id', getRideById);

router.put('/:id', protect, updateRide);

router.delete('/:id', protect, deleteRide);

router.post('/:id/join', protect, joinRide);

router.post('/:id/cancel', protect, cancelRide);

module.exports = router;
