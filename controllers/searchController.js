const { Op } = require("sequelize");
const paginate = require("./../utils/paginate");
const db = require("../models");
const { ORDER_BY, FOUR_PLUS } = require("../utils/constants");

exports.searchProperties = async (req, res, next) => {
  try {
    var priceQuery = {};
    var dealTypeQuery = {};
    var bedroomQuery = {};
    var bathroomQuery = {};
    var sortQuery = {};
    var propertyTypeQuery = {};
    var zoneQuery = {};
    var textQuery = {};
    var orderBy = [];
    const {
      minPrice,
      maxPrice,
      dealType,
      numberOfBedrooms,
      numberOfBathrooms,
      sortBy,
      propertyType,
      zone,
      text,
    } = req.query;

    if (text) {
      textQuery["$propertyGroup.project_name$"] = {
        [Op.like]: `%${text}%`,
      };
    }

    if (dealType) {
      if (!["sale", "rent"].includes(dealType.toLowerCase())) {
        console.log("type : ", dealType);
        throw new Error("Deal type must be sale or rent");
      } else {
        dealTypeQuery.dealType = dealType;
      }
    }

    if (minPrice && maxPrice) {
      priceQuery.totalPrice = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice && !maxPrice) {
      priceQuery.totalPrice = {
        [Op.gt]: minPrice,
      };
    } else if (!minPrice && maxPrice) {
      priceQuery.totalPrice = {
        [Op.lt]: maxPrice,
      };
    }

    if (numberOfBedrooms) {
      if (numberOfBedrooms == FOUR_PLUS) {
        bedroomQuery[Op.gt] = 4;
      } else {
        bedroomQuery.numberOfBedrooms = numberOfBedrooms;
      }
    }

    if (numberOfBathrooms) {
      if (numberOfBathrooms == FOUR_PLUS) {
        bedroomQuery[Op.gt] = 4;
      } else {
        bathroomQuery.numberOfBathrooms = numberOfBathrooms;
      }
    }

    if (sortBy) {
      switch (sortBy) {
        case ORDER_BY.lowestToHighest: {
          orderBy.push(["totalPrice", "ASC"]);
          break;
        }
        case ORDER_BY.highestToLowest: {
          orderBy.push(["totalPrice", "DESC"]);
          break;
        }
        default: {
          orderBy.push(["createdAt", "DESC"]);
          break;
        }
      }
    }

    if (propertyType) {
      propertyTypeQuery["$propertyGroup.property_type$"] = {
        [Op.eq]: propertyType,
      };
    }

    if (zone) {
      zoneQuery["$propertyGroup.zoneIdentifier$"] = {
        [Op.eq]: zone,
      };
    }

    // console.log("order : ", orderBy);

    const properties = await db.Property.findAll(
      paginate(
        {
          order: orderBy,
          where: {
            [Op.and]: [
              priceQuery,
              dealTypeQuery,
              bedroomQuery,
              bathroomQuery,
              propertyTypeQuery,
              zoneQuery,
              textQuery,
            ],
          },

          include: [
            { model: db.PropertyImage, as: "propertyImages" },
            {
              model: db.PropertyGroup,
              as: "propertyGroup",
              attributes: [
                "projectName",
                "propertyType",
                "description",
                "zoneIdentifier",
              ],

              // include: [
              //   {
              //     model: db.Address,
              //     as: "address",
              //     include: [{ model: db.Zone, as: "zone" }],
              //   },
              // ],
            },
          ],
        },
        { page: 1, pageSize: 10 }
      )
    );

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
