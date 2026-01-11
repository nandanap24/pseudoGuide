import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchQuestions = async (difficulties = []) => {
  try {
    // If array is empty, query becomes "" (empty string).
    // Request is just: GET /api/questions
    const query =
      difficulties.length > 0 ? `?difficulty=${difficulties.join(",")}` : "";
    const response = await api.get(`/questions${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const checkPseudocode = async (questionId, userCode) => {
  try {
    const response = await api.post("/check-pseudocode", {
      questionId,
      userCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;
