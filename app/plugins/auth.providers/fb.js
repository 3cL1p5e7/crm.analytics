import Adapter from './adapter.js';

class Facebook extends Adapter {

  static get _name () {
    return 'fb';
  }
  static get _scopes () {
    return [
      'account',
      'status',
      'friends',
      'offline'
    ];
  }

  constructor(clientId) {
    super(clientId);
  }

  get authUrl() {
    return `https://oauth.vk.com/authorize?` +
           `client_id=${this.clientId}&` +
           `redirect_uri=${this.redirectUrl}&response_type=token` +
           `&scope=${this.scope}`;
  }
  get scope() {
    return Facebook._scopes.join(',');
  }
}

export default Facebook;
