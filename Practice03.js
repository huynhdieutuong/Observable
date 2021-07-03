var x = 10;

one();
function one() {
  var y = 5;
  two();

  function two() {
    var z = 15;
    three();

    function three() {
      var t = x + y + z;
      console.log('1. x + y + z', t); // 30
      four();
    }
  }
}

function four() {
  var t = 30;
  console.log('2. x =', x); // 10
  console.log('3. y =', y); // y is not defined
  console.log('4. z =', z); // z is not defined
  console.log('5. t =', t); // 30
}
