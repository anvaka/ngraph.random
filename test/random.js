var test = require('tap').test,
    randomAPI = require('..');

test('random iterator returns all items', function (t) {
    var a = [1, 2, 3, 4, 5, 6],
        aCopy = a.map(function (i) { return i; }),
        shuffle = randomAPI.randomIterator(aCopy),
        iterated = [];

    shuffle.forEach(function (i) {
        iterated.push(i);
        t.ok(a.indexOf(i) !== -1, 'Shuffle iterator should return only items from original array. Unexpected ' + i);
    });

    t.ok(iterated.length === a.length, 'Number of iterated items does not match number of original array items');
    t.end();
});
