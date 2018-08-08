/**
 * 当我们使用 Number 类型的变量时，经常需要使用 parseInt() parseFloat() 方法，但是这两个方法对于不能转成数字的变量，会返回 NaN。
 * 或者在一些其他情况中，我们需要严格确定，变量是否是 NaN 时，可以利用 JS 的一个特性巧妙判断。 
 * 
 */

 console.log(NaN === NaN);
 // false

 /**
  * 再次扩展一下：
  * 实际上，jQuery 启发我们，在 IE<9 环境下，一些 arraylike objects (如： NodeLists) 对象中 .length 属性不存在 ( undefined ) 。
  * 这时候，当我们需要 length 做遍历的时候。因此，严格来说，需要验证数字类型。jQuery 是通过如下技巧实现的。
  * 以 merge 函数为例
  */

function merge(first, second) {
    var len =+ second.length;
        // ...
    
    /**
     * step-1: 通过 =+ 计算操作代替 = 赋值操作
     * 这里实际上蕴含了一个 隐式类型转换 的概念
     * 递增递减操作符（前置、后置）、一元正负符号操作符在遇上不包含有效数字字符的字符串时，变量的值会变成 NaN
     */

    if ( len !== len ) {
        // ...
    }
    // ...

    /**
     * step-2: 只有 NaN !== NaN ,其余所有变量都 === 自身
     */

}
  
