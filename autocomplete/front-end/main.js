const Observable = window.Rx.Observable
const inputEl = document.getElementById('js-input-search')
const resEl = document.getElementById('js-results')
let queryString
const obs$ = Observable.fromEvent(inputEl, 'keydown')
  .debounceTime(500)
  .filter((e) => {
    queryString = e.target.value
    return queryString.length > 2
  })
  // .map((e) => {
  //   const url = `http://localhost:8888/data?search=${queryString}`
  //   resEl.innerHTML = renderLoading()
  //   return Observable.ajax(url)
  // })
  // .switch()
  .switchMap((e) => {
    const url = `http://localhost:8888/data?search=${queryString}`
    resEl.innerHTML = renderLoading()
    return Observable.ajax(url)
  })
  .subscribe((data) => {
    showData(data.response)
  })
// .subscribe((ajaxObs$) => {
//   ajaxObs$.subscribe((data) => showData(data.response))
// })

function showData(data) {
  if (data.length) {
    resEl.innerHTML = renderListItem(data)
  } else {
    resEl.innerHTML = renderIconEmpty()
  }
}

function renderListItem(data) {
  return data
    .map(
      (item) =>
        `<div class="list-group-item">${smartHightLightText(item.label)}</div>`
    )
    .join('')
}

function smartHightLightText(text) {
  const reg = new RegExp(queryString, 'gi')
  return text.replace(reg, (str) => `<span class="hight-light">${str}</span>`)
}

function renderLoading() {
  return `<div class="loading-data">
    <div class="icon icon-loading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </div>`
}

function renderIconEmpty() {
  return `<div class="empty-data">
    <div class="icon icon-empty">
      <svg class="icon-empty" viewBox="0 0 24 24">
        <g>
          <path
            fill="currentColor"
            d="M 21.5 22 L 2.5 22 C 1.121094 22 0 20.878906 0 19.5 L 0 12.5 C 0 12.429688 0.015625 12.359375 0.0429688 12.296875 L 4.011719 3.476562 C 4.417969 2.578125 5.3125 2 6.292969 2 L 17.707031 2 C 18.6875 2 19.582031 2.578125 19.988281 3.476562 L 23.957031 12.296875 C 23.984375 12.359375 24 12.429688 24 12.5 L 24 19.5 C 24 20.878906 22.878906 22 21.5 22 Z M 1 12.605469 L 1 19.5 C 1 20.328125 1.671875 21 2.5 21 L 21.5 21 C 22.328125 21 23 20.328125 23 19.5 L 23 12.605469 L 19.074219 3.882812 C 18.832031 3.347656 18.296875 3 17.707031 3 L 6.292969 3 C 5.703125 3 5.167969 3.347656 4.925781 3.886719 Z M 1 12.605469 "
          />
          <path
            fill="currentColor"
            d="M 16.808594 17 L 7.191406 17 C 6.570312 17 6.007812 16.609375 5.789062 16.027344 L 4.773438 13.324219 C 4.703125 13.128906 4.515625 13 4.308594 13 L 0.75 13 C 0.472656 13 0.25 12.777344 0.25 12.5 C 0.25 12.222656 0.472656 12 0.75 12 L 4.308594 12 C 4.929688 12 5.492188 12.390625 5.710938 12.972656 L 6.726562 15.675781 C 6.796875 15.871094 6.984375 16 7.191406 16 L 16.804688 16 C 17.015625 16 17.203125 15.871094 17.273438 15.675781 L 18.285156 12.972656 C 18.507812 12.390625 19.070312 12 19.691406 12 L 23.5 12 C 23.777344 12 24 12.222656 24 12.5 C 24 12.777344 23.777344 13 23.5 13 L 19.691406 13 C 19.484375 13 19.296875 13.128906 19.226562 13.324219 L 18.210938 16.027344 C 17.992188 16.609375 17.429688 17 16.808594 17 Z M 16.808594 17 "
          />
        </g>
      </svg>
    </div>
  </div>`
}
