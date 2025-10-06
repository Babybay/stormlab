const express = require('express');
const router = express.Router();
const {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getCategories
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');

const { upload } = require('../config/cloudinary'); // Cloudinary upload middleware
const { upload } = require('../config/localStorage'); // Local Storage upload middleware

// Public routes
router.get('/', getAllPortfolio);
router.get('/categories', getCategories);
router.get('/:id', getPortfolioById);

// Protected routes (Admin only)
router.post('/', protect, upload.single('image'), createPortfolio);
router.put('/:id', protect, upload.single('image'), updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

module.exports = router;