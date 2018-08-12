/**
 * 1、object to array
 * 注意，实际上这里只能用在类数组对象中，严重依赖 length 属性。如果不存在 length 则返回 []。
 * 返回的数组长度就是 length 的长度，数组每项的值就是对应索引 key 的值
 * 
 * 实现原理是通过 call 方法在指定环境下运行 slice 方法。
 * 
 * slice(start, end) 方法返回一个新数组，无参数时，默认从头到尾。
 */

/* example 1 */
var targetObject = {
    1: 'a',
    0: 'b',
    3: 'c',
    length: 2
};
var slice = [].slice;
var resultArray = slice.call(targetObject);
console.log(resultArray);
//  ["b", "a"]

/* example 2 */
var targetObject = {
    1: 'a',
    2: 'b',
    length: 2
};
var slice = [].slice;
var resultArray = slice.call(targetObject);
console.log(resultArray);
// [empty, "a"] 这里的 empty 代表不存在
console.log(resultArray[0]);
// undefined


/**
 * 2、组件设计中，可以思考两个重要方法的封装 get 和 set
 * 这两个方法会经常使用
 */