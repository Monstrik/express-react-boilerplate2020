import React from 'react';

import Layout from 'components/Layout';
import MdViewer from 'components/MdViewer';

const source = `
# AboutPage
### Alexander Yakovis
<a href="https://www.linkedin.com/in/yakovis/" target="_blank">Linkedin</a>
<a href="mailto:Looking.For.The.Best.Job@gmail.com">Looking.For.The.Best.Job@gmail.com</a>
`;

const AboutPage = ({ route: { title } }) => (
  <Layout title={title} needLogin={false}>
    <MdViewer source={source} />
  </Layout>
);

export default AboutPage;
