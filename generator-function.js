function* calSum() {
  const a = yield;
  const b = yield;

  return a + b;
}

const genObj = calSum();

const data1 = genObj.next(); // { value: undefined, done: false } - yield stop before declare a
const data2 = genObj.next(20); // { value: undefined, done: false } - a = 20 then yield stop
const data3 = genObj.next(50); // { value: 70, done: true } b = 50 then return a + b

console.log(data1);
console.log(data2);
console.log(data3);

console.log(genObj);
