import jsonp from 'jsonp';
import Adapter from './adapter.js';

class Vk extends Adapter {
  static _name = 'vk';

  _scopes = [
    'account',
    'status',
    'friends',
    'offline'
  ];
  
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
  }

  get authUrl() {
    return `https://oauth.vk.com/authorize?` +
           `client_id=${this.clientId}&` +
           `redirect_uri=${this.redirectUrl}&response_type=token` +
           `&scope=${this.scope}`;
  }
  get infoUrl() {
    return `https://api.vk.com/method/users.get?v=5.64` +
           `&access_token=${this._token}` +
           `&fields=${this._userOptions.fields.join(',')}`;
  }
  get friendsUrl() {
    return `https://api.vk.com/method/friends.get?v=5.64` +
           `&access_token=${this._token}` +
           `&fields=${this._userOptions.fields.join(',')},online,relation`;
  }
  get scope() {
    return this._scopes.join(',');
  }

  info() {
    return new Promise((resolve, reject) => {
      jsonp(this.infoUrl, {},
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
    return new Promise((resolve, reject) => {
      jsonp(this.friendsUrl, {},
        (err, data) => {
          if (err)
            reject(err);
          if (!data.response)
            reject('No response');
          if (!data.response.items)
            reject('No items');
          resolve(data.response.items);
        });
    });
  }

}

export default Vk;
