// // Timeout
// // Method 1
// const observer = {
//   next: (data) => console.log('1. Next', data),
//   error: (error) => console.log('1. Error', error),
//   complete: (complete) => console.log('1. Complete', complete),
// }
// Observable.timeout(1000).subscribe(observer)

// // Method 2
// Observable.timeout(1000).subscribe(
//   (data) => console.log('2. Next', data),
//   null,
//   (complete) => console.log('2. Complete', complete)
// )

// // Method 3
// Observable.timeout(1000).subscribe((data) => console.log('3. Next', data))

// // Interval
// // Method 1
// window.sub1 = Observable.interval(1000).subscribe({
//   next: (data) => console.log('1. Next', data),
// })

// // Method 2
// window.sub2 = Observable.interval(1000).subscribe((data) =>
//   console.log('2. Next', data)
// )

// // Event
// const buttonEl = document.getElementById('button')
// window.sub3 = Observable.fromEvent(buttonEl, 'click').subscribe((e) =>
//   console.log({
//     clientX: e.clientX,
//     clientY: e.clientY,
//   })
// )

// // Take
// Observable.interval(1000)
//   .take(5)
//   .subscribe({
//     next: (data) => console.log('[1. take] next:', data),
//     error: (err) => console.log('[1. take] error:', err),
//     complete: () => console.log('[1. take] complete'),
//   })

// // Map & Filter
// const buttonEl = document.getElementById('button')
// window.sub4 = Observable.fromEvent(buttonEl, 'click')
//   .take(10)
//   .map((e) => {
//     return {
//       clientX: e.clientX,
//       clientY: e.clientY,
//     }
//   })
//   .filter((e) => e.clientX > 50)
//   .subscribe((data) => console.log(data))

// // Debounce time
// const inputEl = document.getElementById('input')
// window.sub5 = Observable.fromEvent(inputEl, 'keydown')
//   .debounceTime(1000)
//   .subscribe({
//     next: (e) => console.log(e.target.value),
//     error: (err) => console.log(err),
//     complete: () => console.log('complete'),
//   })

// Double click
function doubleClick(ele, cb) {
  const click$ = Observable.fromEvent(ele, 'click')

  click$
    .buffer(click$.debounceTime(500))
    .filter((data) => data.length === 2)
    .map((data) => data[0])
    .subscribe(cb)
}
const buttonEl = document.getElementById('button')
doubleClick(buttonEl, (e) => console.log(e))
