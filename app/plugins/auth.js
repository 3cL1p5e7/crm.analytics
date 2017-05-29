import * as providers from './auth.providers/';

class Authentification {
  constructor(ids) {
    this._ids = ids;
    this._token = '';
    this._api = {};
    this._provider = null;
  }

  get provider() {
    return this._provider;
  }
  
  auth(type) {
    const providerClass = Object.values(providers).find(provider => provider._name === type);
    if (!providerClass)
      return new Promise(reject => reject('No such social authorizer'));
    this._provider = new providerClass(this._ids[type]);
    return this._provider.auth();
  }

  
}
const auth = new Authentification({
  vk: 6043892, // 6043892 stand 6044879
  google: '665975295572-squskrm89tvih20e0n276ptpb40dquhn.apps.googleusercontent.com'
}); 
export default auth;

