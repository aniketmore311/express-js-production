# express-js-production

## Production ready express-js API starter

## Requirements

- node ^16.15.1
- npm ^8.12.1

## This starter includes

- `dotenv` and `config` for config management
- `helmet`, `cors` for security
- `http-errors` and error handling and logging middleware for error handling
- `express-validator` and a custom validation middleware for validation
- `winston`and `morgan` for logging
- `jest` and `supertest` for testing
- `pm2` as a production runtime
- `typescript` with jsdoc comments for static type checking your javascript code
- `Dockerfile` for building the docker container
- `Caddy` and `docker-compose.yaml` for deployment

## how to use this starter locally

- run `npx degit aniketmore311/express-js-production <your project name>`
- run `cd <your project name>`
- run `npm install`
- run `cp .env.example .env` and fill values of env variables in `.env` file
- run `npm run dev` to run in development or
- run `npm start` to start a single process or
- run `npm run prod` to run with pm2

## how to deploy this starter

- put your domain name in the Caddyfile in `infrastructure/caddy/Caddyfile` instead of `api.example.com` and make sure that the port mentioned in the Caddy file ( default `8080`) is the port at which you want to run your api
- make sure your `DNS` is setup so that your domain points to your server. This can be done by adding an `A` or a `CNAME` record in your DNS which points to your server's IP address or domain name
- get your code on the server using `git clone` or `FTP`
- run `cp .env.example .env` and fill all the required environment variables for production in the new `.env` file or make sure they are set in the server's environment
- make sure the `PORT` environment variable and the port mentioned in the Caddyfile are the same (default is `8080`)
- make sure the `NODE_ENV` environment variable is set to `production`
- run `cd infrastructure` to cd into the infrastructure directory
- make sure `docker` and `docker-compose` is installed on your server
- run `docker-compose up -d`. This will start the Caddy server and the api service
- this will also create a `logs` directory in the root of the project which contains logs from the api
- the logs can also be viewed by running `sudo docker logs api` for the api and `sudo docker logs caddy` for the caddy server
- visit or curl `https://api.example.com` (or your domain as per the Caddyfile) to see if the setup has worked
