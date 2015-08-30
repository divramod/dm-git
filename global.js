var colors = require("colors");
var co = require("co");
require("shelljs/global");
var jobs = {};
var result = {};
var module_path = __dirname;

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {
    try {

        // =========== [ get params from user input ] ===========
        var argv2 = process.env.dmnJob || process.argv[2] || "help";

        // =========== [ help ] ===========
        if (["help", "-help", "h", "-h"].indexOf(argv2) > -1) {
            var task = require("./tasks/help/index.js");
            yield task.start(module_path);
        }
        // =========== [ clone github user repository ] ===========
        else if (["c", "clone"].indexOf(argv2) > -1) {
            var job = require("./jobs/cloneGithubUserRepository/index.js");
            yield job.start(module_path);
        }
        // =========== [ test ] ===========
        else if (["test", "-test", "t", "-t"].indexOf(argv2) > -1) {
            var task = require("./tasks/test/index.js");
            yield task.start();
        }
        // =========== [ pushRecursive ] ===========
        else if (["pushRecursive", "push"].indexOf(argv2) > -1) {
            var task = require("./tasks/pushRecursive/index.js");
            yield task.start(module_path);
        }
        // =========== [ pushRecursive ] ===========
        else if (["pullRecursive", "pull"].indexOf(argv2) > -1) {
            var task = require("./tasks/pullRecursive/index.js");
            yield task.start(module_path);
        }
        // =========== [ pushRecursive ] ===========
        else if (["commit", "c"].indexOf(argv2) > -1) {
            var task = require("./tasks/commit/index.js");
            yield task.start();
        }
        // =========== [ help ] ===========
        else {
            var task = require("./tasks/help/index.js");
            yield task.start(module_path);
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve(result);
}); // job.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
