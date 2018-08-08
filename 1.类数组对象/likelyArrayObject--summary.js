var nullArray = [];
var push = nullArray.push,
    pop = nullArray.pop,
    indexOf = nullArray.indexOf,
    join = nullArray.join,
    reverse = nullArray.reverse,
    shift = nullArray.shift,
    unshift = nullArray.unshift,
    sort = nullArray.sort,
    splice = nullArray.splice;

var test = {
    0: 'a',
    1: 'b',
    length: 2
};

push.call(test, 'c');
console.log(test);
// {0: "a", 1: "b", 2: "c", length: 3}

pop.call(test);
console.log(test);
// {0: "a", 1: "b", length: 2}

var index = indexOf.call(test, 'b');
console.log(index);
// 1

var join_str = join.call(test, '');
console.log(join_str);
// "ab"

reverse.call(test);
console.log(test);
// {0: "b", 1: "a", length: 2}

shift.call(test);
console.log(test);
// {0: "a", length: 1}

unshift.call(test, 'c');
console.log(test);
// {0: "c", 1: "a", length: 2}

sort.call(test, function(a, b) { return a >= b ? 1 : -1; });
console.log(test);
// {0: "a", 1: "c", length: 2}

splice.call(test, 1, 1, 'b');
console.log(test);
// {0: "a", 1: "b", length: 2}


/* 补充几个不能用该技巧的方法 */
var concat = nullArray.concat,
    slice = nullArray.slice;

// 这些方法实际上是通过将元素放入一个空数组中去实现的，所以当方法的运行环境( this )，不是数组时，会声明一个空数组，然后将 this 放到数组中( 参数也是一样操作的 )。因此该类方法返回的一定是一个 Array 对象。

// concat 方法不会改变原数组，所以这里是这样写 demo 的
var new_test = concat.call(test, 'c');
console.log(new_test);
// [{…}, "c"]

// slice 方法不会改变原数组，所以这里是这样写 demo 的
var new_test = slice.call(test, 0, 1);
console.log(new_test);
// ["a"]
