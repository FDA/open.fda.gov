/* @flow */

import each from 'lodash/each'

// Traverses the endpoint field documentation and gets the field names and types
// e.g.
// {
//   report: 'bar',
//   date: 'line',
//   patient: {
//     drug: {
//       name: 'bar',
//       openfda: {
//         brand_name: 'bar',
//         number: 'bar'
//       }
//     }
//   }
// }
const getFieldNamesAndChartTypes = function (fields: Record<string, any>): Record<string, any> {
  const fieldMap: Record<string, any> = {}

  each(fields, function (val: { type?: string; items?: any; hide?: boolean; is_exact?: boolean; format?: string; possible_values?: { type?: string; value?: Record<string, any> }; properties?: any }, key: string) {
    // If this field is one that wants to be counted with .exact
    // (e.g. a product name field), it needs to be represented with
    // .exact appended to the ordinary key name
    let exactKey: string | null | undefined = null

    // recursion if we meet an field with type object
    if (val.type === 'object' && (key !== 'meta')) {
      fieldMap[key] = getFieldNamesAndChartTypes(val.properties)
      return
    }

    // This array contains multi-field objects
    // e.g. in /drug/event patient.drug is an array of drug objects
    if (val.type === 'array' && val.items.properties) {
      fieldMap[key] = getFieldNamesAndChartTypes(val.items.properties)
      return
    }

    const hidden: boolean = val.hide || (val.items && val.items.hide)
    if (hidden) {
      return
    }

    // because of recursion
    // we should be looking at an individual field at this point
    // if not array/object, checking .is_exact is enough
    // if array/object, we need to go 1 level deeper
    const isExact: boolean = val.is_exact || (val.items && val.items.is_exact)
    if (isExact) {
      exactKey = `${key}.exact`
    }

    // Determine what kind of chart we will want to draw based on the field content/data
    if (val.format === 'date') {
      fieldMap[key] = 'Line'

      if (isExact) {
        if (exactKey) {
          fieldMap[exactKey] = 'Line'
        }
      }

      return
    }

    if (val.possible_values) {
      const vals: { type?: string; value?: Record<string, any> } = val.possible_values

      if (vals.type !== 'one_of') return

      const isShort: boolean = vals.value ? Object.keys(vals.value).length < 10 : false

      // we only want to use donut charts
      // when we can easily fit the data
      if (!isShort) return

      fieldMap[key] = 'Donut'
      if (isExact) {
        if (exactKey) {
          fieldMap[exactKey] = 'Donut'
        }
      }

      return
    }

    // N.B. If this array contains a single field, it gets treated like an ordinary field
    // e.g. in /drug/event patient.drug.openfda.brand_name is an array of strings
    fieldMap[key] = 'Bar'
    if (isExact) {
      if (exactKey) {
        fieldMap[exactKey] = 'Bar'
      }
    }
  })

  return fieldMap
}

export default getFieldNamesAndChartTypes
