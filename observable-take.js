function Observable(fnWaitToRun) {
  this.forEach = fnWaitToRun
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

Observable.fromEvent = function (ele, event) {
  function fromEventWaitToRun(onNextFn) {
    function handlerEvent(evt) {
      onNextFn(evt)
    }

    ele.addEventListener(event, handlerEvent)

    return {
      unsubscribe() {
        console.log('unsubscribe')
        ele.removeEventListener(event, handlerEvent)
      },
    }
  }

  return new Observable(fromEventWaitToRun)
}

Observable.prototype.take = function (count) {
  const source$ = this
  console.log('source$', source$)
  function takeWaitToRun(newOnNext) {
    let subscription
    if (count > 0) {
      // 1. Chạy vòng lặp cái source$
      // 2. Lấy count phần tử đầu tiên dựa
      // 3. Khi đã lấy đủ dữ liệu từ source$ -> unsubscribe
      subscription = source$.forEach((evt) => {
        count--
        newOnNext(evt)
        if (count === 0) {
          subscription.unsubscribe()
        }
      })
    }

    return {
      unsubscribe() {
        if (subscription) {
          subscription.unsubscribe()
        }
      },
    }
  }

  const newObs$ = new Observable(takeWaitToRun)
  console.log('newObs$', newObs$)
  return newObs$
}

const btnEl = document.querySelector('#button')

Observable.fromEvent(btnEl, 'click')
  .take(3)
  .forEach((evt) => {
    console.log(evt)
  })

Observable.interval(1000)
  .take(3)
  .forEach((evt) => {
    console.log(evt)
  })
