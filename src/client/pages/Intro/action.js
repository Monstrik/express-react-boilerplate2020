/* @flow */
import { type Dispatch } from 'redux';
import { type ApiDataType } from 'types';
import { actionGenerator } from 'utils';
import { requestAction } from 'utils/request';

export const GET_EXCHANGE_RATES = actionGenerator('@@GET_EXCHANGE_RATES');

export const getExchangeRatesAction = () => (dispatch: Dispatch) =>
  dispatch(
    requestAction({
      url: 'https://api.coinbase.com/v2/exchange-rates',
      method: 'GET',
      label: GET_EXCHANGE_RATES.NAME,
      params: {},
      onSuccess: ({ data }: ApiDataType) => {
        dispatch({ type: GET_EXCHANGE_RATES.SUCCESS, payload: data });
      },
      onError: ({ error }: ApiDataType) => {
        dispatch({ type: GET_EXCHANGE_RATES.ERROR, payload: error });
      },
    }),
  );
