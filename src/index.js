var isFunction = require("@nathanfaucett/is_function"),
    fastSlice = require("@nathanfaucett/fast_slice");


module.exports = waterfall;


function waterfall(tasks, callback) {
    var index = 0,
        length = tasks.length,
        called = false;

    (function next(error) {
        var args, nextTask;

        if (called === false) {
            if (error) {
                called = true;
                callback(error);
            } else {
                if (index === length) {
                    called = true;
                    callback.apply(null, arguments);
                } else {
                    nextTask = tasks[index];
                    index += 1;

                    args = fastSlice(arguments, 1);
                    args[args.length] = next;

                    if (isFunction(nextTask)) {
                        nextTask.apply(null, args);
                    } else {
                        throw new TypeError("waterfall(tasks, callback) tasks must be functions");
                    }
                }
            }
        }
    }());
}
