import config from './jest.config';

const integrationConfig = {
  ...config,
  testRegex: '.*\\.(test)\\.ts$',
};

export default integrationConfig;
