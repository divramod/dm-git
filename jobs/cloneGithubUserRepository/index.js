// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require('fs');
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        console.log("start cloneGithubUserRepository");
        var argv3 = process.argv[3];
        var configFilePath = env["HOME"] + '/.dm-git.json';
        if (test("-f", configFilePath)) {
            var config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
            if (config) {
                if (config.cloneGithubUserRepository.user) {
                    var user = config.cloneGithubUserRepository.user;
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
        }



    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
