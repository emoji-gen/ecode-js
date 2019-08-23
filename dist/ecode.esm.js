/*!
 * ecode-js v0.1.0
 * (c) 2019 Emoji Generator
 * @license MIT
 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var textEncoderLite = createCommonjsModule(function (module) {
  function TextEncoderLite() {}

  function TextDecoderLite() {}

  (function () {
    // Thanks Feross et al! :-)

    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      var i = 0;

      for (; i < length; i++) {
        codePoint = string.charCodeAt(i); // is surrogate component

        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (leadSurrogate) {
            // 2 leads in a row
            if (codePoint < 0xDC00) {
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              leadSurrogate = codePoint;
              continue;
            } else {
              // valid surrogate pair
              codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000;
              leadSurrogate = null;
            }
          } else {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } else {
              // valid lead
              leadSurrogate = codePoint;
              continue;
            }
          }
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = null;
        } // encode utf8


        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x200000) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
          throw new Error('Invalid code point');
        }
      }

      return bytes;
    }

    function utf8Slice(buf, start, end) {
      var res = '';
      var tmp = '';
      end = Math.min(buf.length, end || Infinity);
      start = start || 0;

      for (var i = start; i < end; i++) {
        if (buf[i] <= 0x7F) {
          res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
          tmp = '';
        } else {
          tmp += '%' + buf[i].toString(16);
        }
      }

      return res + decodeUtf8Char(tmp);
    }

    function decodeUtf8Char(str) {
      try {
        return decodeURIComponent(str);
      } catch (err) {
        return String.fromCharCode(0xFFFD); // UTF 8 invalid char
      }
    }

    TextEncoderLite.prototype.encode = function (str) {
      var result;

      if ('undefined' === typeof Uint8Array) {
        result = utf8ToBytes(str);
      } else {
        result = new Uint8Array(utf8ToBytes(str));
      }

      return result;
    };

    TextDecoderLite.prototype.decode = function (bytes) {
      return utf8Slice(bytes, 0, bytes.length);
    };
  })();

  if ( module) {
    module.exports.TextDecoderLite = TextDecoderLite;
    module.exports.TextEncoderLite = TextEncoderLite;
  }
});
var textEncoderLite_1 = textEncoderLite.TextDecoderLite;
var textEncoderLite_2 = textEncoderLite.TextEncoderLite;

var encode = // Uint8Array -> String
typeof window !== 'undefined' && window.btoa === 'function' ? function (data) {
  return window.btoa(String.fromCharCode(Array.prototype.slice.call(data))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
} : function (data) {
  return Buffer.from(data).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};
var decode = // String -> Uint8Array
typeof window !== 'undefined' && window.atob === 'function' ? function (encodedData) {
  return Uint8Array.from(window.atob(encodedData), function (v) {
    return v.charCodeAt(0);
  });
} : function (encodedData) {
  return new Uint8Array(Buffer.from(encodedData, 'base64'));
};
var base64 = {
  encode: encode,
  decode: decode
};

var TextEncoderLite = textEncoderLite.TextEncoderLite;
var V1_HEADER_LENGTH = 12;
var LOCALE_TO_LOCALE_ID = {
  ja: 0,
  kr: 1,
  'zh-hant': 2,
  'zh-hans': 3,
  en: 4
};
var ALIGN_TO_ALIGN_ID = {
  left: 0,
  center: 1,
  right: 2
};
var SIZE_TO_ID = {
  mdpi: 0,
  hdpi: 1,
  xhdpi: 2,
  xxhdpi: 3
};
var FORMAT_TO_ID = {
  png: 0,
  webp: 1
};

var EcodeEncoder =
/*#__PURE__*/
function () {
  function EcodeEncoder() {
    _classCallCheck(this, EcodeEncoder);

    this.textEncoder = new TextEncoderLite();
  }

  _createClass(EcodeEncoder, [{
    key: "encodeV1",
    value: function encodeV1(ecode) {
      var encodedText = this.textEncoder.encode(ecode.text);

      if (encodedText.length === 0) {
        throw new Error('empty string is not allowed');
      }

      var buffer = new Uint8Array(V1_HEADER_LENGTH + encodedText.length);
      var locale = ecode.locale || 'ja';
      var localeId = LOCALE_TO_LOCALE_ID[locale.toLowerCase()];

      if (typeof localeId !== 'number') {
        throw new Error('Illegal locale `' + ecode.locale + '`');
      }

      buffer[0] |= localeId & 0x0f;

      var flags = this._encodeFlagsV1(ecode.flags);

      buffer[1] |= flags << 2 & 0xfc;
      var align = ecode.align || 'left';
      var alignId = ALIGN_TO_ALIGN_ID[align.toLowerCase()];

      if (typeof localeId !== 'number') {
        throw new Error('Illegal locale `' + ecode.align + '`');
      }

      buffer[1] |= alignId & 0x03;
      var size = ecode.size || 'mdpi';
      var sizeId = SIZE_TO_ID[size.toLowerCase()];

      if (typeof sizeId !== 'number') {
        throw new Error('Illegal size `' + ecode.size + '`');
      }

      buffer[2] |= sizeId << 4 & 0xf0;
      var format = ecode.format || 'png';
      var formatId = FORMAT_TO_ID[format.toLowerCase()];

      if (typeof formatId !== 'number') {
        throw new Error('Illegal format `' + ecode.format + '`');
      }

      buffer[2] |= formatId & 0x0f;

      if (typeof ecode.fontId !== 'number') {
        throw new Error('Illegal font ID `' + ecode.fontId + '`');
      }

      buffer[3] |= ecode.fontId & 0xff;

      var foregroundColor = this._encodeColorV1(ecode.foregroundColor, 0x000000FF);

      buffer[4] |= foregroundColor >>> 24 & 0xff;
      buffer[5] |= foregroundColor >>> 16 & 0xff;
      buffer[6] |= foregroundColor >>> 8 & 0xff;
      buffer[7] |= foregroundColor & 0xff;

      var backgroundColor = this._encodeColorV1(ecode.backgroundColor, 0xFFFFFF00);

      buffer[8] |= backgroundColor >>> 24 & 0xff;
      buffer[9] |= backgroundColor >>> 16 & 0xff;
      buffer[10] |= backgroundColor >>> 8 & 0xff;
      buffer[11] |= backgroundColor & 0xff;

      for (var i = 0; i < encodedText.length; ++i) {
        buffer[V1_HEADER_LENGTH + i] = encodedText[i];
      }

      return base64.encode(buffer);
    }
  }, {
    key: "_encodeFlagsV1",
    value: function _encodeFlagsV1(flags) {
      var mask = 0x00;

      if (flags) {
        if (flags.sizeFixed) {
          mask |= 0x01;
        }

        if (flags.stretch) {
          mask |= 0x02;
        }
      }

      return mask;
    }
  }, {
    key: "_encodeColorV1",
    value: function _encodeColorV1(color, defaultColor) {
      if (typeof color === 'number') {
        return color;
      } else if (typeof color === 'string') {
        return parseInt(color.replace(/^#/, ''), 16);
      } else if (!color) {
        return defaultColor;
      }

      throw new Error('Illegal color format `' + color + '`');
    }
  }]);

  return EcodeEncoder;
}();

var ecodeEncoder = EcodeEncoder;

var TextDecoderLite = textEncoderLite.TextDecoderLite;
var V1_HEADER_LENGTH$1 = 12;
var LOCALE_ID_TO_LOCALE_NAME = {
  0: 'ja',
  1: 'kr',
  2: 'zh-Hant',
  3: 'zh-Hans',
  4: 'en'
};
var ALIGN_ID_TO_ALIGN_NAME = {
  0: 'left',
  1: 'center',
  2: 'right'
};
var SIZE_ID_TO_SIZE_NAME = {
  0: 'mdpi',
  1: 'hdpi',
  2: 'xhdpi',
  3: 'xxhdpi'
};
var FORMAT_ID_TO_FORMAT_NAME = {
  0: 'PNG',
  1: 'WebP'
};

var EcodeDecoder =
/*#__PURE__*/
function () {
  function EcodeDecoder() {
    _classCallCheck(this, EcodeDecoder);

    this.textDecoder = new TextDecoderLite();
  }

  _createClass(EcodeDecoder, [{
    key: "decode",
    value: function decode(ecode) {
      var buffer = base64.decode(ecode);

      if (buffer.length <= V1_HEADER_LENGTH$1) {
        throw new Error('Illegal byte length ' + buffer.length);
      }

      var version = (buffer[0] >>> 4 & 0x0f) + 1;

      if (version != 1) {
        throw new Error('Illegal version ' + version);
      }

      var localeId = buffer[0] & 0x0f;
      var localeName = LOCALE_ID_TO_LOCALE_NAME[localeId];

      if (typeof localeName !== 'string') {
        throw new Error('Illegal locale ID ' + localeId);
      }

      var flags = {
        sizeFixed: !!(buffer[1] & 0x04),
        stretch: !!(buffer[1] & 0x08)
      };
      var alignId = buffer[1] & 0x03;
      var alignName = ALIGN_ID_TO_ALIGN_NAME[alignId];

      if (typeof alignName !== 'string') {
        throw new Error('Illegal align ID ' + alignId);
      }

      var sizeId = buffer[2] >>> 4 & 0x0f;
      var sizeName = SIZE_ID_TO_SIZE_NAME[sizeId];

      if (typeof sizeName !== 'string') {
        throw new Error('Illegal size ID ' + sizeId);
      }

      var formatId = buffer[2] & 0x0f;
      var formatName = FORMAT_ID_TO_FORMAT_NAME[formatId];

      if (typeof formatName !== 'string') {
        throw new Error('Illegal format ID ' + formatId);
      }

      var fontId = buffer[3] & 0xff;
      var foregroundColor = ((buffer[4] & 0xff) << 24 | (buffer[5] & 0xff) << 16 | (buffer[6] & 0xff) << 8 | buffer[7] & 0xff) >>> 0;
      var backgroundColor = ((buffer[8] & 0xff) << 24 | (buffer[9] & 0xff) << 16 | (buffer[10] & 0xff) << 8 | buffer[11] & 0xff) >>> 0; // IE 11 does not support `Uint8Array.slice`
      // ref. https://github.com/microsoft/pxt/pull/1223

      var encodedText = Array.prototype.slice.call(buffer, 12);
      var text = this.textDecoder.decode(encodedText);

      if (text.length === 0) {
        throw new Error('Empty string is not allowed');
      }

      return {
        version: version,
        locale: {
          id: localeId,
          name: localeName
        },
        flags: flags,
        align: {
          id: alignId,
          name: alignName
        },
        size: {
          id: sizeId,
          name: sizeName
        },
        format: {
          id: formatId,
          name: formatName
        },
        fontId: fontId,
        foregroundColor: {
          value: foregroundColor,
          hex: foregroundColor.toString(16)
        },
        backgroundColor: {
          value: backgroundColor,
          hex: backgroundColor.toString(16)
        },
        text: text
      };
    }
  }]);

  return EcodeDecoder;
}();

var ecodeDecoder = EcodeDecoder;

var ecodeJs = {
  EcodeEncoder: ecodeEncoder,
  EcodeDecoder: ecodeDecoder
};
var ecodeJs_1 = ecodeJs.EcodeEncoder;
var ecodeJs_2 = ecodeJs.EcodeDecoder;

export default ecodeJs;
export { ecodeJs_2 as EcodeDecoder, ecodeJs_1 as EcodeEncoder };
