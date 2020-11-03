import ordersData from '../data/orders';

const getOrders = () => {
  return ordersData;
};

//
// function* getNextOrders(count) {
//   const length = 100;
//   let cursor = 0;
//   while (true) {
//     cursor += count;
//     yield cursor;
//   }
// }

let cursor = 0;

function getNextOrders(count) {
  // const length = ordersData.length;
  const returnArr = ordersData.slice(cursor, cursor + count);
  cursor += count;
  return returnArr;
}


const Kitchen = {
  getOrders,
  getNextOrders,
};

export default Kitchen;



