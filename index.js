'use strict';

const path = require('path');

/* eslint-disable no-shadow */
const Promise = require('bluebird');

/* eslint-enable no-shadow */

const soap = require('soap');

Promise.promisifyAll(soap);

/** Afm info web service client class. */
class AfmInfo {

  /**
   * AfmInfo class constructor.
   *
   * @param {string} username Username to authenticate to the service.
   * @param {string} password Password to authenticate to the service.
   * @param {string} afmCalledBy The AFM to use the service on behalf of.
   * @return {void}
   */
  constructor(username, password, afmCalledBy) {
    this.username = username;
    this.password = password;
    this.afmCalledBy = afmCalledBy;
    this.soapClient = null;
  }

  /**
  * Get the SOAP client.
  *
  * @return {Promise} The SOAP client.
  */
  _getSoapClient() {
    if (this.soapClient) {
      return Promise.resolve(this.soapClient);
    }
    return soap.createClientAsync(path.join(__dirname, 'wsdl.xml'))
      .then(client => {
        Promise.promisifyAll(client);
        client.setSecurity(new soap.WSSecurity(this.username, this.password));
        this.soapClient = client;
        return this.soapClient;
      });
  }

  /**
   * Request the web service version information.
   *
   * @return {object} The web service version information.
   */
  version() {
    return this._getSoapClient()
      .then(client => client.rgWsPublicVersionInfoAsync(null));
  }

  /**
   * Request info for an AFM from the service.
   *
   * @param {string} afmCalledFor AFM to get informatin about.
   * @return {object} The information about the requested AFM.
   */
  info(afmCalledFor) {
    return this._getSoapClient()
      .then(client => {
        /* eslint-disable camelcase */
        const args = {
          RgWsPublicInputRt_in: {
            afmCalledBy: this.afmCalledBy,
            afmCalledFor,
          },
          RgWsPublicBasicRt_out: {},
          arrayOfRgWsPublicFirmActRt_out: {},
          pCallSeqId_out: 0,
          pErrorRec_out: {},
        };

        /* eslint-enable camelcase */

        return client.rgWsPublicAfmMethodAsync(args);
      });
  }

}

module.exports = AfmInfo;
