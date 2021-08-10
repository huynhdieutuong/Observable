const Observable = window.Rx.Observable
const boxEl = document.getElementById('box')

// Demo
// const obs$ = Observable.fromEvent(boxEl, 'mousemove')
//   .map((evt) => {
//     return {
//       offsetX: evt.offsetX,
//       offsetY: evt.offsetY,
//     }
//   })
//   .filter((evt) => evt.offsetX >= 150)
//   .take(20)

// obs$.subscribe(
//   (evt) => {
//     console.log(evt)
//   },
//   null,
//   () => console.log('complete')
// )

// concatAll
Observable.interval(500)
  .take(5)
  .map((data) => {
    return Observable.interval(500).take(2)
  })
  .concatAll()
  .subscribe({
    next: (data) => console.log(data),
    complete: () => console.log('complete'),
  })
