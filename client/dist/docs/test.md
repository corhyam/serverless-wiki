# 知识点考察

### 1. redux-thunk 和 redux-saga的区别

redux-thunk 处理 side effect 的方式是：dispatch一个对象时不做处理；dispatch一个函数，在函数中处理异步动作，然后再dispatch一个对象

redux-saga 处理 side effect的方式是：自行建立了一套事件监听机制，接管所有的action。effects 方法有take, put, call, select, fork, takeEvery, takeLatest

### 2. 高阶函数和闭包

高阶函数的概念：一个函数的参数能够接受另一个函数作为参数，称之为高阶函数

闭包的概念：是通过函数返回函数的的方式，改变JS的回收机制

### 3. redux-sage中涉及了generator

生成器函数处理循环流程中控制各个步骤的呈现方式非常厉害，如：实现点击按钮，把逐个往同一类元素上添加className

```jsx
const strings = document.querySelectorAll('.string');
const btn = document.querySelector('#btn');
const className = 'darker';

function * addClassToEach(elements, className) {
  for (const el of Array.from(elements))
    yield el.classList.add(className);
}

const addClassToStrings = addClassToEach(strings, className);

btn.addEventListener('click', (el) => {
  if (!addClassToStrings.next().done)
    el.target.classList.add(className);
});
```

      不用递归实现菲波那切数列，用生成器函数实现

```jsx
function* fabonacci(seed1, seed2) {
	while(true){
		yield(() => {
			seed2 = seed1 + seed2;
			seed1 = seed2 - seed1;
			return seed2;
		})
	}
}
```

### 4. Promise

为什么使用Promise？

promise的功能是可以将复杂的异步处理轻松地进行模式化

Promise的并发控制

[https://www.yuque.com/felance/sfhx1u/gz8ogd](https://www.yuque.com/felance/sfhx1u/gz8ogd)

```jsx
class LimitPromise {
	constructor(max){
		// 最多执行的任务个数
    this.max = max;
    // 当前正在执行的任务个数
    this.count = 0;
    // 任务队列
    this.queue = [];
	}
	call(caller, ...args) {
		return new Promise((resolve, reject) => {
			const task = this.createTask(caller, args, resolve, reject);
			if (this.count >= this.max) {
        this.queue.push(task);
      } else {
        task()
      }
		})
	}

	createTask(caller, args, resolve, reject) => {
		return () => {
			this.count++
			caller(...args)
						.then(resolve)
						.catch(reject)
						.finally(() => {
							this.count--;
							if (this.queue.length) {
								const task = this.queue.shift();
		            task();
							}
						})
		}
	}
}
```

### 5. 节流函数

```jsx
function throttle(func, duration，delay = 100) {
    let timer = null, begin = new Date();
    return function() {
        current = new Date();
        clearTimeout(timer);
        if (current - begin > duration) {
            func();
            begin=current;
        } else {
            timer = setTimeout(func, delay);
        }
    }
}

const handler = function() {
    console.log('123');
}

window.onresize = throttle(handler, 100)
```

### 6. 面试知识点

[https://www.cnblogs.com/chenwenhao/p/11267238.html](https://www.cnblogs.com/chenwenhao/p/11267238.html)

### 7. 原型链

1. 什么是构造函数？

    ```jsx
    // A是一个构造函数
    function A() {
    	this.name = 'A';
    	console.log('123123');
    }
    ```

2. 原型对象  **原型对象的意义是 原型对象是子函数可以访问到的区域，可以实现继承。**

    ```jsx
    // A.prototype是原型对象
    // 原型对象有属性
    		constructor：指向构造函数, 
    		__proto__：指向父节点的prototype
    ```

3. 实例对象

    ```jsx
    // a是实例对象
    // 实例对象的__proto__属性 === 构造函数的prototype，即 a.__proto__ === A.prototype
    const a = new A();
    ```

4. 原型链就是__proto__指向，层层指向，知道为null到头

### 8. js继承

```jsx
function Parent() {

}
// 原型链继承
function SubType() {

}
SubType.prototype = new Parent();

// 借用构造函数继承
function SubType() {
	Parent.call(this)
}

// 原型链结合构造函数继承
function SubType() {
	Parent.call(this);
}
SubType.prototype = new Parent();
```

### 9. Express和Koa的中间件模型有什么区别

Express中间件模型是线性模型，中间件的执行过程没有对async，await做处理

Koa2中间件模型是洋葱模型，中间件的执行返回了Promise对象

### 10.http属性中控制缓存的哪些？

浏览器请求数据时经历的流程：1.强制缓存，2.协商缓存，3请求

1.强制缓存响应的header中有Expires/Cache-control 

**Cache-Control 优先级大于 Expires**

Expires的值为服务端返回的到期时间，即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据。

Cache-Control 是最重要的规则。常见的取值有private、public、no-cache、max-age，no-store，默认为private。

private: 客户端可以缓存

public: 客户端和代理服务器都可缓存（前端的同学，可以认为public和private是一样的）

max-age=xxx: 缓存的内容将在 xxx 秒后失效

no-cache: 需要使用协商缓存来验证缓存数据（后面介绍）

no-store: 所有内容都不会缓存，强制缓存，协商缓存都不会触发（对于前端开发来说，缓存越多越好，so...基本上和它说886）

2.协商缓存

此时的状态码为304。

方案有2种：

1.Last-Modified/If-Modified-Since

第一次请求响应的header中有Last-Modified字段，值为时间。再次请求时request的header中有If-Modified-Since

2.Etag/If-None-Match

响应header中有Etag字段，值为唯一标识码，请求header的If-None-Match携带改字段

**Etag/If-None-Match 优先级大于 Last-Modified/If-Modified-Since**

### **11.变量，函数提升**

变量提升是使用var定义的变量，会把var的**声明**提升到作用域最前面

函数的提升是吧function提升到作用域最前面

### **12. new之后发生了什么事情，如何不用new创建实例对象**

```jsx
function _new(Func, ...args) {
	let obj = Object.create(Func.prototype);
	const result = Func.call(obj, ...args);
	typeof result === 'object' ? result : obj;
}
```

### 13.ES6和ES5有什么区别

1. 块级作用域(let和const)
2. 箭头函数
    1. 箭头函数使用bind，call，apply传入的this是没有效果的
3. 解构(数组解构，对象解构)
4. class extends super
5. 生成器
6. Promise
7. Map和Object有什么不同：
    1. 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
    2. Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
    3. Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算

### 14. 排序算法

1. **选择排序**

    选择排序是一个简单直观的排序方法，它的工作原理很简单，首先从未排序序列中找到最大的元素，放到已排序序列的末尾，重复上述步骤，直到所有元素排序完毕。

    时间复杂度O(n^2), 空间复杂度O(1);

    ```jsx
    function selectSort(arr) {
    	var index;
    	for(var i = 0; i < arr.length; i++) {
    		index = i;
    		for(var j = i+1; j < arr.length; j++) {
    			if (arr[index] < arr[j]) {
    				index = j;
    			}
    		}
    		if (index != i) {
    			var temp = arr[index];
    			arr[index] = arr[i];
    			arr[i] = temp;
    		}
    	}
    	return arr;
    }
    ```

2. **快速排序**

快速排序的算法思想是选择一个值，把小于这个值的放在左边，大于这个值得放在右边

```jsx
function quickSort(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	var leftArr = [];
	var rightArr = [];
	for(var i = 1; i< arr.length; i++) {
		if (arr[i] <= arr[0]) {
			leftArr.push(arr[i])
		} else {
			rightArr.push(arr[i]);
		}
    }
	return quickSort(leftArr).concat([arr[0]], quickSort(rightArr))
}
```

**3. 冒泡排序**

```jsx
function bubbleSort(arr) {
	for(var i = 0; i < arr.length - 1; i++) {
		for(var j = 0; j < arr.length - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j] = temp;
			}
		}
	}
	return arr;
}
```

### 15. js的垃圾回收机制，有怎样的问题

    JavaScript中有两种垃圾回收策略，标记清除和引用计数

1、标记清除法：

      [javascript](http://lib.csdn.net/base/javascript)最常用的垃圾收集方式。当变量进入环境时，这个变量标记为“进入环境”；而当变量离开环境时，则将其标记为“离开环境”。可以使用一个“进入环境”的变量列表及一个“离开环境”的变量列表来跟踪变量的变化，也可以翻转某个特殊的位来记录一个变量何时进入环境及离开环境。

2. 引用计数

      不太常见的垃圾收集策略。引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则该值的引用次数就是1；如果同一个值又被赋给另一个变量，则该值的引用次数加1；如果包含对该值引用的变量又取得了另外一个值，则该值的引用次数减1。当该值的引用次数变为0时，则可以回收其占用的内存空间。当垃圾回收器下一次运行时，就会释放那些引用次数为0的值所占用的内存。

问题：循环引用

循环引用可以使用第三方的JSON.recycle来解决，核心原理是使用WeakMap来解决

### 16. 手写Promise的的关键特点

Promise 中的then方法中返回的是一个新的Promise，在Promise中使用的的setTimeout来实现异步

### 17. 高阶组件的属性代理，反向继承

属性代理：参数为组件，返回值为新组件的函数

反向继承：反向继承最核心的两个作用，一个是渲染劫持，另一个是操作state吧。反向继承有两种写法，两种写法存在不同的能力

反向继承是通过传进去参数是组件，然后继承该组件后重写，如：

```jsx
imoprt ComponentChild from './ComponentChild.js'
let iihoc = WrapComponet => class extends WrapComponet {
    constructor(props) {
	    super(props)
	    this.state = {
            num: 2000
	    }
    }
    componentDidMount() {
        console.log('iihoc componentDidMount')
        this.clickComponent()
    }
    return (
        <div>
            <div onClick={this.clickComponent}>iiHoc 点击</div>
            <div>{super.render()}</div>
        </div>
    )
}
export default iihoc(ComponentChild)
```

### 18. 实现add(1)(2)(3)()

### 19. JavaScript深入之作用域链