function testPromise() {
  setTimeout(() => console.log('7. timeout'), 0);

  console.log('1. Before Promise');
  new Promise((successFn, errorFn) => {
    console.log('2. In Promise');
    successFn(1);
  }).then((res) => {
    console.log('5. Then', res);
  });
  console.log('3. After Promise');
}

async function test() {
  await testPromise();
  console.log('6. Test');
}

test();
console.log('4. After test()');
