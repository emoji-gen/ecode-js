'use strict'

const { expect } = require('chai')
const assign = require('lodash.assign')
const { EcodeEncoder } = require('../index')
const base64 = require('../lib/base64')

describe('EcodeEncoder', () => {
  describe('encodeV1', () => {
    const TEMPLATE = {
      locale: 'en',
      flags: {
        sizeFixed: true,
        stretch: true,
      },
      align: 'center',
      size: 'xhdpi',
      format: 'webp',
      fontId: 0xcf,
      foregroundColor: 0x12345678,
      backgroundColor: 0x9abcdef0,
      text: 'ab\nc',
    }

    it('should encode ecode', () => {
      const ecodeEncoder = new EcodeEncoder()
      const ecode = ecodeEncoder.encodeV1({
        locale: 'en',
        flags: {
          sizeFixed: true,
          stretch: true,
        },
        align: 'center',
        size: 'xhdpi',
        format: 'webp',
        fontId: 0xcf,
        foregroundColor: 0x12345678,
        backgroundColor: 0x9abcdef0,
        text: 'ab\nc',
      })

      console.log('code=' + ecode) // => 'BA0hzxI0VniavN7wYWIKYw'

      const buffer = Array.prototype.slice.call(base64.decode(ecode))
      expect(buffer).to.deep.equals([
        0x04, // Version:4, Locale:4
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
    })

    it('should fail to encode ecode due to empty string', () => {
      const ecodeEncoder = new EcodeEncoder()
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
            text: '',
          }))
      }).to.throw(Error, 'empty string is not allowed')
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
            text: null,
          }))
      }).to.throw(Error, 'empty string is not allowed')
    })

    it('should fail to encode ecode due to illegal locale name', () => {
      const ecodeEncoder = new EcodeEncoder()
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
            locale: 'XXX',
          }))
      }).to.throw(Error, 'Illegal locale name : XXX')
    })

    it('should fail to encode ecode due to illegal align name', () => {
      const ecodeEncoder = new EcodeEncoder()
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
           align: 'XXX',
          }))
      }).to.throw(Error, 'Illegal align name : XXX')
    })

    it('should fail to encode ecode due to illegal size name', () => {
      const ecodeEncoder = new EcodeEncoder()
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
           size: 'XXX',
          }))
      }).to.throw(Error, 'Illegal size name : XXX')
    })

    it('should fail to encode ecode due to illegal format name', () => {
      const ecodeEncoder = new EcodeEncoder()
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
           format: 'XXX',
          }))
      }).to.throw(Error, 'Illegal format name : XXX')
    })

    it('should fail to encode ecode due to illegal font ID', () => {
      const ecodeEncoder = new EcodeEncoder()
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
           fontId: 0x0100,
          }))
      }).to.throw(Error, 'Illegal font ID : 256')
      expect(() => {
        ecodeEncoder.encodeV1(
          assign({}, TEMPLATE, {
           fontId: 'XXX',
          }))
      }).to.throw(Error, 'Illegal font ID : XXX')
    })
  })
})
