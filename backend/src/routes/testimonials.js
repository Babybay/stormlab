const express = require('express');
const router = express.Router();

// Temporary route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Testimonials endpoint - Coming soon'
  });
});

module.exports = router;