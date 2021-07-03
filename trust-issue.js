// function analytic(info, cb) {
//   const randomTime = Math.floor(Math.random() * 5000) + 1000;

//   console.log(`Analytic ${info} in ${randomTime}ms`);

//   setTimeout(() => {
//     const res = `${info} done`;
//     cb(res);
//     cb(res);
//     cb(res);
//   }, randomTime);
// }

// function chargeCreditCard(res) {
//   console.log('Charged', res);
// }

// let isCharged = false;

// analytic('abc', function (res) {
//   if (!isCharged) {
//     chargeCreditCard(res);
//     isCharged = true;
//   }
// });

function analytic(info) {
  const randomTime = Math.floor(Math.random() * 5000) + 1000;

  console.log(`Analytic ${info} in ${randomTime}ms`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = `${info} done`;
      resolve(res);
      resolve(res);
      resolve(res);
    }, randomTime);
  });
}

function chargeCreditCard(res) {
  console.log('Charged', res);
}

analytic('abc').then((res) => chargeCreditCard(res));
