# Publish Message to RabbitMQ

Github action to publish messages to RabbitMQ 

## Usage

1. Set up your RabbitMQ server info as secrets in your repository settings using `RABBITMQ_HOST`, `RABBITMQ_VHOSTNAME`, `RABBITMQ_USERNAME`, `RABBITMQ_PASSWORD`

2. Add the following to your workflow

```yml
- name: Publish message to RabbitMQ
        uses: bulathacl/rabbitmq-publish-message@v1.0.0
        with:
          MESSAGE: "Test message"
          QUEUENAME: "test-rabbit-queue"
          HEADERS: "test-header1:testheader1val;test-header2:testheader2val"
          RABBITMQ_HOST: ${{ secrets.RABBITMQ_HOST }}
          RABBITMQ_VHOSTNAME: ${{ secrets.RABBITMQ_VHOSTNAME }}
          RABBITMQ_USERNAME: ${{ secrets.RABBITMQ_USERNAME }}
          RABBITMQ_PASSWORD: ${{ secrets.RABBITMQ_PASSWORD }}
```

## Inputs

### `MESSAGE`

**Required** This is your serialized message

### `QUEUENAME`

**Required** The name of the queue you are sending to

### `HEADERS`

**optional** The message headers. This should be in the following format to represent headers and its values, headerName1:headerVal1;headerName2:headerVal2

### `RABBITMQ_HOST`

**Required** RabbitMQ host name along with port. eg: rabbithost:5127 or rabbithost

### `RABBITMQ_VHOSTNAME`

**optional** RabbitMQ vhost name

### `RABBITMQ_USERNAME`

**Required** RabbitMQ username

### `RABBITMQ_PASSWORD`

**Required** RabbitMQ password


