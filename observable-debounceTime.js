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

const inputEl = document.querySelector('#input')
Observable.fromEvent(inputEl, 'keydown')
  .debounceTime(500)
  .forEach((data) => {
    console.log(data.target.value)
  })
