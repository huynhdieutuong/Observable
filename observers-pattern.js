function timer(time) {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve(time + 1)
    }, time)
  })
}

timer(1000).then((time) => {
  console.log(time)
})

/**
 * Why use observers pattern (observable)?
 * 1. It can resolve repeatedly that Promise can't do (such as: setInterval in Promise)
 * 2. And it can stop repeat whenever we want that Promise can't do
 * 3. It will standardize Producer-Consumer pattern (DOM Events, XMLHTTPRequest, setInterval, WebSocket,...) to one:
 * - Producer: control send data
 * - Consumer: get data from Producer
 * - Consumer: can reject data from Producer
 * 4. We will handle data like a Collection. Array and Events are both Collection (have many elements), but:
 * - Array: handle element continuously (forEach, map, filter)
 * - Observable: handle element intermittenly by time 
 */