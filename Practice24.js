function fakeGetData(url) {
  const fakeData = {
    'https://tuong.com/1': 'Data1',
    'https://tuong.com/2': 'Data2',
    'https://tuong.com/3': 'Data3',
  };

  const randomTime = Math.floor(Math.random() * 5000) + 1000;

  console.log(`Calling API: ${url} - Time: ${randomTime}ms`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeData[url]);
    }, randomTime);
  });
}

const promise1 = fakeGetData('https://tuong.com/1');
const promise2 = fakeGetData('https://tuong.com/2');
const promise3 = fakeGetData('https://tuong.com/3');

promise1
  .then((res) => {
    console.log(res);
    return promise2;
  })
  .then((res) => {
    console.log(res);
    return promise3;
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// Promise.all([
//   fakeGetData('https://tuong.com/1'),
//   fakeGetData('https://tuong.com/2'),
//   fakeGetData('https://tuong.com/3'),
// ])
//   .then((results) => {
//     results.forEach((res) => {
//       console.log(res);
//     });
//   })
//   .catch((err) => console.log(err));
