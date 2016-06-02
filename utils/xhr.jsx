/* @flow */

// client side storage library
// polyfills indexedDB -> webSQL -> localstorage
// in that order. if one fails we try the next
// indexDB's limitless storage power +
// localstorage's easy to use API
// require this way because webpack complains about
// requiring the pre-built dist file in npm
//import localforage from '../polyfills/localforage/src/localforage.js'
import localforage from 'localforage'

/**
 * @description [takes in a query string, returns JSON]
 *              [will attempt to fetch from storage first]
 *              [request will be made if not in storage]
 * @param {string} [query] the url to query
 * @param {Function} [cb] [callback function to use on success]
 * @param {boolean} [cache] [by default we cache, but sometimes we don't want to]
 * @returns {Object} [regardless of how the data is got, return JSON]
 */
const xhrGET = function (query: string, cb: Function, willCache: boolean = true) {
  if (willCache) {
    localforage.getItem(query).then(res => {
      // res will return null if not found
      if (res !== null) return cb(JSON.parse(res))

      // if nothing in localforage, make request
      const xhr = new XMLHttpRequest()
      xhr.open('GET', query, true)
      xhr.onload = function () {
        // 404s, rate-limiting, etc
        if (xhr.status > 400) {
          console.error('bad request: ', xhr.status)
        }

        // save to prevent additional requests later
        localforage.setItem(query, xhr.responseText)

        // callback function defined in calling file
        // ie, where the calling component will handle the res
        return cb(JSON.parse(xhr.responseText))
      }

      xhr.send()
    })
    .catch(err => {
      console.error('Localforage couldnt retrieve query: ', err)
    })
  }
  else {
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
}
export default xhrGET

