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
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/user.birthday.read'
  ];
  _authMask = `https://accounts.google.com/o/oauth2/v2/auth?` +
              `scope={scope}&include_granted_scopes=true&` +
              `state=state_parameter_passthrough_value` +
              `&redirect_uri={redirectUrl}&response_type=token&` +
              `client_id={clientId}`;

  constructor(clientId) {
    super(clientId);
    this._build(this._authMask, this);
  }
  
  get scope() {
    return this._scopes.join(' ');
  }
}

export default Google;
