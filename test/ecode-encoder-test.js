'use strict'

const { expect } = require('chai')
const { EcodeEncoder } = require('..')

describe('EcodeEncoder', () => {
  describe('encodeV1', () => {
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

      const buffer = [...Buffer.from(ecode, 'base64')]
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
  })
})
