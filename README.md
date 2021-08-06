# Postgres x RabbitMQ x MongoDB

This project was bootstrapped with:
- [Node](https://nodejs.org/en/docs/);
- [NestJS](https://docs.nestjs.com/);
- [Postgres](https://www.postgresql.org/docs/);
- [RabbitMQ](https://www.rabbitmq.com/documentation.html);
- [MongoDB](https://docs.mongodb.com/manual/);
- [Docker](https://docs.docker.com/);
- [Docker-Compose](https://docs.docker.com/compose/);

## Project Goal

The main goal of the project is validate the performance and scalabilty of a _NodeJS_ service using microservice architecture and CQRS and Event Source principles with a message broker __RabbitMQ__.
This project have __syncronous__ (producer) and __asyncronous__ (consumer) calls and create data on a normalized DB _(Postgres)_ and on a denormalized DB __(MongoDB)__;
For asyncronous call, is being used a message broker __(RabbitMQ)__;
As an example, will be used some users created by a public API __(randomuser.me)__;
The perfomance and scalability will be validated running multiples service intances __(Docker)__ with a load balance service in front of them;
A static page will be used to fetch a list of users from public API and submit it to this project to be persisted;

##### The user persistence strategy will be follow the flow as below:
* A static page will call random users to get a list o users;
* For each user, the static page will call the producer endpoint to persisted it on Postgres;
* After persist the user, a message will be sended to a rabbitmq queue;
* The consumer service will be listenning the rabbitmq queue and will pull the message to persist the user on MongoDB;
* After persist the user on Mongo DB, the consumer will call a producer endpoint to update the user status there and finish the process;

##### To track all persistence stages, was used:
* A seed value to track all users persisted on a single test;
* A applicationID (appID) to track the instance that process the user persistence stage;
* Event table to track the users persistence stages (CREATED|SYNCRONIZED) and the user state (event sourcing);

## Infra

This project require some services that should be running before services start: postgres, mongodb and rabbitMQ
A docker-compose file is available on ./infra directory to install those services;
To install them, just go to ./infra directory and run: 
`docker-compose up -d`

## Running

This project use NodeJS and NestJS and is splited in 2 different projects: _producer_  and _consumer_. 
To install all package dependence, just go to related directory and run: 
`npm install`

* Standalone: 
To start the producer or consumer services, just go to related directory and run: 
`npm run start:dev`
&nbsp;
* Client Page(require producer running): 
`localhost:8080`


## Docker

To run multiples instances of producer and consumer services with a load balance service, a docker-compose file is avaliable on ./docker directory.
The docker images of producer and consumer services are required.
To create those images, just go to related service directory and run:
- `docker build . -t pg-rabbit-mongo-[producer|consumer]`

To avoid run the command above all the time, a `run.sh` file is available on ./docker directory. 
This file build the images of both service (consumer and producer) and execute the docker-compose file to start 3 instances of each service and the load balance service as well.
To run this file, just got to ./docker directory and run:
- `chmod +x ./docker/run.sh` _(before run command below at first time)_
- `./run.sh`


## Project Structure

_./infra_
* docker-compose file to install services required by this project: postgres, pgadmin, mongo, mongo-express and rabbitmq;

_./docker_
* docker-compose file to build producer and consumer docker images, start 3 different instances of this project and start load balance service;

_./producer_
* NodeJS service that provide an endpoint to create users on postgres DB and send a message to rabbitmq;
* Provide static page to fetch users from randomuser public api and submit it to producer create user endpoint;

_./consumer_
* NodeJS service that consume messages from rabbitmq, save a user on MongoDB and notify producer service to create a SYNCRONIZE event;
* Do not provide any endpoint;

## Performance Statistics

Userful SQL Query to extract some perfomance statistics from Postgre DB:

```
select seed, app_id,
count(*) total,
min(created_at), max(created_at),
(max(created_at), min(created_at)) duration
from prm_user
group by seed, app_id
order by 1, 2
```


## Inspiration

- Personal professional experience with Java and Node microservices projects;
&nbsp;
- NestJS documentation;
&nbsp;
- Load Balance with Docker-compose (Hussein Nasser, very funny guy):
  - https://www.youtube.com/watch?v=9sAg7RooEDc
&nbsp;
- Static page with NestJS: 
  - https://github.com/nestjs/nest/tree/master/sample/24-serve-static
&nbsp;
- NestJS with RabbitMQ: 
  - https://github.com/jmaicaaan/tutorial-nestjs-rabbitmq
  - https://github.com/ikhvost/nestjs-rabbitmq-microservices-sample
&nbsp;
- Postgres and PGAdmin from Docker-Compose:
  - https://renatogroffe.medium.com/postgresql-pgadmin-4-docker-compose-montando-rapidamente-um-ambiente-para-uso-55a2ab230b89
  - https://github.com/khezen/compose-postgres