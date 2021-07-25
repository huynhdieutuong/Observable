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
        console.log('Remove event')
        ele.removeEventListener(event, handlerEvent)
      },
    }
  }

  return new Observable(fromEventWaitToRun)
}

Observable.prototype.filter = function (onFilterFn) {
  const source$ = this

  function filterWaitToRun(onForEachFn) {
    const subscription = source$.forEach((evt) => {
      const result = onFilterFn(evt)
      if (result) onForEachFn(evt)
    })

    return {
      unsubscribe() {
        console.log('Unsubscribe filter')
        subscription.unsubscribe()
      },
    }
  }

  return new Observable(filterWaitToRun)
}

const btnEl = document.querySelector('#button')
window.subscription = Observable.fromEvent(btnEl, 'click')
  .filter((evt) => {
    return evt.screenX > 30
  })
  .forEach((data) => {
    console.log(data)
  })
