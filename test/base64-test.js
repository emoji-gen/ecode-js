'use strict'

const { expect } = require('chai')
const base64 = require('../lib/base64')

describe('base64', () => {
  describe('decode', () => {
    it('should encode text', () => {
      expect(base64.encode(new Uint8Array([ 0x61, 0x62, 0x63 ]))).to.equal('YWJj')
      expect(base64.encode(new Uint8Array([ 0x31, 0x32, 0x33, 0x34, 0x35 ]))).to.equal('MTIzNDU')
      expect(base64.encode(new Uint8Array([ 0x7e, 0x7e, 0x7e, 0x7e ]))).to.equal('fn5-fg')
    })
  })
  describe('encode', () => {
    it('should decode text', () => {
      expect(base64.decode('YWJj')).to.deep.equal(new Uint8Array([ 0x61, 0x62, 0x63 ]))
      expect(base64.decode('MTIzNDU')).to.deep.equal(new Uint8Array([ 0x31, 0x32, 0x33, 0x34, 0x35 ]))
      expect(base64.decode('fn5-fg')).to.deep.equal(new Uint8Array([ 0x7e, 0x7e, 0x7e, 0x7e ]))
    })
  })
})
