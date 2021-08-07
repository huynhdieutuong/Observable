// Timeout
// Method 1
const observer = {
  next: (data) => console.log('1. Next', data),
  error: (error) => console.log('1. Error', error),
  complete: (complete) => console.log('1. Complete', complete),
}
Observable.timeout(1000).subscribe(observer)

// Method 2
Observable.timeout(1000).subscribe(
  (data) => console.log('2. Next', data),
  null,
  (complete) => console.log('2. Complete', complete)
)

// Method 3
Observable.timeout(1000).subscribe((data) => console.log('3. Next', data))

// Interval
// Method 1
window.sub1 = Observable.interval(1000).subscribe({
  next: (data) => console.log('1. Next', data),
})

// Method 2
window.sub2 = Observable.interval(1000).subscribe((data) =>
  console.log('2. Next', data)
)
