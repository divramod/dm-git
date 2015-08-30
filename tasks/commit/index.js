// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var dmgStatus = require("./../../jobs/status/index.js").start;
var dmPrompt = require("dm-prompt").Inquirer;

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(addChangedFiles, commitMessage) {
    try {
        //console.log("start createCommitMessage");

        var addChangedFiles = addChangedFiles || undefined;
        var commitMessage = commitMessage || undefined;

        // =========== [ get status ] ===========
        var status =
            yield dmgStatus(pwd());

        if (!status.nothingToCommit) {
            if (!commitMessage) {
                console.log(status.output);
                var commitMessageAnswer =
                    yield dmPrompt({
                        type: "input",
                        name: "commitMessage",
                        message: "Please enter your commit message:"
                    });
                var commitMessage = commitMessageAnswer.commitMessage;
                if (addChangedFiles) {
                    commitMessage = "message: " + commitMessage + '; files: ' + getChangedFiles(status);
                }
            }

            exec('git add -A :/ && git commit -m "' + commitMessage + '"', {
                silent: false
            });
        } else {
            console.log("Nothing to commit!".green);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

/**
 *  m: modified
 *  d: deleted
 *  c: new file
 *  u: untracked
 */
function getChangedFiles(status) {
    var statuslines = status.output.split(/\r?\n/);
    var gitcommitmessage = "";
    var counter = 0;
    statuslines.forEach(function(entry) {
        if (entry.indexOf("modified") > -1 && entry.indexOf("swp") === -1) {

            if (counter > 0) {
                gitcommitmessage += " && ";
            }
            gitcommitmessage += "m: " + entry.replace("modified:", "").trim();
            counter++;
        }
        if (entry.indexOf("deleted") > -1 && entry.indexOf("swp") === -1) {

            if (counter > 0) {
                gitcommitmessage += " && ";
            }
            gitcommitmessage += "d: " + entry.replace("deleted:", "").trim();
            counter++;
        }
        if (entry.indexOf("new file") > -1 && entry.indexOf("swp") === -1) {

            if (counter > 0) {
                gitcommitmessage += " && ";
            }
            gitcommitmessage += "c: " + entry.replace("new file:", "").trim();
            counter++;
        }
    });
    // =========== [ add untracked files ] ===========
    var untrackedShell = exec('git ls-files --others --exclude-standard', {
        silent: true
    });
    var untrackedLines = untrackedShell.output.split(/\r?\n/);
    untrackedLines.forEach(function(entry) {
        if (entry !== "") {
            if (counter > 0) {
                gitcommitmessage += " && ";
            }
            gitcommitmessage += "u: " + entry.trim();
        }
    });

    // =========== [ return ] ===========
    return gitcommitmessage;
}

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
