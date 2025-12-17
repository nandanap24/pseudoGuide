import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch questions by difficulty
 * @param {string} difficulty - easy, medium, or hard
 * @returns {Promise} - Questions data
 */
export const fetchQuestions = async (difficulty) => {
  try {
    const response = await api.get(`/questions?difficulty=${difficulty}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Check user pseudocode submission
 * @param {string} questionId - Question ID
 * @param {string} userCode - User's pseudocode
 * @returns {Promise} - Validation result
 */
export const checkPseudocode = async (questionId, userCode) => {
  try {
    const response = await api.post('/check-pseudocode', {
      questionId,
      userCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;
