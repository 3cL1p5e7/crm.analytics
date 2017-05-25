// https://accounts.google.com/signin/oauth/identifier?client_id=665975295572-squskrm89tvih20e0n276ptpb40dquhn.apps.googleusercontent.com&as=-5a8733cd67b49669&destination=http%3A%2F%2Flocalhost%3A8000&approval_state=!ChRVUXlubkNNWDJURmZ1MGtndlpqVBIfMDVzLUpuSzJKOHdad0Q4c01wTnQ0WVlId2hxdXd4VQ%E2%88%99ADiIGyEAAAAAWSbrh-UR7Ij5QWDZibt9r1UWEX9-Q-iz
// https://api.vk.com/method/friends.getOnline?v=5.52&access_token=04510687a7e9dcc9f55afae615ee3da37ca270d7618bff5d08414c80ecd42dfdba610eba2d670633a1364
// https://oauth.vk.com/authorize?scope=offline,audio,friends&redirect_uri=https://social.yandex.ru/broker/redirect?url=https%253A%252F%252Fsocial.yandex.ru%252Fbroker2%252Ff4496073f2d444659a1bbdf98c7c1255%252Fcallback&response_type=code&client_id=2303446&v=5.59

import { getParamByName } from 'store/utils'
import * as providers from './auth.providers/';

class Authentification {
  _ids = {};
  _token = '';
  _api = {};
  _provider = null;
  
  constructor(ids) {
    this._ids = ids;
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

