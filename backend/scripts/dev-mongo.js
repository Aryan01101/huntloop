const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create({
    instance: { port: 27017, dbName: 'huntloop' },
  });
  console.log('MONGO_READY', mongod.getUri());
  process.on('SIGTERM', async () => { await mongod.stop(); process.exit(0); });
})();
