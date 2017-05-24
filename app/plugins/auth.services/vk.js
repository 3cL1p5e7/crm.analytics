import Adapter from './adapter.js';

class Vk extends Adapter {
  static _name = 'vk';

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
  
  _userOptions = {
    fields: [
      'bdate',
      'city',
      'connections',
      'contacts',
      'country',
      'nickname',
      'online',
      'photo_100',
      'photo_200_orig',
      'sex',
      'timezone'
    ]
  }

  constructor(clientId) {
    super(clientId);
    this._build(this._authMask, this);
  }

  get scope() {
    return this._scopes.join(',');
  }

  info() {
    const url = `https://api.vk.com/method/users.get?v=5.64` +
                `&access_token=${this._token}` +
                `&fields=${this._userOptions.fields.join(',')}`
    return new Promise((resolve, reject) => {
      jsonp(url,
        {},
        (err, data) => {
          if (err)
            reject(err);
          if (!data.response)
            reject('No response');
          resolve(data.response[0]);
        });
    });
  }

  friends() {
    const url = `https://api.vk.com/method/friends.get?v=5.64` +
                `&access_token=${this._token}` +
                `&fields=${this._userOptions.fields.join(',')},online,relation`;
    return new Promise((resolve, reject) => {
      jsonp(url,
        {},
        (err, data) => {
          if (err)
            reject(err);
          if (!data.response)
            reject('No response');
          resolve(data.response);
        });
    });
  }

}

export default Vk;
