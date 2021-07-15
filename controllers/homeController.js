const { Op } = require("sequelize");
const paginate = require("./../utils/paginate");
const db = require("../models");

exports.getHomeInfo = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20, order } = req.query;
    const hotDealProperties = await db.HotDealProperty.findAll({
      include: [
        {
          model: db.Property,
          as: "property",
          include: [
            { model: db.PropertyImage, as: "propertyImages" },
            {
              model: db.PropertyGroup,
              as: "propertyGroup",
              include: [{ model: db.Address, as: "address" }],
            },
          ],
        },
      ],
    });
    const mainPropertyGroupTypes = await db.MainPropertyGroupType.findAll({
      include: [
        {
          model: db.PropertyGroupType,
          as: "propertyGroupTypes",
        },
      ],
    });
    const featuredProperties = await db.FeaturedProperty.findAll({
      include: [
        {
          model: db.Property,
          as: "property",
          include: [
            { model: db.PropertyImage, as: "propertyImages" },
            {
              model: db.PropertyGroup,
              as: "propertyGroup",
              include: [{ model: db.Address, as: "address" }],
            },
          ],
        },
      ],
    });
    // console.log(page, req.query);
    res.status(200).json({
      success: true,
      data: {
        mainPropertyGroupTypes,
        featuredProperties,
        hotDealProperties,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
