'use strict'

const { TextDecoderLite } = require('text-encoder-lite')
const base64 = require('./base64')


const V1_HEADER_LENGTH = 12
const LOCALE_ID_TO_LOCALE_NAME = {
  0: 'ja',
  1: 'kr',
  2: 'zh-Hant',
  3: 'zh-Hans',
  4: 'en',
}
const ALIGN_ID_TO_ALIGN_NAME = {
  0: 'left',
  1: 'center',
  2: 'right',
}
const SIZE_ID_TO_SIZE_NAME = {
  0: 'mdpi',
  1: 'hdpi',
  2: 'xhdpi',
  3: 'xxhdpi',
}
const FORMAT_ID_TO_FORMAT_NAME = {
  0: 'png',
  1: 'webp',
}


class EcodeDecoder {
  constructor() {
    this.textDecoder = new TextDecoderLite()
  }

  decodeV1(ecode) {
    const buffer = base64.decode(ecode)
    if (buffer.length <= V1_HEADER_LENGTH) {
      throw new Error('Illegal byte length ' + buffer.length)
    }

    const version = (buffer[0] >>> 4 & 0x0f) + 1
    if (version != 1) {
      throw new Error('Illegal version ' + version)
    }

    const localeId = buffer[0] & 0x0f
    const localeName = LOCALE_ID_TO_LOCALE_NAME[localeId]
    if (typeof localeName !== 'string') {
      throw new Error('Illegal locale ID ' + localeId)
    }

    const flags = {
      sizeFixed: !!(buffer[1] & 0x04),
      stretch: !!(buffer[1] & 0x08),
    }

    const alignId = buffer[1] & 0x03
    const alignName = ALIGN_ID_TO_ALIGN_NAME[alignId]
    if (typeof alignName !== 'string') {
      throw new Error('Illegal align ID ' + alignId)
    }

    const sizeId = buffer[2] >>> 4 & 0x0f
    const sizeName = SIZE_ID_TO_SIZE_NAME[sizeId]
    if (typeof sizeName !== 'string') {
      throw new Error('Illegal size ID ' + sizeId)
    }

    const formatId = buffer[2] & 0x0f
    const formatName = FORMAT_ID_TO_FORMAT_NAME[formatId]
    if (typeof formatName !== 'string') {
      throw new Error('Illegal format ID ' + formatId)
    }

    const fontId = buffer[3] & 0xff
    const foregroundColor =
      ((buffer[4] & 0xff) << 24 | (buffer[5] & 0xff) << 16 |
      (buffer[6] & 0xff) << 8 | buffer[7] & 0xff) >>> 0
    const backgroundColor =
      ((buffer[8] & 0xff) << 24 | (buffer[9] & 0xff) << 16 |
      (buffer[10] & 0xff) << 8 | buffer[11] & 0xff) >>> 0

    // IE 11 does not support `Uint8Array.slice`
    // ref. https://github.com/microsoft/pxt/pull/1223
    const encodedText = Array.prototype.slice.call(buffer, 12)
    const text = this.textDecoder.decode(encodedText)

    return {
      version,
      locale: localeName,
      flags,
      align: alignName,
      size: sizeName,
      format: formatName,
      fontId,
      foregroundColor: {
        value: foregroundColor,
        hex: foregroundColor.toString(16),
      },
      backgroundColor: {
        value: backgroundColor,
        hex: backgroundColor.toString(16),
      },
      text,
    }
  }
}


module.exports = EcodeDecoder
