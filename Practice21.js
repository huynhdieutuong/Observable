console.log('1. Hello ZendVN');

setTimeout(() => {
  console.log('3. Hello setTimeout');
}, 0);

fetch('https://api.github.com/users')
  .then((response) => console.log('4. Hello response', response))
  .catch((error) => console.log('4. Hello error', error));

console.log('2. Hello Javascript');
