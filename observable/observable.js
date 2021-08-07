class Observable {
  constructor(subscribe) {
    this.subscribe = subscribe
  }

  static timeout(miliseconds) {
    function subscribe(next, error, complete) {
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

    return new Observable(subscribe)
  }

  static interval(miliseconds) {
    function subscribe(next, error, complete) {
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

      const intervalId = setInterval(() => {
        observer.next()
      }, miliseconds)

      return {
        unsubsribe() {
          clearInterval(intervalId)
        },
      }
    }

    return new Observable(subscribe)
  }
}
