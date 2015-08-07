// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(path) {
    try {
        var stdOut = exec('cd ' + path + ' && git status', {
            silent: true
        });
        var gitStatus = {};
        gitStatus.output = stdOut.output;
        if (gitStatus.output.indexOf("nothing to commit") > -1) {
            gitStatus.nothingToCommit = true;
        } else {
            gitStatus.nothingToCommit = false;
        }
        if (gitStatus.output.indexOf("Your branch is ahead of") > -1) {
            gitStatus.branchAheadOf = true;
        } else {
            gitStatus.branchAheadOf = false;
        }
        if (gitStatus.output.indexOf("Changes not staged for commit") > -1) {
            gitStatus.changesNotStaged = true;
        } else {
            gitStatus.changesNotStaged = false;
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve(gitStatus);
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
