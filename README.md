# Simple RabbitMQ Service

Developed as a technical task requirement for Dev Centre House.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

| Technology | Version     |
| :--------- | :---------- |
| NodeJS     | >= v18.14.0 |
| Docker     |             |
| RabbitMQ   | >= 3.11.9   |

### Setup

Install NodeJS

```
https://nodejs.org/en/download/
```

Install Docker

```
https://docs.docker.com/desktop/install/mac-install/
```

Install RabbitMQ in Docker

```
- https://coderwall.com/p/uqp34w/install-rabbitmq-via-docker-in-os-x
```

Clone repository

```
git clone https://github.com/dwiferrer/rabbit-mq.git
```

Install dependencies

```
npm install
```

Create .env file

- Fill up env variables on BOTH services

```
PORT =
MQ_URL =
MESSAGE_QUEUE =
INVALID_MESSAGE_QUEUE =
```

Run producer service

```
npm start
```

Run application in dev mode (nodemon)

```
npm run start-dev
```

Run consumer service

```
npm start
```

Run application in dev mode (nodemon)

```
npm run start-dev
```

## API Documentation

### Send Message

- Creates message

```
POST /api/message
```

```
Sample request body:

{
    "message": "Hello World!"
}

// message is required
```

```
Sample response:

"Message sent!"
```

```
Sample error response:

{
    "status": "Error",
    "message": "Message not valid!"
}

```

## Built With

- [ExpressJS](https://expressjs.com/) - A light-weight web application framework

## Branches and Development

Underconstruction...

## Versioning

Underconstruction...

## Author/s

Dwight Ferrer - https://github.com/dwiferrer - dwi.ferrer@gmail.com
