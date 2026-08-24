const normalizeLine = (line) => {
  if (typeof line !== "string") {
    return "";
  }

  return line.toLowerCase().trim().replace(/\s+/g, " ");
};

/**
 * Normalizes an array of lines
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
 * Splits multiline text into array of normalized lines
 * @param {string} text - Multiline text
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
