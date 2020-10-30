import React from 'react';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';

const source = `
# Intro
Page 1
Email: <a href="mailto:">Developer</a>
`;

const Intro = ({ route: { title } }) => (
  <Layout title={title} needLogin={false}>
    <MdViewer source={source} />
  </Layout>
);

export default Intro;
