function Observable(fnWaitToRun) {
  this.forEach = fnWaitToRun
}

Observable.fromEvent = function (ele, event) {
  function fromEventWaitToRun(onNextFn) {
    function handlerEvent(evt) {
      onNextFn(evt)
    }

    ele.addEventListener(event, handlerEvent)

    return {
      unsubscribe() {
        console.log('Removed Event')
        ele.removeEventListener(event, handlerEvent)
      },
    }
  }

  return new Observable(fromEventWaitToRun)
}

Observable.prototype.take = function (count) {
  const source$ = this

  function takeWaitToRun(takeOnNextFn) {
    let subscription
    if (count > 0) {
      subscription = source$.forEach((evt) => {
        takeOnNextFn(evt)
        count--

        if (count === 0) subscription.unsubscribe()
      })
    }

    return {
      unsubscribe() {
        console.log('Unsubscribe take')
        if (subscription) subscription.unsubscribe()
      },
    }
  }

  return new Observable(takeWaitToRun)
}

Observable.prototype.map = function (callbackFn) {
  const source$ = this

  function mapWaitToRun(mapOnNextFn) {
    const subscription = source$.forEach((evt) => {
      const result = callbackFn(evt)
      mapOnNextFn(result)
    })

    return {
      unsubscribe() {
        console.log('Unsubscribe map')
        subscription.unsubscribe()
      },
    }
  }

  return new Observable(mapWaitToRun)
}

const btnEl = document.querySelector('#button')
window.subscription = Observable.fromEvent(btnEl, 'click')
  .take(5)
  .map((evt) => {
    return {
      pageX: evt.pageX,
      pageY: evt.pageY,
    }
  })
  .forEach((data) => {
    console.log(data)
  })
