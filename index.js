'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: it is designed to return the argument passed on as a parameter.
 * @param {value} the value to be returned by the identity function.
 * @return {value} the value passed as an argument.
 */

function identity(value) {
    return value;
}

module.exports.identity = identity;

/**
 * typeOf: it is designed to return the data type assigned as an argument to the
 * parameter.
 * @param {String} the value to be evaluated by the identity function which 
 * will return its data type as a string.
 * @return {String} the data-type value is returned as a String.
 */
 
function typeOf(value) {
    if(Array.isArray(value)) return 'array'; 
    if(value === null) return 'null';
    if(value instanceof Date) return 'date';
    return typeof value;
}

module.exports.typeOf = typeOf;

/**
 * first: designed to return the first n element of an array. 
 * @param {array} collection to be evaluated. If the collection is not an array,
 * or the n parameter is less than zero, first will return an empty array.
 * @param {n} this argument will make first return the first 'n' 
 * elements in the array.
 * @return {value} the first n value of the array.
 */
 
function first(array, n) {
   if (!Array.isArray(array) || n < 0) return [];
   if (n === undefined) return array[0];
   if (n > 0) {
       n = n > array.length ? array.length : n;
       return array.slice(0, n);
   }    
}

module.exports.first = first;

/**
 * last: designed to return the last n element of an array.
 * @param {array} collection to be evaluated. If the collection is not an array,
 * or the n parameter is less than zero, last will return an empty array.
 * @param {n} this argument will make last return the last 'n' elements in the
 * array.
 * @return {value} the last n value of the array.
 */

function last(array, n) {
  if(!Array.isArray(array) || n < 0) return [];
  if(n === undefined) return array[array.length - 1];
  if(n > array.length) return array;
  if(n > 0) 
    n = n > array.length ? array.length : n;
    return array.slice(n - 1, array.length);
}

module.exports.last = last;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the action 
 * Function to each value in the collection.
 * 
 * @param {Array or Object} the collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}

module.exports.each = each;

//the three things you pass to 'action' are courtesy to the client code 'action'.

/**
 * indexOf: returns the index position of the value. 
 * indexOf will return -1 if the value
 * is not present in the array.
 * @param {array} the collection over which to iterate.
 * @param {value} the value whose index we look for in the array.
 * @return {Number} the index position of the value we are looking for or -1
 * if this value is not found inside the array.
 */

function indexOf(array, value) {
  for(var i = 0; i < array.length; i++) {
      if(value === array[i]) {
          return i;
      }
  } return -1;  
}

module.exports.indexOf = indexOf;

/**
 * filter: designed to look through an array and return the values that pass
 * the truthy test indicated inside of filter.
 * @param {array or object} the collection over which to iterate.
 * @param {function} tests if values are found in the array. 
 * @return {Array} the array with the values that passed the truth test.
 */
 
function filter(array, test) {
    let output = [];
  _.each(array, function(value, i, array) {
    if(test(value, i, array) === true) {
        output.push(value);
    }
  });
  return output;
}

module.exports.filter = filter;

/**
 * reject: designed to look through an array and return the values that do not
 * pass the truth test.
 * @param {array or object} the collection over which to iterate.
 * @param {function} tests if the values are NOT found in the array.
 * @return {Array} the array with the values that DID not pass the truth test.
 */
 
 function reject(array, test) {
  return _.filter(array, function(value, i, array) {
    return (!test(value, i, array));
  });
 }
  
module.exports.reject = reject;

/**
 * partition: designed to break an array into two arrays. One whose elements pass
 * the test, and one whose elements DO NOT.
 * @param {array or object} the collection over which to iterate.
 * @param {function} a function which will test which elements belong in the 
 * passing and non-passing arrays. 
 * @return {Array} the array with the filtered and rejected arrays inside of it.
 */
 
function partition(array, test) {
    let output = [];
    let filterOutput = [];
    let rejectOutput = [];
    _.filter(array, function(value, i, array) {
        if(test(value) === true) {
            filterOutput.push(value);
        }
    });
    output.push(filterOutput);
    _.reject(array, function(value, i, array) {
        if(test(value) === false) {
            rejectOutput.push(value);
        }
    });
    output.push(rejectOutput);
    return output;
}

module.exports.partition = partition;

/**
 * unique: designed to return an array with all the element duplicates 
 * removed.
 * @param {array} collection over which to iterate. Unique will use it to 
 * to then return an array without duplicates.
 * @return {Array} the array with the duplicates removed.
 */

function unique(array) {
    let output = [];
    for(var i = 0; i < array.length; i++) {
        if(_.indexOf(output, array[i]) === -1) {
            output.push(array[i]);
        }        
    }
        return output;
}

module.exports.unique = unique;

/**
 * map: designed to take an array and 'transform' its values in some way.
 * @param {array or object} collection over which to iterate.
 * @param {function} this function, usually called transform, will take the values
 * and change them in some way as assigned, then push them into a new
 * array and return the transformation, which is a copy of the original collection.
 * @return {array or object} the collection that has been modified by using map.
 */

function map(collection, transform) {
    let newArray = [];
    _.each(collection, (value, i, collection) => {
        newArray.push(transform(value, i, collection));    
        
    });
    return newArray;
}

module.exports.map = map;

/**
 * pluck: designed to extract a list of property values after iterating over 
 * the collection at hand.
 * @param {array or object} collection over which to iterate.
 * @param {function} iterates over the values, and finds values at that property
 * and extracts the values as assigned.
 * @return {Array} the values specified are extracted from the original collection.
 */

function pluck(array, property) {
    let output = [];
    _.map(array, function(value, i, array) {
        if(value === array[i]) {
            output.push(array[i].name);
        }
    });
    return output;
}

module.exorts.pluck = pluck;

/**
 * contains: designed to take an array and return 'true' if the value is present
 * on the array/collection.
 * @param {array or object} collection over which to iterate.
 * @param {function} iterates over the values, locates value we're looking for
 * in the array and returns a boolean.
 * @returns {Boolean} true or false will be returned depending if the value
 * is found inside of the array.
 */
 
function contains(array, value) {
return (_.indexOf(array, value) === -1) ? false : true; 
} 

module.export.contains = contains;

/**
 * every: designed to iterate over a collection and return 'true' if all the 
 * values pass the truth test.
 * @param {array or object} the collection over which to iterate.
 * @param {function} 'tests' the values one by one and retuns
 * a boolean based on the test.
 * @return {Boolean} the boolean value depends on whether all values pass the 
 * truth test. If an element is NOT found, every short-circuits and returns false.
 */
 
function every(collection, test) {
    if(test === undefined) {
    test = _.identity;
    }
    let truth = true;
    _.each(collection, (value, i, list) => {
        if (test(value, i, list) === false)
        truth = false;
    }); return truth;
 }
 
module.exports.every = every;

/**
 * some: designed to iterate over a collection and return 'true' if SOME of the 
 * values are found in the collection as opposed to EVERY one of them and returns
 * a boolean depending on the collection at hand.
 * @param {array or object} the collection over which to iterate.
 * @param {function} 'tests' the values to see if they are true. If a value is true,
 * it short-circuits and stops traversing.
 * @return {Boolean} the boolean value depends on whether SOME values pass the 
 * truth test. 
 */
 
function some(collection, test) {
      if(test === undefined) {
    test = _.identity;
    }
    let truthTest = false;
    _.each(collection, (value, i, list) => {
        if (test(value, i, list) === true)
        truthTest = true;
    }); return truthTest;
}

module.exports.some = some;

/**
 * reduce: designed to simplify a list of values to a single value.
 * "If no start value is passed to the initial invocation of reduce, the function (fn) is 
 * not invoked on the first element of the list. The first element is instead 
 * passed as the start in the invocation of the function on the next element 
 * in the list." 
 * @param {array or object} collection over which to iterate.
 * @param {function} provides the action over every element in the collection. 
 * @param {seed/start} starting point for every iteration of reduce.
 * @return {value} the simplified value from a set of values found in the collection.
 */

function reduce(collection, fn, start) {
    let prev;
    if (start !== undefined) {
        prev = start;
        
    _.each(collection, (element, i, col) => prev = fn(prev, element, i));
    }
    else {
        prev = collection[0];
        _.each(collection, (element, i, col) => {
            if (i === 0) return;
            prev = fn(prev, element, i);
        });
    }
    return prev;
}

module.exports.reduce = reduce;

/**
 * extend: designed to copy all of the 'rest' parameters over to the 
 * destination object and return the destination object. The copying is done
 * in order, so the last source will override properties of the same name in 
 * previous arguments.  
 * @param {object} the destination object which will receive the copies from object2.
 * @param {object2} the source object which will be copied.
 * @param {... operator for possibly more objects if required.} ... operator used
 * which implies more objects. Objects are drawn onto here and they receive copies
 * from object1.
 * @return {Array} array of objects with the original object and the source objects
 * with their new copies added to them. 
 */

function extend(objTo) {
_.each(arguments, function(objFrom) {
   _.each(objFrom, function(value, key) {
       objTo[key] = value;
   }); 
}); 

return objTo;

}

module.exports.extend = extend;