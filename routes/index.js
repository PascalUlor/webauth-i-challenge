const express = require('express');
const Controller = require('../controllers');
const validation = require('../middlewares/validators');
const authentication = require('../auth');

const router = express();

router.get('/', Controller.getUsers);
router.post('/', validation.validateUserSignUp, Controller.createUser);
router.post('/login', authentication.authenticate, Controller.loginUser);
module.exports = router;
