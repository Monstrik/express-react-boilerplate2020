import React from 'react';

const ExchangeRate = (pair) => {

  return <div key={pair.name}>
    | <b>{pair.name} - {pair.value}</b> |
  </div>;

};

export default ExchangeRate;
