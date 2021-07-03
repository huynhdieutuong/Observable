// HOF: receive arguments which is a function or return a function
const arr = [2, 4, 6];

function cloneArrayAndDoSomething(arr, func) {
  const cloneArr = [...arr];
  const newArr = cloneArr.map((num) => func(num));
  console.log(newArr);
}

function double(num) {
  return num * num;
}

function plus3(num) {
  return num + 3;
}

cloneArrayAndDoSomething(arr, plus3);
