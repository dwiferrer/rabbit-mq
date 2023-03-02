const express = require('express');
const dotenv = require('dotenv').config();
const amqp = require('amqplib');

const PORT = process.env.PORT || 3000;
const MQ_URL = process.env.MQ_URL || 'localhost:5672';
const MESSAGE_QUEUE = process.env.MESSAGE_QUEUE || 'messages-q';
const INVALID_MESSAGE_QUEUE =
  process.env.INVALID_MESSAGE_QUEUE || 'messages-q-dlx';

const app = express();
app.use(express.json());

let channel, connection;

const connectQueue = async () => {
  try {
    connection = await amqp.connect(`amqp://${MQ_URL}`);
    channel = await connection.createChannel();

    await channel.assertQueue(MESSAGE_QUEUE);
    await channel.assertQueue(INVALID_MESSAGE_QUEUE);
  } catch (error) {
    console.log(error);
  }
};

connectQueue();

const sendData = async (data, queue) => {
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  // await channel.close();
  // await connection.close();
};

app.post('/message', async (req, res) => {
  if (!req || !req.body || !req.body.message) {
    await sendData(req.body, INVALID_MESSAGE_QUEUE);
    return res
      .status(400)
      .json({ status: 'Error', message: 'Message not valid!' });
  }

  sendData(req.body.message, MESSAGE_QUEUE);
  res.send('Message sent!');
});

app.listen(PORT, () => {
  console.log(`Producer server running on port ${PORT}...`);
});
