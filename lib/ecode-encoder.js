'use strict'

const { TextEncoderLite } = require('text-encoder-lite')
const base64 = require('./base64')


// --------------------------------------------------------
// Enum definitions
// --------------------------------------------------------

const V1_HEADER_LENGTH = 12
const LOCALE_TO_LOCALE_ID = {
  ja: 0,
  kr: 1,
  'zh-hant': 2,
  'zh-hans': 3,
  en: 4,
}
const ALIGN_TO_ALIGN_ID = {
  left: 0,
  center: 1,
  right: 2,
}
const SIZE_TO_ID = {
  mdpi: 0,
  hdpi: 1,
  xhdpi: 2,
  xxhdpi: 3,
}
const FORMAT_TO_ID = {
  png: 0,
  webp: 1,
}


// --------------------------------------------------------
// EcodeEncoder
// --------------------------------------------------------

class EcodeEncoder {
  constructor() {
    this.textEncoder = new TextEncoderLite()
  }

  encodeV1(ecode) {
    const encodedText = this.textEncoder.encode(ecode.text)
    if (encodedText.length === 0) {
      throw new Error('empty string is not allowed')
    }

    const buffer = new Uint8Array(V1_HEADER_LENGTH + encodedText.length)
    const locale = ecode.locale || 'ja'
    const localeId = LOCALE_TO_LOCALE_ID[locale.toLowerCase()]
    if (typeof localeId !== 'number') {
      throw new Error('Illegal locale `' + ecode.locale + '`')
    }
    buffer[0] |= localeId & 0x0f

    var flags = this._encodeFlagsV1(ecode.flags)
    buffer[1] |= flags << 2 & 0xfc

    var align = ecode.align || 'left'
    var alignId = ALIGN_TO_ALIGN_ID[align.toLowerCase()]
    if (typeof localeId !== 'number') {
      throw new Error('Illegal locale `' + ecode.align + '`')
    }
    buffer[1] |= alignId & 0x03

    var size = ecode.size || 'mdpi'
    var sizeId = SIZE_TO_ID[size.toLowerCase()]
    if (typeof sizeId !== 'number') {
      throw new Error('Illegal size `' + ecode.size + '`')
    }
    buffer[2] |= sizeId << 4 & 0xf0

    var format = ecode.format || 'png'
    var formatId = FORMAT_TO_ID[format.toLowerCase()]
    if (typeof formatId !== 'number') {
      throw new Error('Illegal format `' + ecode.format + '`')
    }
    buffer[2] |= formatId & 0x0f

    if (typeof ecode.fontId !== 'number') {
      throw new Error('Illegal font ID `' + ecode.fontId + '`')
    }
    buffer[3] |= ecode.fontId & 0xff

    var foregroundColor = this._encodeColorV1(ecode.foregroundColor, 0x000000FF)
    buffer[4] |= foregroundColor >>> 24 & 0xff
    buffer[5] |= foregroundColor >>> 16 & 0xff
    buffer[6] |= foregroundColor >>> 8 & 0xff
    buffer[7] |= foregroundColor & 0xff

    var backgroundColor = this._encodeColorV1(ecode.backgroundColor, 0xFFFFFF00)
    buffer[8] |= backgroundColor >>> 24 & 0xff
    buffer[9] |= backgroundColor >>> 16 & 0xff
    buffer[10] |= backgroundColor >>> 8 & 0xff
    buffer[11] |= backgroundColor & 0xff

    for (let i = 0; i < encodedText.length; ++i) {
      buffer[V1_HEADER_LENGTH + i] = encodedText[i]
    }

    return base64.encode(buffer)
  }

  _encodeFlagsV1(flags) {
    let mask = 0x00
    if (flags) {
      if (flags.sizeFixed) {
        mask |= 0x01;
      }
      if (flags.stretch) {
        mask |= 0x02;
      }
    }
    return mask
  }

  _encodeColorV1(color, defaultColor) {
    if (typeof color === 'number') {
      return color
    } else if (typeof color === 'string') {
      return parseInt(color.replace(/^#/, ''), 16)
    } else if(!color) {
      return defaultColor
    }
    throw new Error('Illegal color format `' + color + '`')
  }
}


// --------------------------------------------------------

module.exports = EcodeEncoder
