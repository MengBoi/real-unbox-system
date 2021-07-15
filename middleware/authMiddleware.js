const jwt = require('jsonwebtoken');
const db = require('../models');

exports.adminProtected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    console.log('token : ', token);
  }
  if (!token) {
    return res.status(400).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log('decoded : ', decoded.id);

    const user = await db.User.findOne({ where: { id: decoded.id } });

    if (!user)
      return res.status(400).json({ success: false, message: 'Unauthorized' });

    console.log('user : ', user);
    if (user.role == 'admin') {
      req.user = user;
      return next();
    } else {
      // return next(new Error('Unauthorized'));
      return res.status(400).json({ success: false, message: 'Unauthorized' });
    }
  } catch (error) {
    console.log('err : ', error);
    return res.status(400).json({ success: false, message: 'Unauthorized' });
  }
};
