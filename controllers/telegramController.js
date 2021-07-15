const { Op } = require('sequelize');
const paginate = require('./../utils/paginate');
const db = require('../models');
const axios = require('axios');

exports.sendMessage = async (req, res, next) => {
  try {
    const { name, phone, type, description } = req.query;
    console.log(req);
    if (!name || !phone) {
      throw new Error('Name or Phone number is empty');
    }
    const token = process.env.TELEGRAM_BOT_TOKEN;

    const response = await axios.get(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        params: {
          chat_id: -1001426961131,
          parse_mode: 'HTML',
          text: `🚨🚨<b>New Listing🚨🚨</b>

Name:   <pre>${name}</pre>
Phone Number:   <pre>${phone}</pre>
Listing Type:   <pre>${type || 'Unknown Type'}</pre>

<b>Description : </b>  <pre>"${description}"</pre>
`
        }
      }
    );

    if (!response.data.ok) throw new Error(response.data.description);

    res.status(200).json({
      success: true,
      message: 'Success'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
