import React from 'react';

const Change = (pair) => {
  const sell = pair.value.s ? pair.value.s.join(' - ') : '';
  const buy = pair.value.b ? pair.value.b.join(' - ') : '';
  return <div key={pair.name}>
    <b>|{pair.name}:</b>
    <div style={{ color: 'red' }}>|{sell.toUpperCase()}</div>
    <div style={{ color: 'green' }}>|{buy.toUpperCase()}</div>
    <hr/>
  </div>;
};

export default Change;
