const RABBIT_MQ_HOST = (process.env.DOCKER_HOST) ? process.env.DOCKER_HOST : 'localhost';

export const vars ={
  createUserMessagePattern: 'prm-create-user-message-pattern',
  rabbitMQUrl: 'amqp://admin:admin@' + RABBIT_MQ_HOST + ':5672',
  queueName: 'prm.user.queue',
  appId: process.env.APPID ? process.env.APPID : 'STANDALONE',
}