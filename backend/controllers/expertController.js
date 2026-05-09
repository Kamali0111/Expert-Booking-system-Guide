import Expert from '../models/Expert.js';

export const getExperts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const experts = await Expert.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-availableSlots');

    const total = await Expert.countDocuments(query);

    res.json({
      success: true,
      data: experts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getExpertById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expert = await Expert.findById(id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    res.json({
      success: true,
      data: expert,
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailableSlots = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expert = await Expert.findById(id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    // Filter out past dates and booked slots
    const today = new Date().toISOString().split('T')[0];
    const availableSlots = expert.availableSlots
      .filter((slot) => slot.date >= today)
      .map((slot) => ({
        date: slot.date,
        slots: slot.slots.filter((s) => !s.isBooked),
      }))
      .filter((slot) => slot.slots.length > 0);

    res.json({
      success: true,
      data: availableSlots,
    });
  } catch (error) {
    next(error);
  }
};
