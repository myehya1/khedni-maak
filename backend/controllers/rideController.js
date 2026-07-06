const Ride = require('../models/Ride');

// CREATE RIDE
const createRide = async (req, res) => {
  try {
    const { from, to, date, time, seats, price } = req.body;

    const ride = await Ride.create({
      from,
      to,
      date,
      time,
      seats,
      price,
      driver: req.user._id,
    });

    res.status(201).json({
      message: 'Ride created successfully',
      ride,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL RIDES / SEARCH
const getRides = async (req, res) => {
  try {
    const { from, to } = req.query;

    const filter = {};

    if (from) {
      filter.from = { $regex: from, $options: 'i' };
    }

    if (to) {
      filter.to = { $regex: to, $options: 'i' };
    }

    const rides = await Ride.find(filter).populate('driver', 'name email');

    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ONE RIDE
const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate(
      'driver',
      'name email',
    );

    if (!ride) {
      return res.status(404).json({
        message: 'Ride not found',
      });
    }

    res.json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RIDE
const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        message: 'Ride not found',
      });
    }

    if (ride.driver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized',
      });
    }

    const { from, to, date, time, seats, price } = req.body;

    ride.from = from;
    ride.to = to;
    ride.date = date;
    ride.time = time;
    ride.seats = seats;
    ride.price = price;

    await ride.save();

    res.json({
      message: 'Ride updated successfully',
      ride,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE RIDE
const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        message: 'Ride not found',
      });
    }

    if (ride.driver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized',
      });
    }

    await Ride.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Ride deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// JOIN RIDE
const joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        message: 'Ride not found',
      });
    }

    if (ride.driver.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: 'You cannot join your own ride',
      });
    }

    const alreadyJoined = ride.passengers.some(
      (passenger) => passenger.toString() === req.user._id.toString(),
    );

    if (alreadyJoined) {
      return res.status(400).json({
        message: 'Already joined this ride',
      });
    }

    if (ride.seats <= 0) {
      return res.status(400).json({
        message: 'No seats available',
      });
    }

    ride.passengers.push(req.user._id);
    ride.seats--;

    await ride.save();

    res.json({
      message: 'Ride joined successfully',
      ride,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// CANCEL JOINED RIDE
const cancelRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        message: 'Ride not found',
      });
    }

    const joined = ride.passengers.some(
      (passenger) => passenger.toString() === req.user._id.toString(),
    );

    if (!joined) {
      return res.status(400).json({
        message: 'You have not joined this ride',
      });
    }

    ride.passengers = ride.passengers.filter(
      (passenger) => passenger.toString() !== req.user._id.toString(),
    );

    ride.seats++;

    await ride.save();

    res.json({
      message: 'Ride cancelled successfully',
      ride,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRide,
  getRides,
  getRideById,
  updateRide,
  deleteRide,
  joinRide,
  cancelRide,
};
