var tasks = {};

// example
tasks.test = require("./tasks/test/index.js").start;
tasks.status = require("./jobs/status/index.js").start;
tasks.commit = require("./tasks/commit/index.js").start;

// automatically add tasks here

module.exports = tasks;
