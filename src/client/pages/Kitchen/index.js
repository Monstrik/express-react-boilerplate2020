import React, { Component } from 'react';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';
import { connect } from 'react-redux';
import Kitchen from '../../lib/kitchen';

class KitchenPage extends Component<{ route: any }> {


  constructor(props) {
    super(props);
    this.state = {
      shelf: {
        frozen: [],
        cold: [],
        hot: [],
        overflow: [],
      },
    };
    this.ordersGenerator = null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  start() {
    console.log('START');
    this.ordersGenerator = setInterval(() => {
      this.getNextOrder();
    }, 1000);
  }

  stop() {
    console.log('STOP');
    clearInterval(this.ordersGenerator);
  }

  getNextOrder() {
    const orders = Kitchen.getNextOrders(2);
    console.log(orders);
    const { shelf = {} } = this.state;
    orders.forEach(order => {
      let assigned = false;
      switch (order.temp) {
        case 'frozen':
          if (shelf.frozen.length < 10) {
            shelf.frozen.push({ ...order });
            assigned = true;
          }
          break;
        case 'cold':
          if (shelf.cold.length < 10) {
            shelf.cold.push({ ...order });
            assigned = true;
          }
          break;
        case 'hot':
          if (shelf.hot.length < 10) {
            shelf.hot.push({ ...order });
            assigned = true;
          }
          break;
        default:
          console.error('Invalid order', order);
      }
      if (!assigned) {
        if (shelf.overflow.length < 15) {
          shelf.overflow.push({ ...order });
        } else {
          // TODO: assign somewhere
        }
      }
      console.log(shelf);
      this.setState({ shelf });
    });

  }

  render() {
    const { route: { title } } = this.props;
    const { shelf = {} } = this.state;
    return <Layout title={title}>
      <MdViewer source={`## ${title} `}/>

      <button onClick={() => this.start()}> Start</button>
      <button onClick={() => this.stop()}>Stop</button>
      {shelf && <div>
        <hr/>
        Shelf: <strong></strong>
        <br/>
        Hot: {shelf.hot.length}
        <br/>
        Cold: {shelf.cold.length}
        <br/>
        Frozen: {shelf.frozen.length}
        <br/>
        Overflow: {shelf.overflow.length}
        <br/>

        {/*{Object.keys(changes).map(key => <Change key={key} name={key} value={changes[key]}/>)}*/}
      </div>}

    </Layout>;

  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(KitchenPage);

