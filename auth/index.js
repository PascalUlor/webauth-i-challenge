const bcrypt = require('bcrypt');
const userModel = require('../database/models');
const requestHelper = require('../helpers');

const authenticate = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const check = await userModel.findUser(username).first();
    const checkPassword = await bcrypt.compareSync(password, check.password);
    if (check.username === username && checkPassword) {
      // eslint-disable-next-line require-atomic-updates
      req.loggedUser = check;
      next();
    }
    return requestHelper.error(res, 400, 'wrong credentials');
  } catch (err) {}
};

module.exports = { authenticate };
