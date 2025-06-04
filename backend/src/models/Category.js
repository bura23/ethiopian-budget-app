const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    default: 'default',
  },
  color: {
    type: String,
    default: '#319795', // Default teal color
  },
}, {
  timestamps: true,
});

// Add indexes for better query performance
categorySchema.index({ user: 1, type: 1 });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 