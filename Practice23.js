function fakeGetData(url, cb) {
  const fakeData = {
    'https://tuong.com/1': 'Data1',
    'https://tuong.com/2': 'Data2',
    'https://tuong.com/3': 'Data3',
  };

  const randomTime = Math.floor(Math.random() * 5000) + 1000;

  console.log(`Calling API ${url} - Time: ${randomTime}ms`);

  setTimeout(() => {
    if (url === 'https://tuong.com/2') {
      cb(new Error('Failed'), null);
    } else {
      cb(null, fakeData[url]);
    }
  }, randomTime);
}

function myFetch(url) {
  let res;
  let err;
  let callbackError;
  let callbackSuccess;

  fakeGetData(url, (error, response) => {
    if (callbackSuccess && callbackError) {
      if (response) callbackSuccess(response);
      if (error) callbackError(error);
    } else {
      err = error;
      res = response;
    }
  });

  return {
    then(cbError, cbSuccess) {
      if (res || err) {
        if (res) cbSuccess(res);
        if (err) cbError(err);
      } else {
        callbackSuccess = cbSuccess;
        callbackError = cbError;
      }
    },
  };
}

const getData1 = myFetch('https://tuong.com/1');
const getData2 = myFetch('https://tuong.com/2');
const getData3 = myFetch('https://tuong.com/3');

function logData1(res) {
  console.log('Data1:', res);
  getData2.then(logError2, logData2);
}
function logError1(err) {
  console.log('Error1:', err);
  getData2.then(logError2, logData2);
}
function logData2(res) {
  console.log('Data2:', res);
  getData3.then(logError3, logData3);
}
function logError2(err) {
  console.log('Error2:', err);
  getData3.then(logError3, logData3);
}
function logData3(res) {
  console.log('Data3:', res);
}
function logError3(err) {
  console.log('Error3:', err);
}
getData1.then(logError1, logData1);
