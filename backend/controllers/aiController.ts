const askGemini = require('../services/geminiService');
const extractRideSearch = require('../services/rideSearchAI');
const Ride = require('../models/Ride');

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: 'Message is required',
      });
    }

    const reply = await askGemini(message);

    res.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'AI Error',
    });
  }
};

const searchRideAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: 'Message is required',
      });
    }

    // Get extracted search info from Gemini
    const extracted = await extractRideSearch(message);

    // Remove markdown if Gemini returns ```json
    const cleaned = extracted
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const search = JSON.parse(cleaned);

    // Build date range
    const today = new Date();

    let startDate = null;
    let endDate = null;

    if (search.date && search.date.toLowerCase() === 'today') {
      startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
    }

    if (search.date && search.date.toLowerCase() === 'tomorrow') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
    }

    // MongoDB query
    const query: Record<string, unknown> = {
      from: new RegExp(`^${search.from}$`, 'i'),
      to: new RegExp(`^${search.to}$`, 'i'),
    };

    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const rides = await Ride.find(query).populate('driver', 'name');

    if (rides.length === 0) {
      return res.json({
        reply: `Sorry, I couldn't find any rides from ${search.from} to ${search.to}${
          search.date ? ` for ${search.date}` : ''
        }.`,
        rides: [],
      });
    }

    const reply =
      `I found ${rides.length} ride(s) from ${search.from} to ${search.to}${
        search.date ? ` for ${search.date}` : ''
      }.\n\n` +
      rides
        .map(
          (ride) =>
            `🚗 ${ride.time} | $${ride.price} | ${ride.seats} seat(s) available | Driver: ${
              ride.driver?.name || 'Unknown'
            }`,
        )
        .join('\n');

    res.json({
      reply,
      rides,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'AI Search Error',
    });
  }
};

module.exports = {
  chatWithAI,
  searchRideAI,
};
