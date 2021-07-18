function Observable(intervalWaitToRun) {
  this.forEach = intervalWaitToRun
}

Observable.interval = function (miliseconds) {
  function intervalWaitToRun(onNextFn) {
    let times = 0
    const intervalId = setInterval(() => {
      times++
      onNextFn(times, miliseconds)
    }, miliseconds)

    return {
      unsubscribe() {
        console.log('Stop interval')
        clearInterval(intervalId)
      },
    }
  }

  const newObs$ = new Observable(intervalWaitToRun)

  return newObs$
}

window.subscription = Observable.interval(1000).forEach(
  (times, miliseconds) => {
    console.log(`${times}. forEach interval ${miliseconds}ms`)
  }
)

// Copy paste to console to stop interval
// window.subscription.unsubscribe()
