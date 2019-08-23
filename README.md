# ecode-js
[![Build Status](https://travis-ci.org/emoji-gen/ecode-js.svg?branch=master)](https://travis-ci.org/emoji-gen/ecode-js)
[![Build status](https://ci.appveyor.com/api/projects/status/4i9qw1phn1x8jl4c/branch/master?svg=true)](https://ci.appveyor.com/project/pine/ecode-js/branch/master)
[![dependencies Status](https://david-dm.org/emoji-gen/ecode-js/status.svg)](https://david-dm.org/emoji-gen/ecode-js)
[![devDependencies Status](https://david-dm.org/emoji-gen/ecode-js/dev-status.svg)](https://david-dm.org/emoji-gen/ecode-js?type=dev)
[![codecov](https://codecov.io/gh/emoji-gen/ecode-js/branch/master/graph/badge.svg)](https://codecov.io/gh/emoji-gen/ecode-js)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=green)](https://opensource.org/licenses/MIT)

> :musical_score: The emoji code utilities for JavaScript


## Requirements
- Node v10 or later
- Modern browsers
  - Internet Explorer 11 is supported

## Getting started

```bash
$ yarn add @emoji-gen/ecode           # for Yarn users
$ npm install @emoji-gen/ecode --save # for NPM users
```

## Usage
### EcodeEncoder

```js
const { EcodeEncoder } = require('@emoji-gen/ecode')

const ecodeEncoder = new EcodeEncoder()
const ecode = ecodeDecoder.encode({

})

console.log(ecode)
// =>
```

### EcodeDecoder

```js
const { EcodeDecoder } = require('@emoji-gen/ecode')

const ecodeDecoder = new EcodeDecoder()
const ecode = ecodeDecoder.decode('BA0hzxI0VniavN7wYWIKYw')

console.log(ecode)
// => {
//      version: 1,
//      locale: 'en',
//      flags: {
//         sizeFixed: false,
//         stretch: true
//      },
//      align: 'center',
//      size: 'xhdpi',
//      format: 'WebP',
//      fontId: 207,
//      foregroundColor: {
//        value: 305419896,
//        hex: '12345678'
//      },
//      backgroundColor: {
//        value: 2596069104,
//        hex: '9abcdef0'
//      },
//      text: 'ab\nc'
//    }
```

## Development
### Test

```bash
$ yarn test
```

### Build

```bash
$ yarn run build
```

## License
MIT &copy; [Emoji Generator](https://emoji-gen.ninja)
