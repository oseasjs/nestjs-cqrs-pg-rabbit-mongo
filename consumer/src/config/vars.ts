export const vars ={
  createUserMessagePattern: 'prm-create-user-message-pattern',
  rabbitMQUrl: 'amqp://admin:admin@localhost:5672',
  queueName: 'prm.user.queue',
  mongoConnectionUrl: 'mongodb://admin:admin@localhost:27017/prm-db?authSource=admin',
  appId: process.env.APPID ? process.env.APPID : 'STANDALONE',
  processUrlSyncStatus: 'http://localhost:8080/api/users/:id/status',
}