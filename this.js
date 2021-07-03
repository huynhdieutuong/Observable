const john = {
  year: 1990,
  sum: function (x, y) {
    console.log(x, y);
    console.log('sum', this);
    console.log('----------------');
    return x + y;
  },
};
const value1 = john.sum(10, 20);
const value2 = john.sum.bind({ zend: 'vn1' })(10, 30);
const value3 = john.sum.call({ zend: 'vn2' }, 10, 40);
const value4 = john.sum.apply({ zend: 'vn3' }, [10, 50]);

console.log('value1', value1);
console.log('value2', value2);
console.log('value3', value3);
console.log('value4', value4);
