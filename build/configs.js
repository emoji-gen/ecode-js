'use strict'

const babel = require('rollup-plugin-babel')
const node = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

const pkg = require('../package.json')
const banner =
`/*!
 * ecode-js v${pkg.version}
 * (c) 2019 Emoji Generator
 * @license MIT
 */`

const entries = [
  {
    output: `dist/ecode.js`,
    format: 'umd',
  },
  {
    output: `dist/ecode.min.js`,
    format: 'umd',
  },
  {
    output: `dist/ecode.common.js`,
    format: 'cjs',
  },
  {
    output: `dist/ecode.esm.js`,
    format: 'es',
  },
  {
    output: `dist/ecode.esm.browser.js`,
    format: 'es',
    transpile: false,
  },
  {
    output: `dist/ecode.esm.browser.min.js`,
    format: 'es',
    transpile: false,
  },
]

module.exports =
  entries.map(entry => {
    const plugins = [ node(), cjs() ]
    if (entry.transpile !== false) {
      plugins.push(babel())
    }
    if (entry.output.includes('.min.js')) {
      const terserOptions = {
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/i,
        },
      }
      plugins.push(terser(terserOptions))
    }

    return {
      input: {
        input: 'index.js',
        plugins,
      },
      output: {
        banner,
        file: entry.output,
        format: entry.format,
        name: 'EcodeJs',
        exports: 'named',
      },
    }
  })
