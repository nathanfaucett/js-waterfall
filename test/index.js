var tape = require("tape"),
    waterfall = require("..");


tape("waterfall(tasks, callback) should executes tasks in series. Each step receives the arguments from the previous step.", function(assert) {
    waterfall([
            function(next) {
                next(undefined, "a", "b", "c");
            },
            function(a, b, c, next) {
                assert.equal(a, "a");
                assert.equal(b, "b");
                assert.equal(c, "c");
                next(undefined, a + b, b + c);
            }
        ],
        function(error, ab, bc) {
            assert.equal(ab, "ab");
            assert.equal(bc, "bc");
            assert.end();
        }
    );
});
