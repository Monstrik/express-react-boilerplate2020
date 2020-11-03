import React from 'react';

function getOrderAge(created) {
  return Math.round((Date.now() - created) / 1000);
}

const Shelf = (shelfData) => {
  const { name, color, data, shelfDecayModifier } = shelfData;
  return <div key={name} style={{ height: 120 }}>
    <br/>
    <div style={{ color: color }}>
      <b>{`|| ${name}: [ ${data.length} ] `}</b>
    </div>
    <div style={{ fontSize: 14 }}>
      {data.map(item => {
        const v = Math.round(item.shelfLife - item.decayRate * getOrderAge(item.created) * shelfDecayModifier);
        return <span key={item.id}>
          {item.name}&nbsp;
          <span style={{ fontSize: 7 }}>({v})</span>,&nbsp;&nbsp;
        </span>;
      })}
    </div>

  </div>;
};

export default Shelf;
