import React, { useEffect, Component } from 'react';
import Websocket from 'react-websocket';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';
import { connect } from 'react-redux';
import Change from 'components/Change';


const PRODUCT_IDS = ['BTC-USD', 'ETH-USD', 'XRP-USD', 'LTC-USD'];

class WebSocket extends Component<{ route: any, ratesData: any, getExchangeRatesAction: any }> {

  constructor(props) {
    super(props);
    this.state = { changes: {} };
  }

  componentDidMount() {
    console.log('componentDidMount');
  }


  subscribe() {
    const msg = {
      'type': 'subscribe',
      'product_ids': PRODUCT_IDS,
      'channels': [
        'level2',
        {
          'name': 'ticker',
          'product_ids': PRODUCT_IDS,
        },
      ],
    };
    console.log('subscribe data', msg);
    this.refWebSocket.sendMessage(JSON.stringify(msg));
  }

  unsubscribe() {
    const msg = {
      'type': 'unsubscribe',
      'product_ids': PRODUCT_IDS,
      'channels': [
        'level2',
        'heartbeat',
        {
          'name': 'ticker',
          'product_ids': PRODUCT_IDS,
        },
      ],
    };
    console.log('unsubscribe', msg);
    this.refWebSocket.sendMessage(JSON.stringify(msg));
  }

  handleData(dataStr) {
    const data = JSON.parse(dataStr);
    console.log('handleData', data);


    if (data.type === 'l2update') {
      const newChange = { ...this.state.changes };
      if (!newChange[data.product_id]) newChange[data.product_id] = {};
      if (data.changes[0][0] === 'sell') newChange[data.product_id].s = data.changes[0];
      if (data.changes[0][0] === 'buy') newChange[data.product_id].b = data.changes[0];
      this.setState({ changes: { ...newChange } });
    }

  }

  render() {
    const { route: { title } } = this.props;
    const { changes } = this.state;
    console.log('render changes', changes);
    return <Layout title={title}>
      <MdViewer source={`## ${title} `}/>

      <button onClick={() => this.subscribe()}>Start</button>
      <button onClick={() => this.unsubscribe()}>Stop</button>
      <hr/>
      Changes: <strong>
      {Object.keys(changes).map(key => <Change key={key} name={key} value={changes[key]}/>)}</strong>


      <Websocket url='wss://ws-feed.pro.coinbase.com'
                 onMessage={this.handleData.bind(this)}
                 onOpen={() => console.log('onOpen')}
                 onClose={() => console.log('onClose')}
                 reconnect={true} debug={true}
                 ref={(websocketRef) => {
                   this.refWebSocket = websocketRef;
                 }}/>

    </Layout>;

  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WebSocket);

