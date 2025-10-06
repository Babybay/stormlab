const express = require('express');
const router = express.Router();

// Temporary route
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contact form submitted successfully'
  });
});

module.exports = router;