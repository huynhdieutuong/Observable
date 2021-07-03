// Case 1
// function outerFunc() {
//   let num1 = 20;
//   let course = 'Javascript Advance';

//   function innerFunc() {
//     let num2 = 50;
//     let total = num1 + num2;
//     return total;
//   }

//   return innerFunc;
// }

// const func = outerFunc();
// const result = func();

// Case 2
// function sum(num1) {
//   return (num2) => {
//     return num1 + num2;
//   };
// }
// const result = sum(20)(30);

// Case 3
function cached() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}
const result = cached();
const value1 = result();
const value2 = result();
