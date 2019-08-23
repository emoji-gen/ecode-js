'use strict'

const { expect } = require('chai')
const { EcodeDecoder } = require('../index')
const base64 = require('../lib/base64')

describe('EcodeDecoder', () => {
  describe('decode', () => {
    it('should decode ecode', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = ecodeDecoder.decodeV1('BA0hzxI0VniavN7wYWIKYw')
      expect(ecode.version).to.equal(1)
      expect(ecode.locale).to.equal('en')
      expect(ecode.flags.sizeFixed).to.be.true;
      expect(ecode.flags.stretch).to.be.true;
      expect(ecode.align).to.equal('center')
      expect(ecode.size).to.equal('xhdpi')
      expect(ecode.format.id).to.equal(1)
      expect(ecode.format.name).to.equal('WebP')
      expect(ecode.fontId).to.equal(0xcf)
      expect(ecode.foregroundColor.value).to.equal(0x12345678)
      expect(ecode.foregroundColor.hex).to.equal('12345678')
      expect(ecode.backgroundColor.value).to.equal(0x9abcdef0)
      expect(ecode.backgroundColor.hex).to.equal('9abcdef0')
      expect(ecode.text).to.equal('ab\nc')
    })

    it('should fail to decode due to illegal length', () => {
      const ecodeDecoder = new EcodeDecoder()
      expect(() => { ecodeDecoder.decodeV1('') }).to.throw(Error, 'Illegal byte length 0')
    })

    it('should fail to decode due to illegal version', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = base64.encode([
        0xf4, // Version:4, Locale:4
        0x0d, // Flags:6, Align:2
        0x21, // Size:4, Format:4
        0xcf, // FontId:8
        0x12, // ForegroundColor_R:8
        0x34, // ForegroundColor_G:8
        0x56, // ForegroundColor_B:8
        0x78, // ForegroundColor_A:8
        0x9a, // BackgroundColor_R:8
        0xbc, // BackgroundColor_G:8
        0xde, // BackgroundColor_B:8
        0xf0, // BackgroundColor_A:8
        0x61, // Text:8
        0x62, // Text:8
        0x0a, // Text:8
        0x63, // Text:8
      ])
      expect(() => { ecodeDecoder.decodeV1(ecode) }).to.throw(Error, 'Illegal version 16')
    })

    it('should fail to decode due to illegal locale ID', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = base64.encode([
        0x0f, // Version:4, Locale:4
        0x0d, // Flags:6, Align:2
        0x21, // Size:4, Format:4
        0xcf, // FontId:8
        0x12, // ForegroundColor_R:8
        0x34, // ForegroundColor_G:8
        0x56, // ForegroundColor_B:8
        0x78, // ForegroundColor_A:8
        0x9a, // BackgroundColor_R:8
        0xbc, // BackgroundColor_G:8
        0xde, // BackgroundColor_B:8
        0xf0, // BackgroundColor_A:8
        0x61, // Text:8
        0x62, // Text:8
        0x0a, // Text:8
        0x63, // Text:8
      ])
      expect(() => { ecodeDecoder.decodeV1(ecode) }).to.throw(Error, 'Illegal locale ID 15')
    })

    it('should fail to decode due to illegal align ID', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = base64.encode([
        0x04, // Version:4, Locale:4
        0x0f, // Flags:6, Align:2
        0x21, // Size:4, Format:4
        0xcf, // FontId:8
        0x12, // ForegroundColor_R:8
        0x34, // ForegroundColor_G:8
        0x56, // ForegroundColor_B:8
        0x78, // ForegroundColor_A:8
        0x9a, // BackgroundColor_R:8
        0xbc, // BackgroundColor_G:8
        0xde, // BackgroundColor_B:8
        0xf0, // BackgroundColor_A:8
        0x61, // Text:8
        0x62, // Text:8
        0x0a, // Text:8
        0x63, // Text:8
      ])
      expect(() => { ecodeDecoder.decodeV1(ecode) }).to.throw(Error, 'Illegal align ID 3')
    })

    it('should fail to decode due to illegal size ID', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = base64.encode([
        0x04, // Version:4, Locale:4
        0x0d, // Flags:6, Align:2
        0xf1, // Size:4, Format:4
        0xcf, // FontId:8
        0x12, // ForegroundColor_R:8
        0x34, // ForegroundColor_G:8
        0x56, // ForegroundColor_B:8
        0x78, // ForegroundColor_A:8
        0x9a, // BackgroundColor_R:8
        0xbc, // BackgroundColor_G:8
        0xde, // BackgroundColor_B:8
        0xf0, // BackgroundColor_A:8
        0x61, // Text:8
        0x62, // Text:8
        0x0a, // Text:8
        0x63, // Text:8
      ])
      expect(() => { ecodeDecoder.decodeV1(ecode) }).to.throw(Error, 'Illegal size ID 15')
    })

    it('should fail to decode due to illegal format ID', () => {
      const ecodeDecoder = new EcodeDecoder()
      const ecode = base64.encode([
        0x04, // Version:4, Locale:4
        0x0d, // Flags:6, Align:2
        0x2f, // Size:4, Format:4
        0xcf, // FontId:8
        0x12, // ForegroundColor_R:8
        0x34, // ForegroundColor_G:8
        0x56, // ForegroundColor_B:8
        0x78, // ForegroundColor_A:8
        0x9a, // BackgroundColor_R:8
        0xbc, // BackgroundColor_G:8
        0xde, // BackgroundColor_B:8
        0xf0, // BackgroundColor_A:8
        0x61, // Text:8
        0x62, // Text:8
        0x0a, // Text:8
        0x63, // Text:8
      ])
      expect(() => { ecodeDecoder.decodeV1(ecode) }).to.throw(Error, 'Illegal format ID 15')
    })
  })
})
