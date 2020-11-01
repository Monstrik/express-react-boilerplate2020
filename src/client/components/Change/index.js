import React from 'react';

const Change = (pair) => {

  return <div key={pair.name}>
    | <b>{pair.name}: {pair.value}</b> |
  </div>;

};

export default Change;
