/* @flow */

import get from 'lodash/get'

// Find a field in a _fields.yaml
//
// Plain field name (used in an API query):
//   patient.drug.medicinalproduct.exact
// In _fields.yaml:
//   patient.properties.drug.items.properties.medicinalproduct
//
// This requires traversing the yaml to inspect each leaf of the
// hierarchy, finding the right verbose path at which to get
// the original field definition.

const yamlGet = function (field: string, fieldsYAML: Object): void|Object {
  // Strip out 'exact', split into array
  const pathParts: Array<string> = field
    .split('.')
    .filter(item => item !== 'exact')

  const newPathParts = []

  pathParts.forEach(part => {
    newPathParts.push(part)
    // openfda -> openfda.route -> openfda.route.exact
    let currentPath: string = newPathParts.join('.')
    // currentPath must be the absolute path to get field
    let currentResult: void|Object = get(fieldsYAML.properties, currentPath)

    if (!currentResult || !currentResult.type) return

    const type: string = currentResult.type.toLowerCase()

    // If the current path takes us to an…
    // Object: push 'properties' to the path
    if (type === 'object') {
      newPathParts.push('properties')
    }
    // Array: push 'items' to the path
    else if (type === 'array') {
      newPathParts.push('items')
      currentPath = newPathParts.join('.')

      // Array may contain scalars, objects, or arrays…
      currentResult = get(fieldsYAML.properties, currentPath)
      if (currentResult.properties) {
        newPathParts.push('properties')
      }
      if (currentResult.items) {
        newPathParts.push('items')
      }
    }
  })

  const newPath: string = newPathParts.join('.')

  try {
    const result = get(fieldsYAML.properties, newPath)
    if (result) return result
  }
  catch (err) {
    console.error('error getting yaml: ', err)
  }
}

export default yamlGet
