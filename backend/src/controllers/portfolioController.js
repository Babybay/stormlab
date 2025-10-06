const Portfolio = require('../models/Portfolio');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
exports.getAllPortfolio = async (req, res) => {
  try {
    const { category, featured, status = 'published', limit, page = 1 } = req.query;
    
    let query = { status };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const pageSize = parseInt(limit) || 100;
    const skip = (parseInt(page) - 1) * pageSize;
    
    const portfolioItems = await Portfolio.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(skip);
    
    const total = await Portfolio.countDocuments(query);
    
    res.json({
      success: true,
      count: portfolioItems.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / pageSize),
      data: portfolioItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private (Admin only)
exports.createPortfolio = async (req, res) => {
  try {
    const portfolioData = { ...req.body };
    
    // Handle image upload
    if (req.file) {
      portfolioData.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }
    
    // Parse tags if sent as string
    if (typeof portfolioData.tags === 'string') {
      portfolioData.tags = portfolioData.tags.split(',').map(tag => tag.trim());
    }
    
    const portfolio = await Portfolio.create(portfolioData);
    
    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create portfolio',
      error: error.message
    });
  }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private (Admin only)
exports.updatePortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    const updateData = { ...req.body };
    
    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (portfolio.image && portfolio.image.publicId) {
        await cloudinary.uploader.destroy(portfolio.image.publicId);
      }
      
      updateData.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }
    
    // Parse tags if sent as string
    if (typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }
    
    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update portfolio',
      error: error.message
    });
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin only)
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    // Delete image from Cloudinary if exists
    if (portfolio.image && portfolio.image.publicId) {
      await cloudinary.uploader.destroy(portfolio.image.publicId);
    }
    
    await Portfolio.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete portfolio',
      error: error.message
    });
  }
};

// @desc    Get categories
// @route   GET /api/portfolio/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};