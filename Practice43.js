let x = 0;
async function test() {
  x = x + (await 2);
  console.log('Line 4', x); // 2. x = 2
}
test();
x += 1;
console.log('Line 8', x); // 1. x = 1
