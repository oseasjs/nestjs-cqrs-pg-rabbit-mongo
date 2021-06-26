export const vars ={
  createUserMessagePattern: 'prm-create-user-message-pattern',
  rabbitMQUrl: 'amqp://admin:admin@localhost:5672',
  queueName: 'prm.user.queue',
  appId: process.env.APPID ? process.env.APPID : 'STANDALONE',
}