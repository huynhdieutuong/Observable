const arr = [40, 123, 432];

// iterable is a special Method of javascript without argument:
// arr[Symbol.iterator] = function (no argument) { return iterator }

// iterator is an object: {
//   next() {
//     return { value, done }
//   }
// }

arr[Symbol.iterator] = function () {
  let count = 0;
  return {
    next() {
      const value = 'count:' + count;
      const done = count > 10 ? true : false;
      count++;
      return { value, done };
    },
  };
};
// If declare iterable, it will change for ... of .... And new result:
// value count:0
// value count:1
// value count:2
// value count:3
// value count:4
// value count:5
// value count:6
// value count:7
// value count:8
// value count:9
// value count:10

for (const value of arr) {
  console.log('value', value);
}
// If not declare iterable.
// value 40
// value 123
// value 432
