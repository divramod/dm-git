var co = require("co");
var jobs = {};

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {
    try {

        // =========== [ get params from user input ] ===========
        var argv2 = process.env.dmnJob || process.argv[2] || "help";

        // =========== [ clone github user repository ] ===========
        if (["c", "clone"].indexOf(argv2) > -1) {
            var job = require("./jobs/cloneGithubUserRepository/index.js");
            yield job.start(module_path);
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

        // automatically add tasks here


        // =========== [ help ] ===========
        else {
            require("dm-npm").getCommonTasks(argv2, __dirname);
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve();
}); // job.index()


// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
