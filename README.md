# Short Link #

This project is made with NestJs, TypeOrm, Mysql Database, Grapql, unit test are added and also e2e tests

## Project setup

```bash
$ yarn install
```

## Env file

Copy the file .env.example to create .env in the root 

## Docker

make sure to install Docker [Intall Link](https://docs.docker.com/desktop/install/mac-install/)

## Start Database 

```bash
$ yarn tunOnDatabase
```

## Seed Database 

```bash
$ yarn seed
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Query Api

To make request to the api you can use any grapql client like Postman or other and use the url localhost:3000/graphql

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
