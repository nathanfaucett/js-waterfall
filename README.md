waterfall
=======

waterfall for the browser and node.js

```javascript
var waterfall = require("@nathanfaucett/waterfall"),
    assert = require("@nathanfaucett/assert");


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
        if (error) {
            // handle error;
        } else {
            assert.equal(ab, "ab");
            assert.equal(bc, "bc");
        }
    }
);

```
