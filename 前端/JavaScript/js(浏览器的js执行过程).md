### 浏览器组成部分
1. 渲染引擎: 用来解析HTML和CSS, 俗称 内核;比如 谷歌浏览器内核: bilink。
2. JS引擎: JS 解释器。 用来读取网页中的JavaScript的代码,对其解释成机器语言; 比如 谷歌浏览器的V8引擎。

#### 浏览器本身不会执行JS代码, 而是通过内置的JavaScript解释器来执行JS代码。 JS解释器执行代码时逐行解释每一句源码(将源码转为0101这种机器语言), 然后由计算机去执行。所以JavaScript是解释性脚本语言，会逐行解释执行（JS不需要编译）。


### JavaScript的组成部分:
1. ECMAScript: JavaScript的核心，定义了JS的基本语法;
2. DOM: Document Object Model（文档对象模型）
    通过DOM提供的接口可以对页面上的元素进行操作(大小、位置、颜色等)
3. BOM: Browser Object Model(浏览器对象模型)
    通过BOM可以操作浏览器窗口(弹出框、控制浏览器跳转等)