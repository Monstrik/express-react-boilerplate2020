import React, { useEffect } from 'react';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';
import * as action from 'pages/Intro/action';
import { connect } from 'react-redux';
import { formatDate } from 'utils';
import { Link } from 'react-router-dom';
import ExchangeRate from 'components/ExchangRate';

const source = `
# Intro
Page 1
Email: <a href="mailto:">Developer</a>
`;


const Intro = ({
                 route: { title },
                 ratesData,
                 getExchangeRatesAction,
               }) => {

  useEffect(() => {
    // if (!rates || rates.length === 0) {
    getExchangeRatesAction();
    // }
  }, []);

  // const onPageChange = () => {
  //   getExchangeRatesAction();
  // };

  const { rates: allRates, currency } = ratesData;

  const titleText = `## ${currency} Rates: `;
  return <Layout title={title}>
    <MdViewer source={titleText}/>
    {Object.keys(allRates).map(key => <ExchangeRate key={key} name={key} value={allRates[key]}/>)}
  </Layout>;

};


const mapStateToProps = (state) => ({
  ratesData: state.introReducer.ratesData,
  currency: state.introReducer.rates,
});
// const mapStateToProps = ({ introReducer: { rates } }) => ({ rates });

const mapDispatchToProps = {
  getExchangeRatesAction: action.getExchangeRatesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);

