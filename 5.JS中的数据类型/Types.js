/**
 * 深入理解 JS 中不可获取的一环。目前和 JQuery 关系不大，后期在更深入地阅读代码的过程中看看，再补充
 */

 /**
  * JS 中只用 7 种类型：
  * 原始类型( primitives types )
  *     boolean
  *     number
  *         包含 Infinity 和 NaN，可以通过 typeof Infinity 来验证
  *     string
  *     null
  *     undefined
  *     Symbol( ES6 新定义，这里不做扩展 )
  * Object 类型
  *     Object
  *     Array
  *     Date
  *     ...
  */

/**
 * 原始类型的传递是值传递，而 Object 类型则是引用传递。
 */

/**
 * JS 的自动装箱
 * JS 标准库给以下三个原型类型提供了包装对象。
 *     boolean ---- Boolean
 *     number ----- Number
 *     string ----- String
 * 在需要的时候，原始类型会自动转换成对应的包装对象（这个过程就叫自动装箱）。
 */
/**
 * 来通过一段很常用的代码来举一个例子
 */
var str = 'string';
console.log(str.length);
// 6
/**
 * 对于原始类型来说，自然没有 length 这样的属性，但是我们就是能够拿到 length 属性。这里实际上就是一个自动装箱的过程。
 */
var copy_str = str;
copy_str = 'new_string';
console.log(str, copy_str);
// 'string' 'new_string'
/**
 * 通过这段代码我们看到变量 str 依旧是一个原始类型( 因为很明显看到这里是一个值传递 )。说明自动装箱过程并不影响变量本身，变量本身不发生任何变化。
 */

 /**
 * 自动装箱实际上就是临时创建一个包装对象，将原始类型的值封装起来，以便调用包装对象的方法或者属性。
 * 当然对于以上三个包装对象来说，可以充当构造函数，直接 new 一个包装对象来使用。
 * 看下面的例子
 */
var StrObject = new String("str");
var str = 'str';
console.log(typeof StrObject, typeof str, StrObject == str, StrObject === str);
// 'object' 'string' true false

/**
 * 实际上这三个方法经常用实现 强制类型转换
 */


/**
 * 类型装换相关的两个重要函数
 * valueOf() 和 toString()
 *     valueOf() -- 返回这个对象逻辑上对应的原始类型的值。如 String 包装对象的 valueOf 返回对应字符串。
 *     toString() -- 返回这个对象的字符串表示。即用一个字符串描述这个对象的内容。
 * 
 * 这两个方法都是定义在 Object.prototype 上的方法，所有的对象类型都会继承到这两个方法。
 */

/**
 * valueOf 实例
 */
var array = [1];
console.log(array.valueOf());
// [1]   -- 返回对象本身（对象类型）
var boolObj = new Boolean(true);
console.log(boolObj.valueOf());
// true  -- 返回对应的 bool 值（原始类型）
var date = new Date('8/10/2018');
console.log(date.valueOf());
// 1533830400000  -- 返回从 UTC 1970 年 1 月 1 日午夜开始计算，到所封装的日期所经过的毫秒数（原始类型）
var func = function() { return true; }
console.log(func.valueOf());
// ƒ () { return true; } -- 返回函数本身（对象类型）
var numObj = new Number(10);
console.log(numObj.valueOf());
// 10  -- 返回对应的数值(可能是 NaN)（原始类型）
var obj = { key: 'key' };
console.log(obj.valueOf());
// {key: "key"}   -- 对象本身（对象类型）
var str = new String('abc');
console.log(str.valueOf());
// abc -- 返回 字符串值（原始类型）

/**
 * toString() 总是返回一个原始 string 类的值
 */


/**
 * JS 内部用于实现类型转换的 4 个函数
 * ToPrimitive, ToBoolean, ToNumber, ToString
 * 
 */
/**
 * ToPrimitive(input[, PreferredType])
 * 将 input 转化为原始类型的值。 PreferredType 的值只能是 Number 或 String。
 * 
 * 如果 PreferredType 的值是 Number, 则按如下规则执行：
 * 1、如果 input 是原始类型，则直接返回 input.
 * 2、调用 input.valueOf()，如果结果是原始类型，则返回该结果
 * 3、调用 input.toString()，如果结果是原始类型，则返回该结果
 * 4、抛出 TypeError 异常
 * 
 * 如果 PreferredType 的值是 String, 则按如下规则执行:
 * (其实和上面的区别是交换了 2/3 步的顺序)
 * 1、如果 input 是原始类型，则直接返回 input.
 * 2、调用 input.toString()，如果结果是原始类型，则返回该结果
 * 3、调用 input.valueOf()，如果结果是原始类型，则返回该结果
 * 4、抛出 TypeError 异常
 * 
 * 如果 PreferredType 的值未传入
 *     如果 input 是 Date 类型，则视为把 PreferredType 的值视为 String 操作
 *     否则 PreferredType 视为 Number 操作。
 */

/**
 * ToBoolean(argument)
 * 实际上 if 后面表达式的值就是会按照这个函数操作。具体规则如下：
 *     (Argument Type)            (Result)
 *     Undefined                  false
 *     Null                       false
 *     Boolean                    参数本身对应的 bool 值
 *     Number                     仅当 argument 为 +0, -0, NaN 是返回 false, 其余返回 true
 *     String                     仅当 argument 为空字符串(长度为0)是，返回 false, 其余返回 true
 *     Symbol                     true
 *     Object                     true
 */

/**
 * ToNumber(argument)
 * ToNumber的转化并不总是成功，有时会转化成NaN，有时则直接抛出异常
 * 规则如下：
 *     (Argument Type)            (Result)
 *     Undefined                  NaN
 *     Null                       +0
 *     Boolean                    true -- 1; false -- +0
 *     Number                     对应的 number 原始类型
 *     String                     将字符串中的内容转化为数字（比如"23"->23），如果转化失败则返回NaN（比如"23a"->NaN）
 *     Symbol                     抛出 TypeError 异常
 *     Object                     先primValue = ToPrimitive(argument, Number)，再对primValue 使用 ToNumber(primValue)
 */

/**
 * ToString(argument)
 * 
 * 规则如下：
 *     (Argument Type)            (Result)
 *     Undefined                  "undefined"
 *     Null                       "null"
 *     Boolean                    true -- "true"; false -- "false"
 *     Number                     用字符串显示数字
 *     String                     直接返回对应 string 原始类型
 *     Symbol                     抛出 TypeError 异常
 *     Object                     先primValue = ToPrimitive(argument, Number)，再对primValue 使用 ToString(primValue)
*/