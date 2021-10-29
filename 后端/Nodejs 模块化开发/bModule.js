// 使用其他模块需要使用 require('引入模块的地址'); 经过require导入的数据实质是一个对象数据, 这个对象数据包含了导入模块暴露的所有属性和方法。
const a_module = require('./aModule.js')

console.log(typeof a_module, a_module);
console.log(a_module.add(2, 4));
console.log(a_module.minus(1, 3));
console.log(a_module.version);

// a_module.say();
// console.log(a_module(2,4));