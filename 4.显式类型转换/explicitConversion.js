/**
 * 显示类型转换就是通过自动装箱对象(也是方法)
 *   String
 *   Number
 *   Boolean
 * 
 * 这些方法最终还是调用
 *   ToPrimitive, ToBoolean, ToNumber, ToString
 * 这四个内部函数
 */