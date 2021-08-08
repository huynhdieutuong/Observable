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

    static fromEvent(element, eventName) {
      function _subscribe(observer) {
        function handler(e) {
          observer.next(e)
        }
        element.addEventListener(eventName, handler)

        return {
          unsubsribe() {
            element.removeEventListener(eventName, handler)
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
                subscription.unsubsribe()
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
          unsubsribe() {
            if (subscription) subscription.unsubsribe()
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
          unsubsribe() {
            subscription.unsubsribe()
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
          unsubsribe() {
            subscription.unsubsribe()
          },
        }
      }

      return new Observable(_subscribe)
    }
  }

  return Observable
})()
