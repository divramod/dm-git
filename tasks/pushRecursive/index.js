// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// config: {
//      type: [ask|root],
//      tree: [recursive|1|2|...]
// }
job.start = co.wrap(function*(type, tree, path) {
    try {
        var getGitPathes = require("./../getGitPathes/index.js").start;
        //console.log("start pushRecursive");
        var configPathes = {
            "path": "~/code/dm",
            "type": "ask"
        };

        var pathes =  yield getGitPathes(configPathes);
        console.log(pathes);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
