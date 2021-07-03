function fakeGetData(url, callbackFn) {
  const fakeResponses = {
    'https://zendvn.com/api/1': 'Data1',
    'https://zendvn.com/api/2': 'Data2',
    'https://zendvn.com/api/3': 'Data3',
  };

  const randomMilliseconds = Math.floor(Math.random() * 5000) + 1000;

  console.log(`Calling API: ${url} - Time: ${randomMilliseconds}ms`);

  setTimeout(function () {
    let errObj = null;
    if (url === 'https://zendvn.com/api/2') {
      errObj = {
        message: 'Error',
      };
    }
    callbackFn(errObj, fakeResponses[url]);
  }, randomMilliseconds);
}

function startRunAPI(url) {
  let res = null;
  let callback = null;
  let err = null;

  fakeGetData(url, function (errObj, data) {
    if (errObj) err = errObj;
    if (callback) {
      callback(err, data);
    } else {
      res = data;
    }
  });

  return function getData(cbFn) {
    if (res) {
      cbFn(err, res);
    } else {
      callback = cbFn;
    }
  };
}

const fnGetData1 = startRunAPI('https://zendvn.com/api/1');
const fnGetData2 = startRunAPI('https://zendvn.com/api/2');
const fnGetData3 = startRunAPI('https://zendvn.com/api/3');

fnGetData1(function (err1, res1) {
  console.log({ data: res1, error: err1 });
  fnGetData2(function (err2, res2) {
    console.log({ data: res2, error: err2 });
    fnGetData3(function (err3, res3) {
      console.log({ data: res3, error: err3 });
    });
  });
});

// fnGetData1(cbData1)
// function cbData1 (res1) {
//   console.log(res1);
//   fnGetData2(cbData2);
// }
// function cbData2 (res2) {
//   console.log(res2);
//   fnGetData3(cbData3);
// }
// function cbData3 (res3) {
//   console.log(res3);
// }

// My solution
// let res1;
// let res2;
// let res3;
// let hasRes1 = false;
// let hasRes2 = false;
// let hasRes3 = false;

// function getResponse() {
//   // Has res 1 first
//   if (res1 && !res2 && !res3) {
//     hasRes1 = true;
//     console.log(res1);
//   }
//   if (hasRes1 && res2 && !res3) {
//     hasRes2 = true;
//     console.log(res2);
//   }
//   if (hasRes1 && !res2 && res3) {
//     hasRes3 = true;
//   }
//   if (hasRes1 && hasRes2 && res3) {
//     console.log(res3);
//   }

//   // Has res 2 first
//   if (!res1 && res2 && !res3) {
//     hasRes2 = true;
//   }
//   if (res1 && hasRes2 && !res3) {
//     hasRes1 = true;
//     console.log(res1);
//     console.log(res2);
//   }
//   if (!res1 && hasRes2 && res3) {
//     hasRes3 = true;
//   }
//   if (res1 && hasRes2 && hasRes3) {
//     console.log(res1);
//     console.log(res2);
//     console.log(res3);
//   }

//   // Has res 3 first
//   if (!res1 && !res2 && res3) {
//     hasRes3 = true;
//   }
//   if (res1 && !res2 && hasRes3) {
//     hasRes1 = true;
//     console.log(res1);
//   }
//   if (!res1 && res2 && hasRes3) {
//     hasRes2 = true;
//   }
//   if (hasRes1 && res2 && hasRes3) {
//     console.log(res2);
//     console.log(res3);
//   }
// }

// fakeGetData('https://zendvn.com/api/1', function (response1) {
//   res1 = response1;
//   getResponse();
// });
// fakeGetData('https://zendvn.com/api/2', function (response2) {
//   res2 = response2;
//   getResponse();
// });
// fakeGetData('https://zendvn.com/api/3', function (response3) {
//   res3 = response3;
//   getResponse();
// });
