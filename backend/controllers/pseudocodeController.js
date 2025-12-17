const Question = require('../models/Question');
const { matchPseudocode } = require('../services/pseudocodeMatcher');

/**
 * Get questions by difficulty
 * GET /api/questions?difficulty=easy
 */
const getQuestions = async (req, res) => {
  try {
    const { difficulty } = req.query;
    
    if (!difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Difficulty parameter is required'
      });
    }
    
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid difficulty. Must be: easy, medium, or hard'
      });
    }
    
    const questions = await Question.find({ 
      difficulty: difficulty.toLowerCase() 
    }).select('-answers');
    
    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching questions'
    });
  }
};

/**
 * Check user pseudocode against correct answers
 * POST /api/check-pseudocode
 */
const checkPseudocode = async (req, res) => {
  try {
    const { questionId, userCode } = req.body;
    
    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: 'Question ID is required'
      });
    }
    
    if (!userCode || typeof userCode !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'User code is required and must be a string'
      });
    }
    
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    const result = matchPseudocode(userCode, question.answers);
    
    res.json({
      success: true,
      status: result.status,
      errors: result.errors
    });
  } catch (error) {
    console.error('Error checking pseudocode:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid question ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while checking pseudocode'
    });
  }
};

module.exports = {
  getQuestions,
  checkPseudocode
};
