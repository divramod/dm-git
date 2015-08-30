var jobs = {};

jobs.status = require("./jobs/status/index.js").start;
jobs.commit = require("./tasks/commit/index.js").start;

module.exports = jobs;
