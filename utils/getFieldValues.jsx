/* @flow */

import yamlGet from './yamlGet'

// Find field values if appropriate, for substition
// e.g. patient.drug.drugadministrationroute
//      004 = "Dental"
// We want to present the string "Dental"
const getFieldValues = function (countParam: string, fields: Object): Object {
  // Donut doesn't always get fields and queryCount,
  // but still needs to render. For example, when it appears
  // under the filters and shows the proportion of queries
  // that match search criteria.
  let fieldDef: ?Object = null

  if (fields && countParam) {
    fieldDef = yamlGet(countParam, fields)
  }

  if (!fieldDef || !fieldDef.possible_values) return {}

  let fieldValues: Object = {}
  const possibleValues: void|Object = fieldDef.possible_values

  let type: string = ''
  let len: number = 0

  if (possibleValues) {
    len = possibleValues.value ? Object.keys(possibleValues.value).length : 0
    type = possibleValues.type ? possibleValues.type.toLowerCase() : ''
  }

  if (possibleValues &&
      type === 'one_of' &&
      len >= 1) {
    fieldValues = possibleValues.value
  }

  return fieldValues
}

export default getFieldValues
