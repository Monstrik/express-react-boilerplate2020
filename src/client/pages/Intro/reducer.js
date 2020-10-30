/* @flow */
import { combineReducers } from 'redux';
import { type ActionType } from 'types';
import { GET_EXCHANGE_RATES } from './action';

const initialState = {
  // ratesData: null,
  // error: null,
};

const ratesData = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_EXCHANGE_RATES.SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_EXCHANGE_RATES.ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return { ...state };
  }
};

export default combineReducers({ ratesData });
