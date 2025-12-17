const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  answers: {
    type: [[String]],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0 && v.every(answer => Array.isArray(answer) && answer.length > 0);
      },
      message: 'Each question must have at least one valid answer, and each answer must have at least one line'
    }
  }
}, {
  timestamps: true
});

questionSchema.index({ difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);
