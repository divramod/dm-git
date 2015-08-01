// =========== [ REQUIRE ] ===========
var co = require("co");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(config) {
    try {
        var path = config.path.replace("~", env["HOME"]);
        var pathes = find(path).filter(function(file) {
            var gitPath = file + "/" + ".git";
            if (test("-d", gitPath) && gitPath.indexOf("node_modules") === -1) {
                return true;
            } else {
                return false;
            }
        });
        return pathes;
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
