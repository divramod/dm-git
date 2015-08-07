// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var getGitPathes = require(process.cwd() + "/tasks/getGitPathes/index.js").start;
var getGitStatus = require(process.cwd() + "/jobs/status/index.js").start;
var inquirer = require("inquirer");
//var dmStatus = require("./../jobs/status/index.js");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// config: {
//      type: [ask|root],
//      tree: [recursive|1|2|...]
// }
job.start = co.wrap(function*(type, tree, path) {
    try {
        //console.log("start pushRecursive");
        var configPathes = {
            "path": "~/code/dm",
            "type": "ask"
        };

        var pathes =
            yield getGitPathes(configPathes);

        for (var i = 0, l = pathes.length; i < l; i++) {
            var path = pathes[i];
            if (path.indexOf("dm-git") > -1) {
                var gitStatus =
                    yield getGitStatus(path);

                if (gitStatus.changesNotStaged) {
                    console.log(gitStatus.output);
                    var commitMessageAnswer =
                        yield dmPrompt({
                            type: "input",
                            name: "commitMessage",
                            message: "Please enter your commit commitMessage:"
                        });

                    var commitMessage = commitMessageAnswer.commitMessage;

                    exec('cd ' + path + ' && git add -A && git commit -m "' + commitMessage + '"', {
                        silent: false
                    });

                    exec('git push -u origin HEAD', {
                      silent: false
                    });
                }
            }
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
