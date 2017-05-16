import {
  REGISTER,
  LOG_IN,
  EXIT
} from './actions.js';

const defaultState = {
  logged: true,
  user: {
    id: '777',
    firstname: 'Boss',
    lastname: 'Big Russian',
    // avatar: 'http://s1.picswalls.com/wallpapers/2016/06/10/4k-desktop-wallpaper_065227602_309.jpg',
    avatar: 'https://www.2do2go.ru/uploads/c799d11d6748abff308c893ea2f12bf5.jpg',
    // avatar: 'https://secure.gravatar.com/avatar/c6429cf88944692f273901101ab82b17?s=160&d=retro&r=pg',
    groups: {
    }
  }
};

const reducers = {
  [REGISTER]: (state, { id, name, avatar, logged }) => {
    return {
      logged,
      user: {
        ...state.user
      }
    };
  },
  [LOG_IN]: (state, payload) => {
    return {
      logged: true,
      user: {
        ...payload
      }
    };
  },
  [EXIT]: (state) => {
    return {
      logged: false,
      user: {}
    };
  },
};

export default function profile(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action) };
  return state;
}
