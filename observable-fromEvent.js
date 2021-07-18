function Observable(fromEventWaitToRun) {
  this.forEach = fromEventWaitToRun
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

const ele = document.querySelector('#button')
window.subscriptionEvent = Observable.fromEvent(ele, 'click').forEach((evt) => {
  console.log('event', evt)
})
