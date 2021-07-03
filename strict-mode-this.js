function sayHello1() {
  'use strict';
  console.log(`Hello1`, this);
}

function sayHello2(num) {
  console.log(`Hello${num}`, this);
}

sayHello1(); // undefined because 'use strict'
this.sayHello1();
globalThis.sayHello1();
window.sayHello1();

sayHello2(2); // window because 'default binding'
this.sayHello2(3);
globalThis.sayHello2(4);
window.sayHello2(5);
