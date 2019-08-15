'use strict'

const { expect } = require('chai')
const { EcodeDecoder } = require('..')

describe('EcodeDecoder', () => {
  describe('decode', () => {
    it('should decode ecode', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = ecodeDecoder.decode('BA0hzxI0VniavN7wYWIKYw')
      expect(ecode.version).to.equal(1)
      expect(ecode.locale).to.equal('en')
      expect(ecode.align).to.equal('center')
      expect(ecode.size).to.equal('xhdpi')
      expect(ecode.format).to.equal('WebP')
      expect(ecode.fontId).to.equal(0xcf)
      expect(ecode.foregroundColor).to.equal(0x12345678)
      expect(ecode.backgroundColor).to.equal(0x9abcdef0)
      // expect(ecode.text).to.equal('ab\nc')
    })
  })
})
