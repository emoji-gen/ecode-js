'use strict'


const encode = // Uint8Array -> String
  typeof window !== 'undefined' && window.btoa === 'function' ?
    data => window.btoa(String.fromCharCode(Array.prototype.slice.call(data)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '') :
    data => Buffer.from(data).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')


const decode = // String -> Uint8Array
  typeof window !== 'undefined' && window.atob === 'function' ?
    encodedData => new Uint8Array(
      Array.prototype.map.call(
        window.atob(encodedData), v => v.charCodeAt(0))) :
    encodedData => new Uint8Array(Buffer.from(encodedData, 'base64'))


module.exports = {
  encode,
  decode,
}
