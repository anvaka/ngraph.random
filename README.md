ngraph.random
=============

Operation with seeded random numbers for ngraph.*.

[![build status](https://github.com/anvaka/ngraph.random/actions/workflows/tests.yaml/badge.svg)](https://github.com/anvaka/ngraph.random/actions/workflows/tests.yaml)

Install
=======

You can use CDN:

``` html
<script src='https://cdn.jsdelivr.net/npm/ngraph.random/dist/ngraph.random.js'></script>
```

The library will be accessible via `ngraphRandom` global name.

You can also install it via [npm](http://npmjs.org):

```
npm install ngraph.random
```

and then:

``` js
var ngraphRandom = require('ngraph.random');
```

Usage
=====
API provides random number generation, and array shuffling. 

Let's start with random number generation:

``` js
// create generator, seeded with 42
var randomGenerator = ngraphRandom(42);

 // prints double number from [0..1)
console.log(randomGenerator.nextDouble());

// Get next non-negative random number, less than 100.
console.log(randomGenerator.next(100)); // prints 20, we are seeded
// Note: next() always expect maxValue. If you don't pass it it will return NaN.
// This is done for performance reasons, we don't want to check input arguments
// on each call.
```

Second part of the API is array shuffling:

``` js
var ngraphRandom = require('ngraph.random');

// create "shuffling" iterator:
var originalArray = [0, 1, 2, 3, 4, 5];
var randomIterator = ngraphRandom.randomIterator(originalArray);

// iterate over array in random order:
randomIterator.forEach(function(x) {
  console.log(x); // prints originalArray's items in random order
});
// Note: using random iterator does modify original array.
// This is done to save memory.

// If you want to re-shuffle array in-place, you can use:
randomIterator.shuffle();

// Finally if you want to have seeded shuffling you can pass optional seeded 
// random number generator:
var seededGenerator = ngraphRandom.random(42);
ngraphRandom.randomIterator(originalArray, seededGenerator); 
```


## distributions

The library supports random number generation that follow Gaussian distribution:

``` js
var generator = ngraphRandom(42);

// returns a random number from a gaussian distribution with mean 0 and
// standard deviation 1
generator.gaussian();
```

It also supports random number generation that follow [Lévy distribution](https://en.wikipedia.org/wiki/L%C3%A9vy_distribution):

``` js
var generator = ngraphRandom(42);
generator.levy();
```

See example here: https://twitter.com/anvaka/status/1296182534150135808

License
=======
BSD 3-clause
