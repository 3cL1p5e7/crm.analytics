// https://api.vk.com/method/friends.getOnline?v=5.52&access_token=04510687a7e9dcc9f55afae615ee3da37ca270d7618bff5d08414c80ecd42dfdba610eba2d670633a1364
// https://oauth.vk.com/authorize?scope=offline,audio,friends&redirect_uri=https://social.yandex.ru/broker/redirect?url=https%253A%252F%252Fsocial.yandex.ru%252Fbroker2%252Ff4496073f2d444659a1bbdf98c7c1255%252Fcallback&response_type=code&client_id=2303446&v=5.59
import jsonp from 'jsonp';
import { getParamByName } from 'store/utils'

class SocialAuthentification {
  _ids = {};
  _token = '';
  _api = {};
  constructor(ids) {
    this._ids = ids;
  }
  get api () {
    return this._api;
  }
  get vk() {
    return {
      url: `https://oauth.vk.com/authorize?` +
           `client_id=${this._ids.vk}&` +
           `redirect_uri=${window.location.origin}/auth&response_type=token` +
           `&scope=account,status,friends,offline`,
      key: 'access_token',
      api: {
        profile: () => {
          return new Promise((resolve, reject) => {
            jsonp(`https://api.vk.com/method/users.get?v=5.64&access_token=${this._token}&` +
            `fields=bdate,city,connections,contacts,country,nickname,online,photo_100,photo_max_orig,sex,timezone`,
              {},
              (err, data) => {
                if (err)
                  reject(err);
                if (!data.response)
                  reject('No response');
                resolve(data.response[0]);
              });
          });
        },
        friends: () => {
          return new Promise((resolve, reject) => {
            jsonp(`https://api.vk.com/method/friends.get?v=5.64&access_token=${this._token}&` +
            `fields=nickname,sex,bdate,city,country,timezone,photo_100,photo_200_orig,contacts,online,relation`,
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
    };
  }
  get google() {
    return {
      url: `https://oauth.vk.com/authorize?` +
           `client_id=${this._ids.vk}&` +
           `redirect_uri=${window.location.origin}/auth&response_type=token` +
           `&scope=friends`,
      key: 'access_token'
    };
  }
  get fb() {
    return {
      url: `https://oauth.vk.com/authorize?` +
           `client_id=${this._ids.vk}&` +
           `redirect_uri=${window.location.origin}/auth&response_type=token` +
           `&scope=friends`,
      key: 'access_token'
    };
  }
  open(type) {
    if (!this[type])
      return new Promise(resolve => resolve());
    const params = {
      target: '_blank',
      width: 400,
      height: 400
    };
    params.left = window.screenX + window.innerWidth / 2 - (params.width || 0) / 2;
    params.top = window.screenY + window.innerHeight / 2 - (params.height || 0) / 2;

    const paramStr = Object.keys(params).reduce((acc, rec) => {
      acc.push(`${rec}=${params[rec]}`);
      return acc;
    }, []);

    return new Promise((resolve) => {
      window.parentHandler = (href) => {
        this._token = getParamByName(this[type].key, href);
        if (this._token)
          this._api = this[type].api;
        resolve();
      };
      window.open(this[type].url, 'auth', paramStr.join(','));
    });
  }
}
const auth = new SocialAuthentification({ vk: 6043892 }); // 6043892 stand 6044879
export default auth;

