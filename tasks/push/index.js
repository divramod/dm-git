// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var inquirer = require("inquirer");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(path) {
    try {
        console.log(path);
        var questions = [{
                type: "input",
                name: "first_name",
                message: "What's your first name"
            }

        ];

        inquirer.prompt(questions, function(answers) {
            console.log(JSON.stringify(answers, null, "  "));
        });

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

job.push = function push(path) {
    co(function*() {
        var testAnswer =
            yield dmPrompt({
                type: "input",
                name: "test",
                message: ""
            });
        var test = testAnswer.test;
        console.log(test);
        console.log(path);
    });
}

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
