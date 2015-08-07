// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require("fs");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// configFileExample
// {
//   "cloneGithubUserRepository": { 
//      "user": "YOURGITHUBUSERNAME"
//   },
//   "getConfigFile": {
//   },
//   "status": {
//   },
//   "pushRecursive": {
//      "config": {
//
//      }
//      "pathes": [
//          { "path": "~/code/dm", "recursive": true },
//          { "path": "~/code/divramod", "recursive": false},
//          { "path": "~/dotfiles", "recursive": false}
//      ]
//   }
// }
job.start = function() {
    try {
        var configFilePath = env["HOME"] + '/.dm-git.json';
        if (test("-f", configFilePath)) {
            var config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
        } else {
            var config = false;
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return config;
}; // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
