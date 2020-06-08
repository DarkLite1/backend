// require('@babel/register');

// const server = require('../../src/app').default;

import { getApolloServer } from '../../src/apolloServer'

module.exports = async () => {
  console.log('jest setup');
  
  const appolloTestServer = getApolloServer()
  await global.httpServer.listen()
}
