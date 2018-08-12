/**
 * 什么是隐式类型转换？
 * 当 JS 期望得到某种类型的值，而实际上这里的值是其他类型的，就会发生隐式类型转换。隐式类型转换涉及到以下几种方法：
 * ToBoolean, ToNumber, ToNumber, ToString
 * 这四种方法实际上是 ECMAscript 定义的4个抽象操作。是 js 引擎内部使用的函数。
 * 具体结果可以参考第五部分 JS 的数据类型
 * 
 * 下一部分介绍显式的数据类型转化方法
 */

/**
 * 期望得到 Number 的相关操作
 *   isNaN
 *   递增递减操作符 ( 前置/后置 ++ -- ) 和 一元正负符号操作符 ( 前置/后置 +=, =+ )
 *   计算符，如 *(乘号) /(除号) 
 */

 /**
  * 期望得到 Boolean 的相关操作
  *   if
  */

/**
 * isNaN() 
 * 该方法的返回结果实际上是，将参数值用 Number() 进行转换，然后判断是否是数值
 * 所以，下例中 string 类型的 '0' ，isNaN 会返回 false (即，认为是数字)
 */
var test = '0';
console.log(isNaN(test), typeof test);
// false "string"

/**
 * 递增递减操作符 ( 前置/后置 ++ -- ) 和 一元正负符号操作符 ( 前置/后置 +=, =+ )
 *   实际上也是 Number() 方法后，再操作。按照如下规则
 *   1、string 可以转成数字的，转成数字后递增/递减
 *   2、string 不能转成数字的，变量本身变成 NaN ( PS: typeof NaN 的结果是 "number" )
 *   3、布尔值 false => 0, true => 1 再计算
 *   4、对象，执行 valueOf() 方法( 该方法会得到一个 string, 当然可以自定义对象的 valueOf )，然后按 string 的规则计算
 */
var test = '0';
test ++;
console.log(test, typeof test);
// 1 "number"

var test = '10';
test --;
console.log(test, typeof test);
// 9 "number"

var test = '10a';
test ++;
console.log(test, typeof test);
// NaN "number"

var test = {0: '0'};
test ++;
console.log(test, typeof test);
// NaN "number"

var test = {
    value: '0',
    valueOf: function() {
        return this.value;
    }
}
test ++;
console.log(test, typeof test);
// 1 "number"

var test = {
    value: 'a',
    valueOf: function() {
        return this.value;
    }
}
test ++;
console.log(test, typeof test);
// NaN "number"


/**
 * if
 * if 会将后面 () 中的值/表达式的运算结果转换为 BOOL
 */