const HOST = (process.env.DOCKER_HOST) ? process.env.DOCKER_HOST : 'localhost';

export const vars ={
  createUserMessagePattern: 'prm-create-user-message-pattern',
  rabbitMQUrl: 'amqp://admin:admin@' + HOST + ':5672',
  queueName: 'prm.user.queue',
  mongoConnectionUrl: 'mongodb://admin:admin@' + HOST + ':27017/prm-db?authSource=admin',
  appId: process.env.APPID ? process.env.APPID : 'STANDALONE',
  processUrlSyncStatus: 'http://' + HOST + ':8080/api/users/:id/status',
}