function Observable(fnWaitToRun) {
  this.forEach = fnWaitToRun
}

Observable.fromEvent = function (ele, event) {
  function fromEventWaitToRun(onNextFn) {
    function handlerEvent(e) {
      onNextFn(e)
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
  function debounceTimeWaitToRun(onNextFn) {
    let timeoutId
    const subscription = source$.forEach((e) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        onNextFn(e)
      }, miliseconds)
    })

    return {
      unsubscribe() {
        subscription.unsubscribe()
      },
    }
  }

  return new Observable(debounceTimeWaitToRun)
}

Observable.prototype.map = function (fnMap) {
  const source$ = this
  function mapWaitToRun(onNextFn) {
    const subscription = source$.forEach((e) => {
      const res = fnMap(e)
      onNextFn(res)
    })

    return {
      unsubscribe() {
        subscription.unsubscribe()
      },
    }
  }

  return new Observable(mapWaitToRun)
}

Observable.prototype.filter = function (fnFilter) {
  const source$ = this
  function filterWaitToRun(onNextFn) {
    const subscription = source$.forEach((e) => {
      const res = fnFilter(e)
      if (res) onNextFn(e)
    })

    return {
      unsubscribe() {
        subscription.unsubscribe()
      },
    }
  }

  return new Observable(filterWaitToRun)
}

Observable.fetch = function (url, params = {}) {
  async function fetchWaitToRun(onNextFn) {
    const res = await fetch(url, params)
    const data = await res.json()
    onNextFn(data)

    return {
      unsubscribe() {},
    }
  }

  return new Observable(fetchWaitToRun)
}
