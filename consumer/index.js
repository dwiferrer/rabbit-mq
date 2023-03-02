const amqp = require('amqplib');
const dotenv = require('dotenv').config();

const MESSAGE_QUEUE = process.env.MESSAGE_QUEUE || 'messages-q';
const INVALID_MESSAGE_QUEUE =
  process.env.INVALID_MESSAGE_QUEUE || 'messages-q-dlx';
const MQ_URL = process.env.MQ_URL || 'localhost:5672';

const connectValidMessages = async () => {
  try {
    const connection = await amqp.connect(`amqp://${MQ_URL}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(MESSAGE_QUEUE);
    channel.consume(MESSAGE_QUEUE, (data) => {
      console.log('Message received: ', `${data.content}`);
      channel.ack(data);
    });
  } catch (error) {
    console.error(error);
  }
};

const connectInvalidMessages = async () => {
  try {
    const connection = await amqp.connect(`amqp://${MQ_URL}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(INVALID_MESSAGE_QUEUE);
    channel.consume(INVALID_MESSAGE_QUEUE, (data) => {
      console.log('Invalid message received: ', `${data.content}`);
      channel.ack(data);
    });
  } catch (error) {
    console.error(error);
  }
};

connectValidMessages();
connectInvalidMessages();
