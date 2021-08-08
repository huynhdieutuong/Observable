class Observable {
  constructor(_subscribe) {
    this._subscribe = _subscribe
  }

  subscribe(next, error, complete) {
    let observer
    if (typeof next === 'function') {
      observer = {
        next: next,
        error: error || function () {},
        complete: complete || function () {},
      }
    } else {
      observer = next
      if (!observer.error) observer.error = function () {}
      if (!observer.complete) observer.complete = function () {}
    }

    return this._subscribe(observer)
  }

  static timeout(miliseconds) {
    function _subscribe(observer) {
      const timeoutId = setTimeout(() => {
        observer.next()
        observer.complete()
      }, miliseconds)

      return {
        unsubsribe() {
          clearTimeout(timeoutId)
        },
      }
    }

    return new Observable(_subscribe)
  }

  static interval(miliseconds) {
    function _subscribe(observer) {
      const intervalId = setInterval(() => {
        observer.next()
      }, miliseconds)

      return {
        unsubsribe() {
          clearInterval(intervalId)
        },
      }
    }

    return new Observable(_subscribe)
  }
}
