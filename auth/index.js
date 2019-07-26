const cipher = require('../middlewares/cipher');
const userModel = require('../database/models');
const requestHelper = require('../helpers');

const authenticate = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const check = await userModel.findUser(username).first();
    const checkPassword = await cipher.compare(password, check.password);
    if (check.username === username && checkPassword) {
      // eslint-disable-next-line require-atomic-updates
      req.session.user = check;
      next();
    }
    return requestHelper.error(res, 400, 'wrong credentials');
  } catch (err) {
    err;
  }
};

const restricted = (req, res, next) => {
  if (req.session && req.session.user) {
    // for this to succeed
    // 1- request from postman contains a "Cookie" with session id
    // 2- there actually exists a session in the sessions array
    //        with an id that matches the one in the cookie
    // 3- the cookie hasn't expired
    next();
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};

module.exports = { authenticate, restricted };
