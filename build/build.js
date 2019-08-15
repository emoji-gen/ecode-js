'use strict'

const fs = require('fs')
const { join } = require('path')

const rollup = require('rollup')
const del = require('del')

const configs = require('./configs')

del.sync([ join(__dirname, '..', 'dist') ])
build(configs)

async function build(configs) {
  for (let config of configs) {
    await buildEntry(config)
  }
}

async function buildEntry({ input, output }) {
  const bundle = await rollup.rollup(input)
  await bundle.generate(output)
  await bundle.write(output)
}
