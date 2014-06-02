# grunt-minified

> A grunt plugin to minify given JavaScript files

## No more development

This plugin was originally intended to add some features grunt-contrib-uglify did not supply under Grunt 0.3. After the Grunt 0.4 release, there's no longer need for grunt-minified.

I will no longer develop this plugin any further and I strongly suggest users of this plugin to either fork it and continue the development on their hand, or use the fully featured [grunt-contrib-uglify] plugin.

## Getting Started
Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with:

`npm install grunt-minified`

Then add this line to your project's `Gruntfile.js`:

`grunt.loadNpmTasks('grunt-minified');`

[grunt-contrib-uglify]: https://npmjs.org/package/grunt-contrib-uglify
[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started

## Documentation
Add something like this in your gruntfile:

```javascript
minified : {
  files: {
    src: [
    '/js/src/**/*.js',
    '/js/src/*.js'
    ],
    dest: '/js/min/'
  },
  options : {
    sourcemap: true,
    allinone: false
  }
}
```

With this configuration, grunt-minified will output a minified file and a sourcemap per parsed file with this filename structure: `<filename>.min.js` in the `dest` folder.

### Options

Grunt-minified currently supports these options:

#### sourcemap
* Type: `Boolean`
* Defaults: `false`

Generate a sourcemap for the generated files(s) if toggled. The output files is saved with this filename structure: `<filename>.js.map` in the `dest` folder.

#### allinone
* Type: `Boolean`
* Defaults: `false`

Generate just one minified file if toggled. Output file is saved as `minified.js` if `options.dest_filename` is not set.

#### dest_filename
* Type: `String`
* Defaults: `minified.js`

If `allinone` is set, grunt-minified will use `dest_filename` for the generated sourcemap. No point of setting this if `allinone` is set to false. 
Currently, this is a copy & paste from UgliyJS2, YMMV.

#### ext
* Type: `String`
* Defaults: `null`

If `ext` is set, grunt-minified will replace the files current extention with `ext`. The extension must begin with a `.` to work correctly. Eg `.min.js`. This will also override the extension of `dest_filename` if set.

#### mirrorSource
* Type: `Object`
* Defaults: `null`

If `mirrorSource.path` is set, grunt-minified will mirror the destination path to the source path of each file that is processed. You must supply at `path` property for `mirrorSource` to work.

##### mirrorSource.path
* Type: 'String'
* Defaults: `null`

`mirrorSource.path` is a `String` that describes the base path of the source folder that you would like to mirror. The `mirrorSource.path` will be replaced by `files.dest`.

Example configuration using `mirrorSource`:

```javascript
minified : {
  dev: {
    files: {
      src: [
      'source/**/*.js'
      ],
      dest: 'deploy'
    },
    options : {
      sourcemap: false,
      allinone: false,
      mirrorSource: {
        path: 'source/js/'
      },
      ext: '.min.js'
    }
  }
}
```

Example folder output using `mirrorSource`:

```bash
/cwd/
├─┬ source
| ├─┬ folder_a
|   ├── a.js
|   └─┬ folder_ab
|     └── ab.js
├─┬ deploy
| ├─┬ folder_a
|   ├── a.min.js
|   └─┬ folder_ab
|     └── ab.min.js
```

#### uglifyOpts
* Type: `Object`
* Defaults: `{}`

If `uglifyOpts` is set, grunt-minified will pass along the options to uglify-js. Below is a list of options that are available:

* `warnings`: (default `false`) - pass `true` to display compressor warnings.
* `fromString`: (default `false`) - if you pass `true` then you can pass JavaScript source code, rather than file names.
* `mangle`: pass `false` to skip mangling names.
* `output`: (default `null`) - pass an object if you wish to specify additional [Beautifier options](#beautifier-options). The defaults are optimized for best compressions. Please see [UglifyJS - the code generator][codegen] for more details.
* `compress`: (default `{}`) - pass `false` to skip compressing entirely. Pass an object to specify custom [compressor options](#compressor-options). Please see [UglifyJS - the compressor][compressor] for more details.

##### Beautifier options
* `beautify` (default `true`) -- whether to actually beautify the output.
* `indent-level` (default 4)
* `indent-start` (default 0) -- prefix all lines by that many spaces
* `quote-keys` (default `false`) -- pass `true` to quote all keys in literal objects
* `space-colon` (default `true`) -- insert a space after the colon signs
* `ascii-only` (default `false`) -- escape Unicode characters in strings and regexps
* `inline-script` (default `false`) -- escape the slash in occurrences of `</script` in strings
* `width` (default 80) -- only takes effect when beautification is on, this specifies an (orientative) line width that the beautifier will try to obey.  It refers to the width of the line text (excluding indentation). It doesn't work very well currently, but it does make the code generated by UglifyJS more readable.
* `max-line-len` (default 32000) -- maximum line length (for uglified code)
* `ie-proof` (default `true`) -- generate “IE-proof” code (for now this means add brackets around the do/while in code like this: `if (foo) do something(); while (bar); else ...`.
* `bracketize` (default `false`) -- always insert brackets in `if`, `for`, `do`, `while` or `with` statements, even if their body is a single statement.
* `semicolons` (default `true`) -- separate statements with semicolons.  If you pass `false` then whenever possible we will use a newline instead of a semicolon, leading to more readable output of uglified code (size before gzip could be smaller; size after gzip insignificantly larger).

##### Compressor options
You need to pass `--compress` (`-c`) to enable the compressor.  Optionally you can pass a comma-separated list of options.  Options are in the form `foo=bar`, or just `foo` (the latter implies a boolean option that you want to set `true`; it's effectively a shortcut for `foo=true`).

The defaults should be tuned for maximum compression on most code.  Here are the available options (all are `true` by default, except `hoist_vars`):

* `sequences` -- join consecutive simple statements using the comma operator
* `properties` -- rewrite property access using the dot notation, for
  example `foo["bar"] → foo.bar`
* `dead-code` -- remove unreachable code
* `drop-debugger` -- remove `debugger;` statements
* `unsafe` -- apply "unsafe" transformations (discussion below)
* `conditionals` -- apply optimizations for `if`-s and conditional
  expressions
* `comparisons` -- apply certain optimizations to binary nodes, for example:
  `!(a <= b) → a > b` (only when `unsafe`), attempts to negate binary nodes,
  e.g. `a = !b && !c && !d && !e → a=!(b||c||d||e)` etc.
* `evaluate` -- attempt to evaluate constant expressions
* `booleans` -- various optimizations for boolean context, for example `!!a
  ? b : c → a ? b : c`
* `loops` -- optimizations for `do`, `while` and `for` loops when we can
  statically determine the condition
* `unused` -- drop unreferenced functions and variables
* `hoist-funs` -- hoist function declarations
* `hoist-vars` -- hoist `var` declarations (this is `false` by default
  because it seems to increase the size of the output in general)
* `if-return` -- optimizations for if/return and if/continue
* `join-vars` -- join consecutive `var` statements
* `cascade` -- small optimization for sequences, transform `x, x` into `x`
  and `x = something(), x` into `x = something()`
* `warnings` -- display warnings when dropping unreachable code or unused
  declarations etc.

  For more information on UglifyJS, please see the [UglifyJS Website][uglifyjs]

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Contributors
  * ["psyrendust" Larry Gordon][psyrendust]

## Release History
_(Until v1.0.0, this will only be updated when major or breaking changes are made)_

  * 2013/01/13 - v0.0.5 - Added support for mirroring source to dest and the ability to set a custom file extension on minified files.
  * 2013/01/11 - v0.0.4 - Added support for UglifyJS options
  * 2013/01/10 - v0.0.3 - Added support for grunt v 0.4.0rc5


## License
Copyright (c) 2012 Alexander Vassbotn Røyne-Helgesen
Licensed under the GPL license.

  [codegen]: http://lisperator.net/uglifyjs/codegen
  [compressor]: http://lisperator.net/uglifyjs/compress
  [uglifyjs]: http://lisperator.net/uglifyjs/
  [psyrendust]: https://github.com/psyrendust
