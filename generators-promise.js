function fakeGetData(url) {
  const fakeData = {
    'https://tuong.com/1': 'Data1',
    'https://tuong.com/2': 'Data2',
    'https://tuong.com/3': 'Data3',
  };

  const randomTime = Math.floor(Math.random() * 5000) + 1000;

  console.log(`Calling API: ${url} - Times: ${randomTime}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeData[url]);
      // reject(fakeData[url]);
    }, randomTime);
  });
}

// function* getData(url) {
//   const result = yield fakeGetData(url);
//   console.log('result', result);
// }

// const genObj = getData('https://tuong.com/1');

// (***) const promise = genObj.next().value;
// promise.then((res) => {
//   genObj.next(res);
// });

// Instead of using generator function, we can use async function, it handle (***) for us
async function getData(url) {
  const result = await fakeGetData(url);
  console.log('result', result);
}
getData('https://tuong.com/1');
