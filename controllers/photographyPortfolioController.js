const { Op } = require('sequelize');
const paginate = require('./../utils/paginate');
const {
  PORTFOLIO_TYPES_ARCHITECTURAL,
  PORTFOLIO_TYPES_ARIEL,
  PORTFOLIO_TYPES_EXTERIOR,
  PORTFOLIO_TYPES_INTERIOR
} = require('./../utils/constants');
const db = require('../models');

//@desc get all properties
//@route GET /api/v1/properties
//@acccess PUBLIC
exports.getPhotographyPortfolio = async (req, res, next) => {
  try {
    var typeQuery = {};
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const type = req.query.type;

    const validateTypes = [
      PORTFOLIO_TYPES_ARCHITECTURAL,
      PORTFOLIO_TYPES_ARIEL,
      PORTFOLIO_TYPES_EXTERIOR,
      PORTFOLIO_TYPES_INTERIOR
    ];

    if (type) {
      if (!validateTypes.includes(type)) {
        throw new Error(`Type must be in [${validateTypes}]`);
      }
      typeQuery.type = type;
    }

    const photos = await db.PhotographyPortfolio.findAll(
      paginate(
        {
          where: typeQuery
        },
        { page: page, pageSize: pageSize }
      )
    );
    // console.log(page, req.query);
    res.json({
      success: true,
      data: photos
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
