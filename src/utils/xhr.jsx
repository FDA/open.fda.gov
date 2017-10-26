/* @flow */

/**
 * @description [takes in a query string, returns JSON]
 *              [will attempt to fetch from storage first]
 *              [request will be made if not in storage]
 * @param {string} [query] the url to query
 * @param {Function} [cb] [callback function to use on success]
 * @param {boolean} [cache] [by default we cache, but sometimes we don't want to]
 * @returns {Object} [regardless of how the data is got, return JSON]
 */

const xhrGET = function (query: string, cb: Function) {
  // if not caching, always make a request
  // for example, api status should never be cached
  const xhr = new XMLHttpRequest()
  xhr.open('GET', query, true)
  xhr.onload = function () {
    // 404s, rate-limiting, etc
    if (xhr.status > 400) {
      console.error('bad request: ', xhr.status)
    }

    // callback function defined in calling file
    // ie, where the calling component will handle the res
    return cb(JSON.parse(xhr.responseText))
  }

  xhr.send()
}
export default xhrGET

