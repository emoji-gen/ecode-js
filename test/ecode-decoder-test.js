'use strict'

const { expect } = require('chai')
const { EcodeDecoder } = require('../index')

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
      expect(ecode.foregroundColor.value).to.equal(0x12345678)
      expect(ecode.foregroundColor.hex).to.equal('12345678')
      expect(ecode.backgroundColor.value).to.equal(0x9abcdef0)
      expect(ecode.backgroundColor.hex).to.equal('9abcdef0')
      expect(ecode.text).to.equal('ab\nc')
    })
    it('should fail to decode due to illegal length', () => {
      const ecodeDecoder = new EcodeDecoder()
      expect(() => { ecodeDecoder.decode('') }).to.throw(Error)
    })
  })
})
