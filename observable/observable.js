window.Observable = (function () {
  const SymbolSubscribe = Symbol('Subscribe')

  class Observable {
    constructor(_subscribe) {
      this[SymbolSubscribe] = _subscribe
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

      return this[SymbolSubscribe](observer)
    }

    static timeout(miliseconds) {
      function _subscribe(observer) {
        const timeoutId = setTimeout(() => {
          observer.next()
          observer.complete()
        }, miliseconds)

        return {
          unsubscribe() {
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
          unsubscribe() {
            clearInterval(intervalId)
          },
        }
      }

      return new Observable(_subscribe)
    }

    static fromEvent(element, eventName) {
      function _subscribe(observer) {
        function handler(e) {
          observer.next(e)
        }
        element.addEventListener(eventName, handler)

        return {
          unsubscribe() {
            element.removeEventListener(eventName, handler)
          },
        }
      }

      return new Observable(_subscribe)
    }

    static fromFetch(url, request = {}) {
      function _subscribe(observer) {
        const controller = new AbortController()
        const signal = controller.signal
        const params = {
          ...request,
          signal,
        }

        fetch(url, params)
          .then((res) => {
            observer.next(res)
            observer.complete()
          })
          .catch((err) => {
            observer.error(err)
          })

        return {
          unsubscribe() {
            controller.abort()
          },
        }
      }

      return new Observable(_subscribe)
    }

    take(number) {
      if (number < 0) {
        throw new Error('Argument Out Of Range')
      }

      const source$ = this
      function _subscribe(observer) {
        let counter = 0
        let subscription = null

        if (number === 0) {
          observer.complete()
        } else {
          subscription = source$.subscribe({
            next: (data) => {
              observer.next(data)
              counter++

              if (counter === number) {
                observer.complete()
                subscription.unsubscribe()
              }
            },
            error: (err) => {
              observer.error(err)
            },
            complete: () => {
              observer.complete()
            },
          })
        }

        return {
          unsubscribe() {
            if (subscription) subscription.unsubscribe()
          },
        }
      }

      return new Observable(_subscribe)
    }

    map(callback) {
      const source$ = this

      function _subscribe(observer) {
        const subscription = source$.subscribe({
          next: (data) => {
            const result = callback(data)
            observer.next(result)
          },
          error: (err) => {
            observer.error(err)
          },
          complete: () => {
            observer.complete()
          },
        })

        return {
          unsubscribe() {
            subscription.unsubscribe()
          },
        }
      }

      return new Observable(_subscribe)
    }

    filter(testFn) {
      const source$ = this

      function _subscribe(observer) {
        const subscription = source$.subscribe({
          next: (data) => {
            const result = testFn(data)
            if (result) observer.next(data)
          },
          error: (err) => {
            observer.error(err)
          },
          complete: () => {
            observer.complete()
          },
        })

        return {
          unsubscribe() {
            subscription.unsubscribe()
          },
        }
      }

      return new Observable(_subscribe)
    }

    debounceTime(miliseconds) {
      const source$ = this

      function _subscribe(observer) {
        let timeoutId
        let isSource$Complete = false

        const subscription = source$.subscribe({
          next: (data) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
              observer.next(data)
              timeoutId = null
              if (isSource$Complete) observer.complete()
            }, miliseconds)
          },
          error: (err) => {
            observer.error(err)
          },
          complete: () => {
            isSource$Complete = true
            if (timeoutId === null) observer.complete()
          },
        })

        return {
          unsubscribe() {
            subscription.unsubscribe()
          },
        }
      }

      return new Observable(_subscribe)
    }

    buffer(closeObs$) {
      const source$ = this

      function _subscribe(observer) {
        let dataArr = []
        const subscription = source$.subscribe({
          next: (data) => {
            dataArr.push(data)
          },
          error: (err) => {
            observer.error(err)
          },
          complete: () => {
            observer.complete()
          },
        })

        const closeSubscription = closeObs$.subscribe({
          next: () => {
            observer.next(dataArr)
            dataArr = []
          },
        })

        return {
          unsubscribe() {
            subscription.unsubscribe()
            closeSubscription.unsubscribe()
          },
        }
      }

      return new Observable(_subscribe)
    }
  }

  return Observable
})()
