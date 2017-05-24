import Adapter from './adapter.js';

class Facebook extends Adapter {
  static _name = 'fb';

  _scopes = [
    'account',
    'status',
    'friends',
    'offline'
  ];
  _authMask = `https://oauth.vk.com/authorize?` +
  `client_id={clientId}&` +
  `redirect_uri={redirectUrl}&response_type=token` +
  `&scope={scope}`;

  constructor(clientId) {
    super(clientId);
    this._build(this._authMask, this);
  }

  get scope() {
    return this._scopes.join(',');
  }
}

export default Facebook;
