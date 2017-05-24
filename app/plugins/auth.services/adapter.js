import { getParamByName } from 'store/utils';

class Adapter {
  _options = {
    escape: /{([\s\S]+?)}/g
  }
  _clientId = null;
  _redirectUrl = `${window.location.origin}/auth`;
  _authUrl = '';
  _tokenKey = 'access_token';
  _token = null;

  constructor(clientId) {
    if (!clientId)
      throw 'Client ID is not defined';
    this._clientId = clientId;
  }

  get clientId() {
    return this._clientId;
  }
  get redirectUrl() {
    return this._redirectUrl;
  }
  get authUrl() {
    return this._authUrl;
  }

  _build(mask, target) {
    this._authUrl = mask.replace(this._options.escape, (match, dec) => {
      if (typeof target[dec] === 'undefined' || target[dec] === null)
        throw `Parameter ${dec} is not defined. Check your auth mask`;
      return target[dec] + '';
    });
  }

  auth() {
    const params = {
      target: '_blank',
      width: 400,
      height: 400
    };
    params.left = window.screenX + window.innerWidth / 2 -
                  (params.width || 0) / 2;
    params.top = window.screenY + window.innerHeight / 2 -
                  (params.height || 0) / 2;

    const paramStr = Object.keys(params).reduce((acc, rec) => {
      acc.push(`${rec}=${params[rec]}`);
      return acc;
    }, []);

    return new Promise((resolve) => {
      window.parentHandler = (href) => {
        this._token = getParamByName(this._tokenKey, href);
        if (!this._token)
          reject('No received token');
        resolve();
      };
      window.open(this._authUrl, 'auth', paramStr.join(','));
    });
  }


  info() {
    return new Promise((resolve, reject) => {
      reject('Method did not implemented');
    });
  }

  friends() {
    return new Promise((resolve, reject) => {
      reject('Method did not implemented');
    });
  }
}
export default Adapter;