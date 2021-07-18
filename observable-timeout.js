function Observable(timeoutWaitToRun) {
  this.forEach = timeoutWaitToRun
}

Observable.timeout = function (miliseconds) {
  function timeoutWaitToRun(onNextFn) {
    console.log('start')
    const timeoutId = setTimeout(() => {
      onNextFn(miliseconds)
    }, miliseconds)
    return {
      unsubscribe() {
        console.log('stop')
        clearTimeout(timeoutId)
      },
    }
  }

  const newObs$ = new Observable(timeoutWaitToRun)

  return newObs$
}

const subscription = Observable.timeout(5000).forEach((miliseconds) => {
  console.log(`forEach run after ${miliseconds}ms`)
})

// setTimeout(() => {
//   subscription.unsubscribe()
// }, 500)
