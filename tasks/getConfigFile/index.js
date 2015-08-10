// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require("fs");
var dmUtil = require("dm-util");

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
        var configFilePath = '~/.dm-git.json';
        var config = dmUtil.getJsonFromFile(configFilePath);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    if (config.data) {
        return config.data;
    } else {
        return false;
    }
}; // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
