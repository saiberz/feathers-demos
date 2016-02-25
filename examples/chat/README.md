# Feathers Chat

> A real-time chat API built with Feathers and MongoDB

## About

This project uses [Feathers](http://feathersjs.com). An open source web  framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
    
    ```
    cd path/to/chat; npm install
    ```

3. Start your app
    
    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful generator. Here's just a few things that it can do:

- **Generate a new Service:** `yo feathers:service`
- **Generate a new Hook:** `yo feathers:hook`
- **Generate a new Model:** `yo feathers:model`

## Deploying

### With Heroku

TODO (EK): Add Heroku build button

### With Docker

Simply run in your docker environment:

`docker run --name feathers-chat -d -p 8080:8080 -e PORT=8080 -e ekryski/feathers-chat`

### Vanilla

1. `npm install`
2. `mongod`
3. `npm start`

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2015

Licensed under the [MIT license](LICENSE).
