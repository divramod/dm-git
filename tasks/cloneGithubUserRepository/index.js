// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require('fs');
var getConfigFile = require("./../getConfigFile/index.js").start;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*() {
    try {
        var argv3 = process.argv[3];
        var configFilePath = env["HOME"] + '/.dm-git.json';
        var config = getConfigFile().cloneGithubUserRepository;
        if (config) {
            if (config.user) {
                var user = config.user;
                if (user && argv3) {
                    if (argv3) {
                        var repository = argv3;
                    } else {
                        var repositoryAnswer =
                            yield dmPrompt({
                                type: "input",
                                name: "repository",
                                message: "What is your repository name:"
                            });
                        var repository = repositoryAnswer.repository;
                    }
                    exec('git clone https://github.com/' + user + '/' + repository + '.git', {
                        silent: false
                    });
                }
            }
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
