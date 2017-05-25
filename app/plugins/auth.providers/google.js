import axios from 'axios';
import Adapter from './adapter.js';

class Google extends Adapter {
  static _name = 'google';

  _scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'profile',
    'email',
    'https://www.googleapis.com/auth/glass.location',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.profile',
    // 'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/user.birthday.read'
  ];
  _email = '';

  constructor(clientId) {
    super(clientId);
  }
  
  get authUrl() {
    return `https://accounts.google.com/o/oauth2/v2/auth?` +
           `scope=${this.scope}&include_granted_scopes=true&` +
           `state=state_parameter_passthrough_value` +
           `&redirect_uri=${this.redirectUrl}&response_type=token&` +
           `client_id=${this.clientId}`;
  }
  get infoUrl() {
    return `https://www.googleapis.com/oauth2/v2/userinfo?alt=json` +
           `&access_token=${this._token}`;
  }
  get calendarUrl() {
    return `https://www.googleapis.com/calendar/v3/users/me/calendarList` +
           `?access_token=${this._token}`;
  }
  get eventsUrl() {
    return `https://www.googleapis.com/calendar/v3/calendars/${this._email}` +
           `/events?access_token=${this._token}`;
  }
  get colorsUrl() {
    return `https://www.googleapis.com/calendar/v3/colors` +
           `?access_token=${this._token}`;
  }
  get scope() {
    return this._scopes.join(' ');
  }

  info() {
    return new Promise((resolve, reject) => {
      axios.get(this.infoUrl).then((resp) => {
        console.log(resp);
        if (!resp)
          reject('No response');
        if (!resp.data)
          reject('No response data');
        this._email = resp.data.email;

        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }
  calendar() {
    return new Promise((resolve, reject) => {
      axios.get(this.calendarUrl).then((resp) => {
        console.log(resp);
        if (!resp)
          reject('No response');
        if (!resp.data)
          reject('No response data');
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }
  events() {
    return new Promise((resolve, reject) => {
      axios.get(this.eventsUrl).then((resp) => {
        console.log(resp);
        if (!resp)
          reject('No response');
        if (!resp.data)
          reject('No response data');
        resolve(resp.data.items);
      }).catch(err => {
        reject(err);
      });
    });
  }
}

export default Google;
