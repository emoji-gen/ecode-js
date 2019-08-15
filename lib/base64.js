'use strict'


// --------------------------------------------------------
// Encode
// --------------------------------------------------------

const encode =
  typeof window !== 'undefined' && window.btoa === 'function' ?
    data => window.btoa(String.fromCharCode(...data))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '') :
    data => Buffer.from(data).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')


// --------------------------------------------------------
// Decode
// --------------------------------------------------------

const decode =
  typeof window !== 'undefined' && window.atob === 'function' ?
    encodedData => Uint8Array.from(window.atob(encodedData), v => v.charCodeAt(0)) :
    encodedData => new Uint8Array(Buffer.from(encodedData, 'base64'))


// --------------------------------------------------------

module.exports = {
  encode,
  decode,
}
