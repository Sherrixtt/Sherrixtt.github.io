---
title: TypeScript笔记
date: 2021-01-11 10:25:21
categories: 
- web前端
tags:
- 入门
- TypeScript
---
[TypeScript中文官网](https://www.tslang.cn/index.html)
## 入门 
1. 安装
`npm install typescript`
2. 编译
`tsc greeter.ts` => 输出 `greeter.js`文件
3. 类型注解
类型注解是一种轻量级为函数或变量添加约束的方式  
```javascript
function greeter(person: string){
    return 'Hello,' + person
}
```
4. 接口
使用接口描述一个对象。这两个类型的对象内部结构兼容，那么这两个类型就是兼容的。
```javascript
interface Person {
    name: string;
    age: number;
}
function greeter(person: Person) {
    return person.name + person.age
}
greeter({name: 'Sherri', age: 26})
```
5. 类
让我们创建一个Student类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。  
还要注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量。
```javascript
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```


## 指南
### 基础类型
#### 布尔值
`let isDone: boolean = false`
#### 数字
`let decLiteral: number = 6;`
#### 字符串
`let name: string = 'lisa' `
#### 数组
```javascript
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]
```
#### 元祖Tuple: 表示一个一直元素数量和类型的数组  
当访问一个已知索引的元素，会得到正确的类型:
```javascript
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```
当访问一个越界的元素，会使用联合类型替代：
```javascript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```
```javascript
/* 5. 元祖 */
let x: [number, string]; // 元祖
x = ['hello', 10] // error
x = [10, 'hello'] // ok
```

#### 枚举
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
业务中可能通常会有字段的几种状态用不同的值代表的情况。这种枚举值相当于定义了一个映射关系`{1: 'RED', 2: 'GREEN'}`  
可以根据名字找到对应的值，也可以根据值找到对应的名字。
```javascript
enum Color {Red, Green, Blue}

