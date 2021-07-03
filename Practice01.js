console.log('1. age =', age); // undefined
var age = 20;
console.log('2. age =', age); // 20

let firstName = 'Luc';
let lastName = 'Tran Cong';
const yearOfBirth = 1990;

console.log('3. calAge()', calAge(yearOfBirth)); // calAge(1990) => 31
function calAge(year) {
  return 2021 - year;
}
console.log('4. calAge()', calAge(yearOfBirth)); // calAge(1990) => 31

//console.log('5. getFullName()', getFullName()); // undefined() => getFullName is not a function
var getFullName = function () {
  return lastName + ' ' + firstName;
};
console.log('6. getFullName()', getFullName()); // getFullName() => Tran Cong Luc

console.log(hello); // Can access window or this in other file
console.log(source);
