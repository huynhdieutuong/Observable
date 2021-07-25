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
        ele.removeEventListener(event, handlerEvent)
      },
    }
  }

  return new Observable(fromEventWaitToRun)
}

Observable.prototype.filter = function (filterFn) {
  const source$ = this

  function filterWaitToRun(forEachFn) {
    const subscription = source$.forEach((evt) => {
      const result = filterFn(evt)
      if (result) forEachFn(evt)
    })

    return {
      unsubscribe() {
        subscription.unsubscribe()
      },
    }
  }

  return new Observable(filterWaitToRun)
}

Observable.prototype.debounceTime = function (miliseconds) {
  const source$ = this

  function debounceTimeWaitToRun(newOnNextFn) {
    let timeoutId
    source$.forEach((evt) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        newOnNextFn(evt)
      }, miliseconds)
    })
  }

  return new Observable(debounceTimeWaitToRun)
}

Observable.prototype.buffer = function (closeObs$) {
  const source$ = this
  function bufferWaitToRun(newOnNextFn) {
    let data = []
    const subSource = source$.forEach((evt) => {
      data.push(evt)
    })

    const subClose = closeObs$.forEach(() => {
      newOnNextFn(data)
      data = []
    })

    return {
      unsubscribe() {
        subSource.unsubscribe()
        subClose.unsubscribe()
      },
    }
  }

  return new Observable(bufferWaitToRun)
}

function doubleClick(domEl, cb) {
  const click$ = Observable.fromEvent(domEl, 'click')

  click$
    .buffer(click$.debounceTime(400))
    .filter((data) => data.length === 2)
    .forEach(cb)
}

const btnEl = document.querySelector('#button')
doubleClick(btnEl, (evt) => {
  console.log('double click', evt)
})
