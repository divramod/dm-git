// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var path = require('path');

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        console.log("start configFileAdd");

        // ask for global or local
        var locationAnswer =
            yield dmPrompt({
                type: "list",
                name: "location",
                message: "Where should the config file be placed:",
                choices: [
                    "global",
                    "local",
                    "current",
                    "input"
                ]
            });
        var location = locationAnswer.location;
        if (location === "global") {
            var pathDirectory = path.join(path.dirname(require.main.filename), "..");
        } else if (location === "local") {
            var pathDirectory = env["HOME"];
        } else if (location === "current") {
            var pathDirectory = process.cwd();
        } else if (location === "input") {
            var inputPathAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "inputPath",
                    message: "Please enter the path:"
                });
            var inputPath = inputPathAnswer.inputPath;
            var pathDirectory = inputPath;
        }

        var configFileName = ".dm-git";
        var filePath = path.join(pathDirectory, configFileName);
        console.log(filePath);

        //TODO proof if file existent

        //TODO if file existent overwrite

        //TODO create file from template

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
