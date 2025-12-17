const { normalizeLine, normalizeLines } = require('../utils/normalizeLine');

/**
 * Compares user code against a single valid answer
 * @param {string[]} userLines - Normalized user lines
 * @param {string[]} answerLines - Normalized answer lines
 * @returns {Object} - Comparison result with errors
 */
const compareWithAnswer = (userLines, answerLines) => {
  const errors = [];
  const maxLength = Math.max(userLines.length, answerLines.length);
  
  for (let i = 0; i < maxLength; i++) {
    const userLine = userLines[i] || null;
    const expectedLine = answerLines[i] || null;
    
    // Case 1: User has more lines than expected
    if (userLine && !expectedLine) {
      errors.push({
        lineNumber: i + 1,
        expected: [],
        received: userLine,
        reason: 'Extra line - this line should not be present'
      });
      continue;
    }
    
    // Case 2: User is missing lines
    if (!userLine && expectedLine) {
      errors.push({
        lineNumber: i + 1,
        expected: [expectedLine],
        received: '',
        reason: 'Missing line - expected step not found'
      });
      continue;
    }
    
    // Case 3: Lines don't match
    if (userLine !== expectedLine) {
      const reason = detectErrorReason(userLine, expectedLine);
      errors.push({
        lineNumber: i + 1,
        expected: [expectedLine],
        received: userLine,
        reason
      });
    }
  }
  
  return {
    matches: errors.length === 0,
    errors
  };
};

/**
 * Detects the type of error between user and expected line
 * @param {string} userLine - User's line
 * @param {string} expectedLine - Expected line
 * @returns {string} - Error reason
 */
const detectErrorReason = (userLine, expectedLine) => {
  // Check for loop-related errors
  if (expectedLine.includes('for') && userLine.includes('for')) {
    if (expectedLine.includes('to') && userLine.includes('to')) {
      return 'Incorrect loop bounds';
    }
    return 'Wrong loop logic';
  }
  
  // Check for conditional errors
  if (expectedLine.includes('if') && userLine.includes('if')) {
    return 'Missing or incorrect condition';
  }
  
  // Check for variable assignment errors
  if (expectedLine.includes('set') || expectedLine.includes('=')) {
    if (userLine.includes('set') || userLine.includes('=')) {
      return 'Incorrect variable assignment';
    }
  }
  
  // Check for termination errors
  if (expectedLine.includes('end') || expectedLine.includes('stop')) {
    return 'Incorrect termination statement';
  }
  
  // Check for order issues
  if (expectedLine.includes('start') || expectedLine.includes('begin')) {
    return 'Incorrect order - this should be at the beginning';
  }
  
  // Generic mismatch
  return 'Incorrect statement or syntax';
};

/**
 * Matches user code against all valid answers for a question
 * @param {string} userCode - Raw user pseudocode
 * @param {Array<Array<string>>} validAnswers - Array of valid answer arrays
 * @returns {Object} - Match result with status and errors
 */
const matchPseudocode = (userCode, validAnswers) => {
  if (!userCode || typeof userCode !== 'string') {
    return {
      status: 'incorrect',
      errors: [{
        lineNumber: 0,
        expected: [],
        received: '',
        reason: 'No code submitted'
      }]
    };
  }
  
  if (!Array.isArray(validAnswers) || validAnswers.length === 0) {
    return {
      status: 'incorrect',
      errors: [{
        lineNumber: 0,
        expected: [],
        received: '',
        reason: 'No valid answers available for this question'
      }]
    };
  }
  
  // Parse and normalize user code
  const userLines = userCode
    .split('\n')
    .map(line => normalizeLine(line))
    .filter(line => line.length > 0);
  
  if (userLines.length === 0) {
    return {
      status: 'incorrect',
      errors: [{
        lineNumber: 0,
        expected: [],
        received: '',
        reason: 'Empty submission'
      }]
    };
  }
  
  // Try matching against each valid answer
  let bestMatch = null;
  let minErrors = Infinity;
  
  for (const answer of validAnswers) {
    const normalizedAnswer = normalizeLines(answer);
    const result = compareWithAnswer(userLines, normalizedAnswer);
    
    // If perfect match found, return immediately
    if (result.matches) {
      return {
        status: 'correct',
        errors: []
      };
    }
    
    // Track the best partial match
    if (result.errors.length < minErrors) {
      minErrors = result.errors.length;
      bestMatch = result;
    }
  }
  
  // Determine status based on error count
  const errorRate = minErrors / Math.max(userLines.length, 1);
  const status = errorRate < 0.5 ? 'partial' : 'incorrect';
  
  return {
    status,
    errors: bestMatch.errors
  };
};

module.exports = {
  matchPseudocode,
  compareWithAnswer,
  detectErrorReason
};
