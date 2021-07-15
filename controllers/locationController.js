const { Op } = require('sequelize');
const paginate = require('./../utils/paginate');
const db = require('../models');

//@desc get all properties
//@route GET /api/v1/properties
//@acccess PUBLIC
exports.getZones = async (req, res, next) => {
  try {
    const zones = await db.Zone.findAll({
      include: [{ model: db.City, as: 'city' }]
    });
    // console.log(page, req.query);
    res.status(200).json({
      success: true,
      data: zones
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
