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
    })
  })
})
