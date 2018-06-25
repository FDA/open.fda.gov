// fetch() polyfill for making API calls.
require("whatwg-fetch");
require("babel-polyfill")
var Promise = require("bluebird");

Promise.config({
  longStackTraces: true,
  warnings: true // note, run node with --trace-warnings to see full stack traces for warnings
})

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require("object-assign");