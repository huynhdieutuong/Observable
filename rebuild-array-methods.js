const arr = new Array(10, 20, 30)

/**
 * forEach
 */
Array.prototype.myForEach = function (callbackFn) {
  const original = this
  for (let i = 0; i < original.length; i++) {
    callbackFn(original[i], i, original)
  }
}

// arr.myForEach((value, index, arr) => {
//   console.log({value, index, arr})
// })

/**---------------------------------------------------
 * map
 */
Array.prototype.myMap = function (callbackFn) {
  const original = this
  const newArr = []
  for (let i = 0; i < original.length; i++) {
    const newValue = callbackFn(original[i], i, original)
    newArr.push(newValue)
  }
  return newArr
}

// const mapArr = arr.myMap((value, index, arr) => {
//   console.log({value, index, arr})
//   return value*3
// })
// console.log('mapArr', mapArr)

/**---------------------------------------------------
 * filter
 */
Array.prototype.myFilter = function (callbackFn) {
  const original = this
  const newArr = []
  for (let i = 0; i < original.length; i++) {
    const validValue = callbackFn(original[i], i, original)
    if (validValue) newArr.push(original[i])
  }
  return newArr
}

// const filterArr = arr.myFilter((value, index, arr) => {
//   console.log({value, index, arr})
//   return value > 10
// })
// console.log('filterArr', filterArr)

/**---------------------------------------------------
 * take
 */
Array.prototype.take = function (number) {
  if (typeof number !== 'number') return 'Please input a number'

  const original = this
  const newArr = []
  const stop = number < original.length ? number : original.length
  for (let i = 0; i < stop; i++) {
    newArr.push(original[i])
  }
  return newArr
}

// const newArr = arr.take(2)
// console.log('newArr', newArr)

/**---------------------------------------------------
 * myFlat
 */
Array.prototype.myFlat = function () {
  const original = this
  const newArr = []
  const addEle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        addEle(arr[i])
      } else {
        newArr.push(arr[i])
      }
    }
  }
  addEle(original)
  return newArr
}

const arr2 = new Array(
  [10, 20],
  30,
  [40],
  [[50, 60], 70],
  [[80], [90, [100, [110, [120]]]]]
)
const newArr = arr2.myFlat()
console.log('newArr', newArr)
