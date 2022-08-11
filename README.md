# express-js-production

## Production ready express-js starter

## Requirements

- node ^16.15.1
- npm ^8.12.1

## This starter includes

- `dotenv` and `config` for config management
- `helmet`, `cors` for security
- `make-promises-safe`, `http-errors` and error handling and logging middleware for error handling
- `express-validator` and a custom validation middleware for validation
- `winston`and `morgan` for logging
- `jest` and `supertest` for testing
- `pm2` as a production runtime

## how to use this starter

- run `npx degit aniketmore311/express-js-production <your project name>`
- run `cd <your project name>`
- run `npm install`
- run `cp .env.example .env` and fill values of env variables in `.env` file
- run `npm start` to start in production or
- run `npm run dev` to run in development or
- run `npm run node` to start a single node process
