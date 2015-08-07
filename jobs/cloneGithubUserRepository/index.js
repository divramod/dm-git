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
                if (config.github.user) {
                    var user = config.github.user;
                    console.log(user);
                    if (user && argv3) {
                        exec('git clone https://github.com/' + user + '/' + argv3 + '.git', {
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
