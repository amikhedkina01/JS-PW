
//promices 1
// async function loadUsers() {
//     return new Promise((resolve, reject) => {
//         const response = fetch('https://jsonplaceholder.typicode.com/users');
//         const data = response.json();
//         data.forEach(element => {
//             console.log(element.name);
//         });
//     })
//     loadUsers();


// async function loadUsers() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await response.json();
//         const sortedNames = data
//             .map(user => user.name)            // беремо тільки імена
//             .sort((a, b) => a.localeCompare(b)) // сортуємо за алфавітом
//             .slice(0, 5);                       // беремо перші 5

//         sortedNames.forEach(name => {
//             console.log(name);
//         });
//     } catch (error) {
//         console.log('Помилка при завантаженні користувачів:', error.message);
//     }
// }
// loadUsers();


// number 1
// const numbers1 = [3, 7, 2, 9];
// let sum = 0;
// for (let i = 0; i < numbers1.length; i++) {
//     sum += numbers1[i];
// }
// console.log(sum);

//number 2

// const numbers2 = [1, 2, 3, 4, 5, 6];
// const even = [];

// for (let i = 0; i < numbers2.length; i++) {
//     if (numbers2[i] % 2 === 0) {
//         even.push(numbers2[i]);
//     }
// }

// console.log(even); // [2, 4, 6]
//number3
// const words = ['cat', 'elephant', 'dog'];
// let array = [];
// for (let i = 0; i < words.length; i++) {
//     const element = words[i];
//     array.push(element.length)
// }
// console.log(array);

//number 4
// num = [1, 2, 3]
// string = num.toString();
// console.log(string)

//number 5

// const cosmicObj = ['sun', 'moon', 'star', 'bo'];

// let shortest = cosmicObj[0];

// for (let i = 1; i < cosmicObj.length; i++) {
//     if (cosmicObj[i].length < shortest.length) {
//         shortest = cosmicObj[i];
//     }
// }

// console.log(shortest); // "sun"

//number 6

// const names = ['Anna', 'John', 'Anna', 'Mike', 'John', 'Anna'];
// const counts = {};

// for (let i = 0; i < names.length; i++) {
//     const name = names[i];
//     if (counts[name]) {
//         counts[name] += 1;
//         console.log(name)

//     } else {
//         counts[name] = 1;
//     }
// }

// console.log(counts);


// Class exercise


// class Cat {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     sayMeow() {
//         console.log(`${this.name} says Meow!`)
//     }

//     sayIntro() {
//         console.log(`My name is ${this.name} and I'm ${this.age} years old`);
//     }
// }

// class Tiger extends Cat {
//     roar() {
//         console.log(`I'm a tiger named ${this.name} ROAR!`)
//     }
//     sayMeow() {
//         console.log(`Tigers don't meow!`)
//     }
// }

// const myCat = new Cat("Milva", 8);

// myCat.sayMeow();
// myCat.sayIntro();

// const t = new Tiger("Shere Khan", 12);

// t.sayIntro();
// t.sayMeow();
// t.roar();



// class Dog {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     bark() {
//         console.log(`Woof! I'm ${this.name}`)
//     }
// }

// class GuardDog extends Dog {
//     constructor(name, age, isTrained) {
//         super(name, age);
//         this.isTrained = isTrained;
//     }


//     bark() {
//         if (this.isTrained === true) {
//             console.log(`I'm ${this.name}, trained to guard!`)

//         } else {
//             console.log(`I'm ${this.name}, but I'm not trained yet...`)
//         }
//     }
// }


// const dog1 = new GuardDog("Rex", 4, true);
// dog1.bark();  // "I'm Rex, trained to guard!"

// const dog2 = new GuardDog("Fido", 2, false);
// dog2.bark();  // "I'm Fido, but I'm not trained yet..."


//promices 2


// function catBuysMilk(hasMoney) {
//     return new Promise((resolve, reject) => {
//         console.log(`🐱 Кіт пішов купувати молоко...`);
//         setTimeout(() => {
//             if (hasMoney) {
//                 console.log("🐱 Кіт купив молоко 🥛");
//                 resolve("milk");
//             } else {
//                 reject("🐱 Кіт не має грошей 💸");
//             }
//         }, 1000);
//     })

// }

// function dogMakesBreakfast(milk) {
//     return new Promise((resolve, reject) => {
//         console.log('🐶 Пес готує сніданок...')

//         setTimeout(() => {
//             if (milk === "milk") {
//                 console.log("🐶 Пес зробив сніданок 🍳");
//                 resolve("breakfast");
//             } else {
//                 reject("🐶 Без молока сніданку не буде 😿");

//             }
//         }, 1000);
//     })
// }


// function watchCartoon(breakfast) {
//     return new Promise((resolve) => {
//         console.log("📺 Вмикаємо мультик...");
//         setTimeout(() => {
//             console.log("🎉 Всі дивляться мультик і щасливі!");
//             resolve();
//         }, 1000);
//     });
// }

// catBuysMilk(false)
//     .then(dogMakesBreakfast)
//     .then(watchCartoon)
//     .catch((err) => console.log("❌ Сталася помилка:", err));

// promises 3

// function orderBox() {
//     return new Promise((resolve, reject) => {
//         console.log('Cat orders the Box online')

//         setTimeout(() => {
//             const ordered = true;
//             if (ordered) {
//                 console.log("Ordered");
//                 resolve("box");
//             } else {
//                 reject("will not be tracked");

//             }
//         }, 1000);
//     })
// }

// function trackDelivery(box) {
//     return new Promise((resolve, reject) => {
//         console.log('Dog started to track the box')

//         setTimeout(() => {
//             if (box == 'box') {
//                 console.log('delivery waiting')
//                 resolve('delivery');
//             } else {
//                 reject("something happened with tracking")
//             }
//         }, 1000);
//     })

// }

// function catJumpsIn(delivery) {
//     return new Promise((resolve, reject) => {
//         console.log(`Box recieved`)

//         setTimeout(() => {
//             if (delivery === 'delivery') {
//                 console.log(`Cat jumps in the box`)
//                 resolve();
//             } else {
//                 reject('no delivery - no jump')
//             }
//         }, 1000);
//     })
// }

// async function startDay() {
//     try {
//         const box = await orderBox()
//         const delivery = await trackDelivery(box)
//         await catJumpsIn(delivery)
//         console.log('the task was done!!!!');
//     } catch (error) {
//         console.log("wtf")
//     }
// }

// startDay();

// factory design pattern

// class Dog {
//     constructor(name, type) {
//         this.name = name;
//         this.type = type;
//     }

//     bark() {
//         console.log(`${this.name} is a ${this.type} dog. Woof!`);
//     }
// }

// function createDog(name, type) {
//     if (type === 'rescue') {
//         return new Dog(name, type)
//     } else if (type === 'therapy') {
//         return new Dog(name, type)
//     } else if (type === 'guide') {
//         return new Dog(name, type)
//     } else {
//         console.log("type is not defined")
//     }
// }

// // alternative
// // function createDog(name, type) {
// //     const allowedTypes = ['rescue', 'therapy', 'guide'];

// //     if (allowedTypes.includes(type)) {
// //         return new Dog(name, type);
// //     } else {
// //         console.log("Type is not defined");
// //     }
// // }


// const rex = createDog("Rex", 'rescue');
// const coco = createDog("Coco", 'guide');

// rex.bark();
// coco.bark();  

// Builder design pattern

// class Cat {
//     constructor(name, age, color, isSterilized, owner, diseases) {
//         this.name = name;
//         this.age = age;
//         this.color = color;
//         this.isSterilized = isSterilized;
//         this.owner = owner;
//         this.diseases = diseases;
//     }
//     info() {
//         let msg = `My name is ${this.name}, I am ${this.age} years old, and my fur is ${this.color}. `;

//         if (this.isSterilized) {
//             msg += `I am sterilized. `;
//         } else {
//             msg += `I am not sterilized. `;
//         }

//         if (!this.owner || this.owner === 'no one') {
//             msg += `I have no owner. `;
//         } else {
//             msg += `My owner is ${this.owner}. `;
//         }

//         if (this.diseases && this.diseases !== 'Not' && this.diseases.length > 0) {
//             msg += `I am sick with: ${this.diseases}.`;
//         } else {
//             msg += `I am healthy.`;
//         }

//         console.log(msg);
//     }
// }

// class CatBuilder {
//     constructor() {
//         this.name = 'Unnamed';
//         this.age = 0;
//         this.color = 'Unknown';
//         this.isSterilized = false;
//         this.owner = 'no one';
//         this.diseases = 'Not';
//     }

//     setName(name) {
//         this.name = name;
//         return this;
//     }

//     setAge(age) {
//         this.age = age;
//         return this;
//     }

//     setColor(color) {
//         this.color = color;
//         return this
//     }

//     setIsSterilized(isSterilized) {
//         this.isSterilized = isSterilized;
//         return this;
//     }

//     setOwner(owner) {
//         this.owner = owner;
//         return this;
//     }

//     setDiseases(diseases) {
//         this.diseases = diseases;
//         return this;

//     }

//     build() {
//         return new Cat(
//             this.name,
//             this.age,
//             this.color,
//             this.isSterilized,
//             this.owner,
//             this.diseases
//         );
//     }

// }

// const testCat = new CatBuilder()
//     .setName("Milva")
//     .setAge(8)
//     .setColor("black and white")
//     .setIsSterilized(true)
//     .setOwner("Anna")
//     .build();

// testCat.info()


// const Tom = new CatBuilder()
//     .setName("Tom")
//     .setColor("grey")
//     .setIsSterilized(true)
//     .setOwner("Toma")
//     .build();

// const Luna = new CatBuilder()
//     .setName("Luna")
//     .setAge(3)
//     .setColor("White")
//     .build();

// const Shadow = new CatBuilder()
//     .setName("Shadow")
//     .setAge(9)
//     .setColor("black")
//     .setIsSterilized(true)
//     .setOwner("Derek")
//     .setDiseases('flu')
//     .build();


// Tom.info();     // Tom is sterilized.
// Luna.info();    // Luna has no owner.
// Shadow.info();  // Shadow is sick with: flu.

import { test, expect } from '@playwright/test';  // This should now work

import { BasePage } from './BasePage';
console.log(BasePage);