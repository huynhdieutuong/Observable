function createIterator(arr) {
  let count = 0;

  return {
    next() {
      const value = arr[count];
      const done = value ? false : true;
      count++;
      return { value, done };
    },
  };
}

const listNum = [40, 21, 53];
const iterator = createIterator(listNum);

const data1 = iterator.next();
console.log('data1', data1);

const data2 = iterator.next();
console.log('data2', data2);

const data3 = iterator.next();
console.log('data3', data3);

const data4 = iterator.next();
console.log('data4', data4);
