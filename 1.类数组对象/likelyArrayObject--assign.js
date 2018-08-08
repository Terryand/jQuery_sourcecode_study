/* Wrong Demo */
var test = {
    0: 'a',
    1: 'b',
    length: 2
};
test[2] = 'c';
console.log(test);
// {0: "a", 1: "b", 2: "c", length: 2}



/* Right Demo */
var nullArray = [];
var push = nullArray.push;

var test = {
    0: 'a',
    1: 'b',
    length: 2
};
push.call(test, 'c');
console.log(test);
// {0: "a", 1: "b", 2: "c", length: 3}