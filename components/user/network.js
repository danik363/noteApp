const response = require('../../sysMessages/response.js');
const router = require('express').Router();
const controller = require('./controller.js');
const { body , validationResult } = require('express-validator');
const passport = require('passport');
const { isAuthenticated , logout } = require('../../auth.js');



module.exports = router;
