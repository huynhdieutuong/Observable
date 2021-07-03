function* calSum() {
  const a = yield 30;
  const b = yield 60;

  return a + b;
}

const genObj = calSum();

const data1 = genObj.next(); // { value: 30, done: false }
const data2 = genObj.next(20); // a = 20 - { value: 60, done: false }
const data3 = genObj.next(50); // b = 50 - { value: 70, done: true }

console.log(data1);
console.log(data2);
console.log(data3);

console.log(genObj);
