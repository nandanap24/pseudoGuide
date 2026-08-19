/**
 * Normalizes a single pseudocode line for comparison.
 *
 * Converts to lowercase
 * Removes extra whitespace
 * Trims leading/trailing spaces
 *
 * @param {string} line - The line to normalize
 * @returns {string} - Normalized line
 */
const normalizeLine = (line) => {
  if (typeof line !== "string") {
    return "";
  }

  return line.toLowerCase().trim().replace(/\s+/g, " ");
};

/**
 * Normalizes an array of pseudocode lines.
 *
 * @param {string[]} lines - Array of lines to normalize
 * @returns {string[]} - Array of normalized lines
 */
const normalizeLines = (lines) => {
  if (!Array.isArray(lines)) {
    return [];
  }

  return lines
    .map((line) => normalizeLine(line))
    .filter((line) => line.length > 0);
};

/**
 * Splits multiline pseudocode into normalized lines.
 *
 * @param {string} text - Multiline pseudocode
 * @returns {string[]} - Array of normalized lines
 */
const parseUserCode = (text) => {
  if (typeof text !== "string") {
    return [];
  }

  return normalizeLines(text.split("\n"));
};

module.exports = {
  normalizeLine,
  normalizeLines,
  parseUserCode,
};
