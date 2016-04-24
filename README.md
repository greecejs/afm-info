# afm-info [![npm version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

> Retrieve information about a Greek tax registration number (AFM).

> Λήψη πληροφοριών σχετικών με ένα ΑΦΜ.

Client to retrieve information related to a Greek tax registration number using
a [web service](http://gsis.gr/gsis/info/gsis_site/PublicIssue/wnsp/wnsp_pages/wnsp.html) by the Greek Ministry of Finance. Instructions on how to create an account needed to use the service, terms of use, etc can be found on their [site]((http://gsis.gr/gsis/info/gsis_site/PublicIssue/wnsp/wnsp_pages/wnsp.html)) (in Greek language only).

## Installation

```sh
npm install afm-info
```

## Usage

```js
const AfmInfo = require('afm-info');

// Last param is the AFM you make requests on behalf of.
const afmInfo = new AfmInfo('USERNAME', 'PASSWORD', '123456789');

// Get service version.
afmInfo.version()
  .then(console.log)
  .catch(console.error);
//> { result: 'Version: 3.1.0, 11/04/2014,...}

// Get info about a particular AFM.
afmInfo.info('090000045')
  .then(data => console.dir(data, {depth: null}))
  .catch(console.error);
//> {
//    RgWsPublicBasicRt_out: {
//      afm: '090000045',
//      postalAddressNo: '30',
//      doyDescr: 'Φ.Α.Ε. ΑΘΗΝΩΝ',
//      doy: '1159',
//      onomasia: 'ΔΗΜΟΣΙΑ ΕΠΙΧΕΙΡΗΣΗ ΗΛΕΚΤΡΙΣΜΟΥ ΑΝΩΝΥΜΗ ΕΤΑΙΡΙΑ',
//      legalStatusDescr: 'ΑΕ',
//      ...
//  }
```

## License

[MIT](http://opensource.org/licenses/mit-license.php)

[npm-image]: https://img.shields.io/npm/v/afm-info.svg
[npm-url]: https://npmjs.org/package/afm-info
[travis-image]: https://travis-ci.org/greecejs/afm-info.svg?branch=master
[travis-url]: https://travis-ci.org/greecejs/afm-info
