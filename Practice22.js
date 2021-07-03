console.log('1. Hello ZendVN');

setTimeout(() => {
  console.log('5. Hello setTimeout');
}, 0);

fetch('https://api.github.com/users')
  .then((response) => console.log('4. Hello response', response))
  .catch((error) => console.log('4. Hello error', error));

block5Seconds();
function block5Seconds() {
  const start = new Date().getTime();
  while (true) {
    const end = new Date().getTime();

    if (end - start >= 5000) {
      break;
    }
  }
  console.log('2. block5Seconds done');
}

console.log('3. Hello Javascript');
