"use strict";

const modern = require("minimatch-modern");

// Legacy ESLint plugins still call minimatch as a CommonJS function.
function minimatch(path, pattern, options) {
  return modern.minimatch(path, pattern, options);
}

Object.assign(minimatch, modern);
module.exports = minimatch;
