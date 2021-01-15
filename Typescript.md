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
let c: Color = Color.Green; // c=2

// 比如
// let Color = {
//     'Red': 1,
//     'Green': 2,
//     'Blue': 3
// }
// let c = Color['Green']

enum Color {Red = 1, Green = 4, Blue = 7}
let colorName: string = Color[4];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

#### Any
当我们暂时不想让检查器检查变量的类型或者不确定变量的类型，可以用any来标记，即可以是任意类型。
```javascript
let list: any[] = [1, true, "free"];
```

#### Void
表示没有任何类型，某种程度上是有any相反的。  
声明为一个void类型的变量只能被赋值为`undefined`和`null`  

#### Null 和 Undefined
默认情况下`null`和`undefined`是所有类型的子类型
就是说你可以把 null和undefined赋值给number类型的变量。
```javascript
let u: undefined = undefined;
let n: null = null;
```
#### Never
never表示那些永不存在的值得类型。
例如， `never`总是会抛出异常或根本不会有返回值的 函数表达式 或 箭头函数表达式 的 返回值类型; 变量也可能是`never`类型：当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型。
然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给`never`。 
```javascript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
```
#### Object
非原始类型。除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。
```javascript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
```
#### 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。它没有运行时的影响，只是在编译阶段起作用。
类型断言有两种形式。 其一是“尖括号”语法：
```javascript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

```
另一个为as语法：
```javascript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 接口
对值的结构进行类型检查。
对象的值存在接口中定义的值并且值的类型一致，那么它就是被允许的。
```javascript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
#### 可选属性
带有可选属性的接口与普通接口定义差不多, 只是在可选属性名字定义后面加一个`?`符号
```javascript
interface SquareConfig {
  color?: string;
  width?: number;
}
```
#### 只读属性
一些对象属性只有在对象刚刚创建的时候，可以修改它的值。
在属性名前用`readonly`来指定只读属性。
```javascript
interface Point {
    readonly x: number;
    readonly y: number;
}
```
`ReadonlyArray<T>`类型定义不可变数组类型。
```javascript

let a: number[] = [1,2,3,4]
let ro: ReadonlyArray<number> = a

ro[0] = 12 // error
a = ro //error
a = ro as number[]
```
把整个ReadonlyArray赋值到一个普通数组也是不可以的, 但是可以用类型断言重写。
#### 额外的属性检查
```javascript
interface SquareConfig {
    color?: string
    width?: number
}
function createConfig(config: SquareConfig){}
let mySquery = createConfig({colour: 'red', width: 1000}) // error: 'colour' not expected in type 'SquareConfig'
```
 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
 使用类型断言可以绕开这些检查。
 ```javascript
 let mySquery = createConfig({width:100, opacity: 0.5} as SquareConfig)
 ```
#### 函数类型
```javascript
interface SearchFunc {
    (source: string, subString: string): boolean  // 左侧是入参的参数与类型  右侧是返回值得类型
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```
函数的参数名不需要与接口里定义的名字匹配。函数的参数要求与对应位置上的参数类型是兼容的。
#### 可索引的类型
描述可以通过索引得到的类型, 比如`b[0]`或`map['name']`。  
可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 
```javascript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ['Bob', 'Aoa']
let myStr: string = myArray[0]

```
这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
TypeScript支持两种索引签名**字符串**和**数字**。可以同时使用两种，但**数字索引**的返回值必须与是**字符串索引**返回值类型的**子类型**。
当用`number`来索引的时候, javascript会将`number`转成`string` 然后再去索引对象.
> `100(number)`索引  等同于 `'100'(string)`去索引,因此两者要保持一致。
```javascript
interface NumberDictionary {
    [index: string]: number;
    length: number;
    name:  string; // error => name 类型与索引类型返回值的类型不匹配
}
```
也可以将索引签名设置成只读
```javascript
interface ReadonlyArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyArray = ['nana', 'xixi']
myArray[1] = 'lulu' // error 索引签名是只读的
```


