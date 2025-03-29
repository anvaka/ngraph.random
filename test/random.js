var test = require('tap').test,
    randomAPI = require('..');

test('random iterator returns all items', function (t) {
    var a = [1, 2, 3, 4, 5, 6],
        aCopy = a.map(function (i) { return i; }),
        shuffle = randomAPI.randomIterator(aCopy),
        iterated = [];

    shuffle.forEach(function (i) {
        iterated.push(i);
        t.ok(a.indexOf(i) !== -1, 'Shuffle iterator should return only items from original array. Passed ' + i);
    });

    t.ok(iterated.length === a.length, 'Number of iterated items does not match number of original array items');
    t.end();
});

test('can shuffle in place', function (t) {
    var a = [1, 2, 3, 4, 5, 6],
        iterator = randomAPI.randomIterator(a);

    var previous = new Set(a);
    iterator.shuffle();
    a.forEach(x => {
        t.ok(previous.has(x));
    });

    t.ok(a.length === previous.size, 'Number of iterated items does not match number of original array items');
    t.end();
});

test('throws when random API is wrong', function (t) {
    t.throws(() => {
        randomAPI.randomIterator([], {});
    }, /next\(\) function is missing/)

    t.end();
});

test('throws when random API is wrong', function (t) {
    randomAPI.randomIterator([]).forEach(x => {
        t.fail('Should not be called on empty array')
    })

    t.end();
});
test('Same seed gives same values', function (t) {
  var random1 = randomAPI.random(42);
  var random2 = randomAPI.random(42);

  t.equal(random1.next(100), random2.next(100), "Same seed should give same values");
  t.end();
});

test('it can generate gaussian', function (t) {
    var random = randomAPI.random(42);
    t.ok(typeof random.gaussian() === 'number', 'number generated');
    t.end();
});

test('it can generate levy', function (t) {
    var random = randomAPI.random(42);
    t.ok(typeof random.levy() === 'number', 'number generated');
    t.end();
});

test('can use function syntax', function (t) {
  var random1 = randomAPI(42);
  var random2 = randomAPI.random(42);

  t.equal(random1.nextDouble(), random2.nextDouble(), "Same seed should give same values");
  t.end();
});

test('can use random syntax', function (t) {
  var math = randomAPI(42);

  t.ok(typeof math.random() === 'number', "Same seed should give same values");
  t.end();
});