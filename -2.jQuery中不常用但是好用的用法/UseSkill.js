/**
 * 1、$() 返回的到底是什么 ？
 *    下面我们来分析一下源码
 */

/** 
 * jQuery 做为全局变量，定义为了一个函数（这里其实就是类的 JS 实现），返回一个 new 出来的 jQuery.fn.init 实例。
 */
/*
jQuery = function( selector, context ) {
    return new jQuery.fn.init( selector, context );
}
*/
/**
 * jQuery 在封装时替我们考虑了命名冲突的问题，因此封装了一个函数，确保 $ 字符会被定义为上面定义的 jQuery 函数。
 */
/*
jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};
*/
/**
 * 这是源码里将 $ 声明成 jQuery 函数的代码
 */
/*
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}
*/

/**
 * 到这里我们就知道了，$() 等价于 jQuery()，代表 jQuery 执行的结果，返回一个 jQuery 的实例。
 */

/**
 * 2、关于 $.fn
 *    源码中是这样的: jQuery.fn = jQuery.prototype = { ... }
 * 即 fn 就是 jquery 的 prototype。所以我们看到一些基于 jquery 的插件代码中，经常有这么一段
 *     $.fn.extend({
 *        xxx: ....
 *     });
 * $.fn.extend 方法我们后面再说，这个方法的作用是将参数对象中的属性挂载到 $.fn 下。这样所有的 jQuery 实例都会有这个属性了。
 *   源码中所有定义在 $.fn 下的属性，调用需要通过实例调用，即 $().xxx
 */

/**
 * 3、关于 jquery 的扩展
 *    上面正好聊到了 $.fn.extend。我们就来聊一下如何给 jQuery 扩展，也就是所谓的 jQuery 插件。
 *  有两种方法：
 *      $.extend({ ... })   扩展 jQuery 类本身，相当于添加了静态方法
 *      $.fn.extend({ ... })  扩展 jQuery 实例。由于 jQuery 做好了封装，会将属性扩展到 prototype 中，所以即使这样添加，也可以添加到每个实例上。
 * 
 *   但是两个方法，扩展的属性实际上挂载的位置不同。
 *   来举一个例子
 */
$.extend({ test: 'test' });
console.log($.test, $('body').test);
// test undefined

/**
 * 4、$().toArray() 方法
 *    这个方法会将选择器获取到的 jquery 对象转成由选中 dom 对象组成的数组。
 */

/**
 * 5、$().selector 属性
 *   这个属性就是选择器的字符串表达式
 */
console.log($('body').selector, $(document).selecto );
// body undefined

/**
 * 6、$().get(num) 方法
 *    jQuery 做了一个很灵活的封装
 *      num 不存在时，返回选择器选中的 dom 对象数组
 *      num < 0    逆序选择，即倒数第 num 个
 *      num >= 0    正序选择，即第 num 个
 */

/**
 * 7、$().pushStack( elems ) 方法
 *    返回一个匹配 dom 数组的、新的 jquery 对象( 原对象不改变 )，注意这个新的 jQuery 对象不含 selector (选择器属性)。
 *    实际上，这可以用来获取无法用选择器描述的 jquery 对象。
 *    更现实的意义在于需要返回新 jquery 对象的方法，如：
 *      $().eq( num ) 
 *      $().slice( start, end ) 等方法就是基于该方法实现的
 */
var $body = $('body');
var $head = $body.pushStack( $('head').get().concat($('meta').get()));
console.log($body);
// jQuery.fn.init [body, prevObject: jQuery.fn.init(1), context: document, selector: "body"]
console.log($head);
// jQuery.fn.init(4) [head, meta, meta, meta, prevObject: jQuery.fn.init(1), context: document]

/**
 * 8、$().map( callback ) 方法
 *    这个方法可以用来遍历获取到的 dom 对象。
 *    参数和 js 中的 arrayObjec.map 方法不太一样，实际上 jQuery 的风格是 index, item 而原生 JS 的风格是 item, index
 */
$('meta').map(function(index, item) {
    console.log(item.toString(), index);
});
// 3个 0 [object HTMLMetaElement]

/**
 * 9、$().slice( start, end ) 方法
 *    这个方法的参数和原生的 arrayObject.slice() 方法一致。实际上源码就是这么实现的：
 *    return this.pushStack( slice.apply( this, arguments ) )
 */
console.log($('meta').slice(0, 2));
// jQuery.fn.init(2) [meta, meta, prevObject: jQuery.fn.init(3), context: document]

/**
 * 10、$().eq( num ) 方法
 *     num >= 0    正序选择，即第 num 个 dom 对应的 jquery 对象
 *     num < 0     倒序选择，即倒数第 num 个 dom 对应的 jquery 对象
 * 
 * ps: $().first() 等价于 $().eq( 0 )
 *     $().last() 等价于 $().eq( -1 )
 */