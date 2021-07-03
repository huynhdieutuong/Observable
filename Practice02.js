console.log('1. age =', age); // undefined
var age = 20;
console.log('2. age =', age); // 20

challenge02();

function challenge02() {
  console.log('3. age =', age); // 20
  var age = 50;
  console.log('4. age =', age); // 50
}

console.log('5. age =', age); // 20
