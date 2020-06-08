module.exports = async () => {
  console.log('jest teardown');
  await global.httpServer.stop();
};