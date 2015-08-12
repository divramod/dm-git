// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var getGitPathes = require(__dirname + "/../getGitPathes/index.js").start;
var getConfigFile = require(__dirname + "/../getConfigFile/index.js").start;
var getGitStatus = require(__dirname + "/../../jobs/status/index.js").start;
var inquirer = require("inquirer");
var colors = require("colors");
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
        //TODO get pathes from ~/.dm-git or read it

        var myPathes = [{
            "path": "~/code/dm",
            "recursive": true
        }, {
            "path": "~/dotfiles"
        }];

        var config = getConfigFile();
        console.log(config);

        var configPathes = getConfigFile().pushRecursive.pathes;
        var exclude = getConfigFile().pushRecursive.exclude || undefined;

        var pathes =
            yield getGitPathes(configPathes, exclude);

        for (var i = 0, l = pathes.length; i < l; i++) {
            var path = pathes[i];
            var gitStatus =
                yield getGitStatus(path);

            if (gitStatus.nothingToCommit) {
                console.log(path.green);
            } else {
                console.log(path.yellow);
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

                exec('cd ' + path + ' && git push -u origin HEAD', {
                    silent: false
                });
            }
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
