const objJohn = {
  firstName: 'John',
  lastName: 'Smith',
  age: 30,
};

objJohn[Symbol.iterator] = function () {
  const arr = Object.values(objJohn);
  let count = 0;
  return {
    next() {
      const value = arr[count];
      const done = value ? false : true;
      count++;
      return { value, done };
    },
  };
};

for (const result of objJohn) {
  console.log('result', result);
}
