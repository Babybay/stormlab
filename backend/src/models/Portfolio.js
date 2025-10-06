const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Strategic Planning',
      'Social Media Planning',
      'SEO & Content Marketing',
      'Design and Graphics',
      'Analytics & Reporting'
    ]
  },
  client: {
    type: String,
    required: [true, 'Please add client name']
  },
  year: {
    type: Number,
    required: [true, 'Please add year'],
    min: 2020,
    max: new Date().getFullYear() + 1
  },
  image: {
    url: String,
    publicId: String
  },
  tags: [String],
  description: {
    type: String,
    required: [true, 'Please add description']
  },
  challenge: String,
  result: String,
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.1)'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);