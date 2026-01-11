const prisma = require("../config/db");
const { matchPseudocode } = require("../services/pseudocodeMatcher");

/**
 * GET /api/questions
 * Supports difficulty filter (?difficulty=easy,medium)
 */
// GET /api/questions/:id
const getQuestionById = async (req, res) => {
  const id = Number(req.params.id);

  const question = await prisma.question.findUnique({
    where: { id },
    include: { answers: true },
  });

  if (!question) {
    return res.status(404).json({ success: false });
  }

  res.json({ success: true, data: question });
};

const getQuestions = async (req, res) => {
  try {
    const { difficulty } = req.query;

    let where = {};

    if (difficulty) {
      where.difficulty = {
        in: difficulty.split(",").map((d) => d.trim().toLowerCase()),
      };
    }

    const questions = await prisma.question.findMany({
      where,
      select: {
        id: true,
        difficulty: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching questions",
    });
  }
};

const checkPseudocode = async (req, res) => {
  try {
    const { questionId, userCode } = req.body;

    if (!questionId || !userCode) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const question = await prisma.question.findUnique({
      where: { id: Number(questionId) },
      include: { answers: true },
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // 🔑 Extract JSON answers
    const validAnswers = question.answers.map((a) => a.code);
    const result = matchPseudocode(userCode, validAnswers);

    res.json({
      success: true,
      status: result.status,
      errors: result.errors,
    });
  } catch (error) {
    console.error("Error checking pseudocode:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { getQuestions, getQuestionById, checkPseudocode };
