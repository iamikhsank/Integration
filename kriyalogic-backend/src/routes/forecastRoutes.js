const express = require('express');
const router = express.Router();
const { getForecastByParentCode } = require('../controllers/forecastController');

// GET /api/forecast/:parent_code
router.get('/:parent_code', getForecastByParentCode);

module.exports = router;