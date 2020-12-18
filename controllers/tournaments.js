const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');



module.exports = router;