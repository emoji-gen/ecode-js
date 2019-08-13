'use strict'

const Base64 = require('./base64')


// --------------------------------------------------------
// Enum definitions
// --------------------------------------------------------

const V1_HEADER_LENGTH = 12
const LOCALE_ID_TO_LOCALE = {
  0: 'ja',
  1: 'kr',
  2: 'zh-Hant',
  3: 'zh-Hans',
  4: 'en',
}
const ALIGN_ID_TO_ALIGN = {
  0: 'left',
  1: 'center',
  2: 'right',
}
const SIZE_ID_TO_SIZE = {
  0: 'mdpi',
  1: 'hdpi',
  2: 'xhdpi',
  3: 'xxhdpi',
}
const FORMAT_ID_TO_FORMAT = {
  0: 'PNG',
  1: 'WebP',
}


// --------------------------------------------------------
// EcodeDecoder
// --------------------------------------------------------

class EcodeDecoder {
  decode(ecode) {
    const buffer = Base64.decode(ecode)
    if (buffer.length <= V1_HEADER_LENGTH) {
      return new Error('Illegal byte length ' + buffer.length)
    }

    const version = (buffer[0] >>> 4 & 0x0f) + 1
    if (version != 1) {
      throw new Error('Illegal ecode version ' + version)
    }

    const localeId = buffer[0] & 0x0f
    const locale = LOCALE_ID_TO_LOCALE[localeId]
    if (typeof locale !== 'string') {
      throw new Error('Illegal locale ID ' + localeId)
    }

    const flags = {
      sizeFixed: !!(buffer[1] & 0x40),
      stretch: !!(buffer[1] & 0x08),
    }

    const alignId = buffer[1] & 0x03
    const align = ALIGN_ID_TO_ALIGN[alignId]
    if (typeof align !== 'string') {
      throw new Error('Illegal align ID ' + alignId)
    }

    const sizeId = buffer[2] >>> 4 & 0x0f
    const size = SIZE_ID_TO_SIZE[sizeId]
    if (typeof size !== 'string') {
      throw new Error('Illegal size ID ' + sizeId)
    }

    const formatId = buffer[2] & 0x0f
    const format = FORMAT_ID_TO_FORMAT[formatId]
    if (typeof format !== 'string') {
      throw new Error('Illegal format ID ' + formatId)
    }

    return {
      version,
      locale,
      flags,
      align,
      size,
      format,
    }
  }
}


// --------------------------------------------------------

module.exports = EcodeDecoder
