import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';
import Shelf from 'components/Shelf';
import Kitchen from '../../lib/kitchen';

class KitchenPage extends Component<{ route: any }> {

  constructor(props) {
    super(props);
    this.state = {
      ordersPerSecond: 2,
      shelf: {
        frozen: [],
        cold: [],
        hot: [],
        overflow: [],
      },
    };
    this.ordersGenerator = null;
    console.clear();
  }

  start() {
    console.clear();
    console.log('START');
    toast.info('START');
    this.ordersGenerator = setInterval(() => this.getNextOrders(), 1000);
  }

  stop() {
    console.log('STOP');
    toast.info('STOP');
    clearInterval(this.ordersGenerator);
  }


  render() {
    const { route: { title } } = this.props;
    const { shelf, ordersPerSecond } = this.state;
    return <Layout title={title}>
      <MdViewer source={`## ${title} `}/>

      <button onClick={() => this.start()}>Start</button>
      <input type={'number'} value={ordersPerSecond} style={{ width: 40 }}
             onChange={(e) => this.setState({ ordersPerSecond: e.target.value })}/>
      <button onClick={() => this.stop()}>Stop</button>
      <br/>See console for logs, refresh to reinitialize orders.
      {shelf && <div>
        <Shelf name={'Hot'} color={'red'} data={shelf.hot} shelfDecayModifier={1}/>
        <Shelf name={'Cold'} color={'green'} data={shelf.cold} shelfDecayModifier={1}/>
        <Shelf name={'Frozen'} color={'blue'} data={shelf.frozen} shelfDecayModifier={1}/>
        <Shelf name={'Overflow'} color={'orange'} data={shelf.overflow} shelfDecayModifier={2}/>
      </div>}

    </Layout>;

  }

  getNextOrders() {
    const { shelf, ordersPerSecond } = this.state;
    const orders = Kitchen.getNextOrders(ordersPerSecond * 1);
    if (orders.length === 0) this.stop();
    orders.forEach(order => {
      let assigned = false;
      const newOrder = {
        ...order,
        created: Date.now(),
      };
      switch (newOrder.temp) {
        case 'frozen':
          if (shelf.frozen.length < 10) {
            shelf.frozen.push(newOrder);
            assigned = true;
          }
          break;
        case 'cold':
          if (shelf.cold.length < 10) {
            shelf.cold.push(newOrder);
            assigned = true;
          }
          break;
        case 'hot':
          if (shelf.hot.length < 10) {
            shelf.hot.push(newOrder);
            assigned = true;
          }
          break;
        default:
          console.error('Invalid order', order);
      }
      if (!assigned) {
        if (shelf.overflow.length < 15) {
          shelf.overflow.push(newOrder);
        } else {
          const logStr = `Wasted ${order.name}`;
          console.log(logStr);
          toast.warn(logStr);
        }
      }
      console.log('New order ready for delivery', newOrder.name);
      this.callForDelivery(newOrder);
    });
    this.setState({ shelf });
  }

  callForDelivery(order) {
    const timeToPickup = Math.floor(Math.random() * 5) + 2;
    console.log('Call for courier:', order.name, 'will arrive in ', timeToPickup, 'sec');
    setTimeout(() => this.deliveryStarted(order), timeToPickup * 1000);
  }

  deliveryStarted(order) {
    const { shelf } = this.state;
    console.log('Courier arrived:', order.name);
    let replaced = false;
    let found = null;
    switch (order.temp) {
      case 'frozen':
        found = shelf.frozen.find(cursor => cursor.id === order.id);
        if (found) {
          shelf.frozen = shelf.frozen.filter(c => c.id !== order.id);
          replaced = true;
        }
        break;
      case 'cold':
        found = shelf.cold.find(cursor => cursor.id === order.id);
        if (found) {
          shelf.cold = shelf.cold.filter(c => c.id !== order.id);
          replaced = true;
        }
        break;
      case 'hot':
        found = shelf.hot.find(cursor => cursor.id === order.id);
        if (found) {
          shelf.hot = shelf.hot.filter(c => c.id !== order.id);
          replaced = true;
        }
        break;
      default:
        console.error('Invalid order', order);
    }
    if (!replaced) {
      found = shelf.overflow.find(cursor => cursor.id === order.id);
      if (found) {
        shelf.overflow = shelf.overflow.filter(c => c.id !== order.id);
        replaced = true;
      }
    }
    if (found && replaced) {
      this.setState({ shelf });
      console.log('Delivered: ', order.name);
      toast.dark(`Delivered: ${ order.name}`);
    } else {
      console.error('order not found on shelf');
    }
  }
}

export default KitchenPage;

