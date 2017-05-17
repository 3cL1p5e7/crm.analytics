import { attachReducers } from 'store/utils';
import {
  SET_PARAM
} from './actions.js';

const defaultState = {
  params: {
  }
};

const reducers = {
  [SET_PARAM]: (state, { name, value }) => {
    return { params: { ...state.params, [name]: value } };
  }
};

export default attachReducers(reducers, defaultState);
