const mongoose = require('mongoose');
const ForecastResult = require('../models/ForecastResult');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Get forecast data by parent code
 * @route   GET /api/forecast/:parent_code
 * @access  Public (or adjust as needed)
 */
const getForecastByParentCode = asyncHandler(async (req, res) => {
  const { parent_code } = req.params;

  if (!parent_code) {
    return res.status(400).json({
      success: false,
      message: 'Parent code is required'
    });
  }

  const forecasts = await ForecastResult.find({ product_code: parent_code })
    .sort({ forecast_date: 1 });

  if (!forecasts || forecasts.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No forecast data found for this product code'
    });
  }

  return res.status(200).json({
    success: true,
    data: forecasts
  });
});

module.exports = {
  getForecastByParentCode
};