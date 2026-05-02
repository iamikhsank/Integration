const MasterProduct = require('../models/MasterProduct');
const ProductItem = require('../models/ProductItem');

/**
 * @desc    Get all unique categories with product counts
 * @route   GET /api/v1/categories
 * @access  Protected (admin, cashier)
 * @returns All categories regardless of status, with product counts
 */
exports.getCategories = async (req, res) => {
  try {
    const { search = '' } = req.query;
    console.log('📦 Fetching categories' + (search ? ` (search: ${search})` : ''));

    // Step 1: Get ALL unique categories from MasterProduct (NO status filter)
    const matchStage = {};
    if (String(search).trim()) {
      matchStage.categoryName = {
        $regex: String(search).trim(),
        $options: 'i'
      };
    }

    const categories = await MasterProduct.aggregate([
      // Match search if provided
      ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
      // Group by categoryName to get unique categories
      {
        $group: {
          _id: '$categoryName',
          categoryName: { $first: '$categoryName' },
          // Count total master products in this category
          masterProductCount: { $sum: 1 },
          // Get sample logo from first product (for UI display)
          sampleLogo: { $first: '$logo' }
        }
      },
      // Sort by category name
      {
        $sort: { categoryName: 1 }
      }
    ]);

    console.log(`✓ Found ${categories.length} unique categories`);

    // Step 2: Get product counts per category
    const productCounts = await ProductItem.aggregate([
      // NO status filter - count ALL products
      {
        $lookup: {
          from: 'masterproducts',
          localField: 'masterProductId',
          foreignField: '_id',
          as: 'masterProduct'
        }
      },
      {
        $unwind: '$masterProduct'
      },
      {
        $group: {
          _id: '$masterProduct.categoryName',
          productCount: { $sum: 1 }
        }
      }
    ]);

    // Create map for quick lookup
    const productCountMap = new Map(
      productCounts.map((item) => [String(item._id || ''), Number(item.productCount || 0)])
    );

    // Step 3: Combine results
    const data = categories.map((category) => ({
      _id: category._id,
      name: category.categoryName || '',
      categoryName: category.categoryName || '',
      masterProductCount: Number(category.masterProductCount || 0),
      productCount: productCountMap.get(String(category.categoryName || '')) || 0,
      logo: category.sampleLogo || ''
    }));

    console.log(`✓ Returning ${data.length} categories with product counts`);

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error('❌ getCategories error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};