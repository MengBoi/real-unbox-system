const { Op } = require("sequelize");
const paginate = require("./../utils/paginate");
const db = require("../models");

//@desc get all properties
//@route GET /api/v1/properties
//@acccess PUBLIC
exports.getProperties = async (req, res, next) => {
  try {
    var zoneQuery = {};
    var propertyTypeQuery = {};
    var mainPropertyTypeQuery = {};

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (req.query.hasOwnProperty("zoneId")) {
      zoneQuery.zoneId = req.query.zoneId;
    }

    if (req.query.hasOwnProperty("propertyGroupTypeId")) {
      propertyTypeQuery.propertyGroupTypeId = req.query.propertyGroupTypeId;
    }

    const properties = await db.Property.findAll(
      paginate(
        {
          include: [
            { model: db.PropertyImage, as: "propertyImages" },
            {
              model: db.PropertyGroup,
              as: "propertyGroup",
              where: propertyTypeQuery,
              required: true,
              include: [
                {
                  model: db.PropertyGroupType,
                  as: "propertyGroupType",
                },
              ],
            },
          ],
        },
        { page: page, pageSize: pageSize }
      )
    );
    res.status(200).json({
      success: true,
      data: properties,
      count: properties.length,
      page: page,
      pageSize: pageSize,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getFeaturedProperties = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20, order } = req.query;
    const properties = await db.Property.findAll({
      where: { isFeatured: true },
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
        },
      ],
    });
    // console.log(page, req.query);
    res.status(200).json({
      success: true,
      data: properties,
      page: page,
      pageSize: pageSize,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//@desc Get single properties
//@route GET /api/v1/property/:id
//@acccess PUBLIC
exports.getProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.query;
    const property = await db.Property.findByPk(propertyId, {
      include: [
        { model: db.PropertyImage, as: "propertyImages" },
        {
          model: db.PropertyGroup,
          as: "propertyGroup",
          include: [
            {
              model: db.Neighbourhood,
              as: "neighbourhoods",
              include: [
                { model: db.NeighbourhoodItem, as: "neighbourhoodItems" },
              ],
            },
          ],
        },
      ],
    });
    if (!property) throw new Error("Property does not exists");
    // console.log(condo);

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//@desc Create property
//@route POST /api/v1/property
//@acccess PRIVATE
exports.createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);
    res.status().json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//@desc Update property
//@route PUT /api/v1/property/:id
//@acccess PRIVATE
exports.updateProperty = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Property.update(req.body, { where: { id: id } });
    // const { id } = req.body;
    // const property = await Property.findByPk(id);
    // if (property) {
    //   property.title = title;
    //   property.price = price;
    //   property.imageUrl = imageUrl;
    //   property.description = description;

    //   property.save();
    //   res.status(200).json({ success: true, data: property });
    // } else {
    //   throw new Error('Unable to find this property');
    // }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//@desc Delete proeprty
//@route DELETE /api/v1/property/:id
//@acccess PRIVATE
exports.deleteProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const property = await Property.destroy({ where: { id: propertyId } });
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status().json({ success: false, message: error.message });
  }
};
