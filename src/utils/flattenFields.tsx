/* @flow */

import each from 'lodash/each'
import isObject from 'lodash/isObject'

// Completely flatten a nested object into an object with dot-notation
// Turns the results of getFieldNamesAndChartTypes into a useful object for the infographic explorer UI
// e.g.
// {
//   'report': 'bar',
//   'date': 'line',
//   'patient.drug.name': 'bar',
//   'patient.drug.openfda.brand_name': 'bar',
//   'patient.drug.openfda.number': 'bar'
// }
const completelyFlatten = function (
  item: Object|Array<Object>,
  result: Object = {},
  prefix: void|string): Object {

  if (isObject(item)) {
    each(item, function (val, key) {
      const pre: string = prefix ? `${prefix}.${key}` : key
      return completelyFlatten(val, result, pre)
    })
  }
  else {
    result[prefix] = item
  }

  return result
}

export default completelyFlatten
