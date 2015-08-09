// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPath = require("dm-path");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// path format
// { "path": "~/some/path", "recursive": [true|false] }
job.start = co.wrap(function*(pathes, exclude) {
    try {

        var gitPathes = [];
        if (pathes) {
            // get pathes from given pathes
            for (var i = 0, l = pathes.length; i < l; i++) {
                var configPath = pathes[i];
                var path = dmPath.replace(configPath.path);
                var recursive = configPath.recursive || false;
                if (recursive) {
                    var foundGitPathes = find(path).filter(function(file) {
                        var gitPath = file + "/" + ".git";
                        if (exclude) {
                            for (var i = 0, l = exclude.length; i < l; i++) {
                                var ex = exclude[i];
                                if (gitPath.indexOf(ex) > -1) {
                                    return false;
                                }
                            }
                        }
                        if (test("-d", gitPath)) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    gitPathes.push.apply(gitPathes, foundGitPathes)
                } else {
                    if (test("-d", path + "/.git")) {
                        gitPathes.push(path);
                    }
                }
            }
        } else {
            console.log("No pathes given!".red);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve(gitPathes);
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
