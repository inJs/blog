### JavaScript中的继承

> 最近在回顾一些基础的时候， 觉得自己对继承有了一些新的认识。 
> 众所周知， ES6中提供了语法糖`extends`， 当时这并改变不了 JavaScript 是基于原型实现继承的事实。
> 而接下来， 我们将逐步的分析每一种继承方式优缺点，以及在当代浏览器中， 我们如何编写更优美的继承的代码， 当然是在排除`extends`的情况下。
> 同时， 也希望这篇文章对大家有帮助。

------

  + 准备知识——原型和原型链 
    > 在ES中， 所有的对象都会包含一个指向`原型(prototype)`对象的内部链条， 这个对象与普通的对象并无不同。 这就是`原型(prototype)`
    > 既然`原型(prototype)` 只是一个普通对象， 理所当然， 它也会拥有自己的`原型(prototype)`, 由此， 就会产生一个内部链条的连续， 
    > 而这， 就是 `原型链(prototype chain)` 。 那何处是`原型链(prototype chain)`的终点呢？——`Object.prototype.__proto__` (在不手动改变的情况下)。
    > 以上便是`原型(prototype)`和`原型链(prototype chain)`的基本概念， 如果仍然不懂， 可以参考[继承与原型链(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
    
  + 简单原型链继承
    简单原型链继承，可以说是最简单的一种继承方式， 先亮代码：
    ```
        var Man = function() {
            this.name = 'donkey';
            this.age = 3;
        }
        
        var Human = function(){
            this.weight = 55;
            this.vehicle = ['car', 'bicycle'];
        };
        
        Lee.prototype = new Human;
        
        var lee = new Man;
        var zhang = new Man;
        
        console.log(lee.name); // 'donkey'
        console.log(lee.age); // 3
        console.log(lee.weight); // 55
        console.log(lee.vehicle); // ['car', 'bicycle']
        console.log(zhang.name); // 'donkey'
        console.log(zhang.age); // 3
        console.log(zhang.weight); // 55
        console.log(zhang.vehicle); // ['car', 'bicycle']
        lee.vehicle.push('donkey'); // 通过实例 lee 操作的引用， 将直接影响到 zhang
        console.log(lee.vehicle); // ['car', 'bicycle', 'donkey']
        console.log(zhang.vehicle); // ['car', 'bicycle', 'donkey']
    ```
    看到了上面的测试代码， 或许你已经意识到了简单原型链继承所存在的问题： lee 为自己买了一头donkey当作坐骑， 而zhang也莫名其妙来了一头donkey