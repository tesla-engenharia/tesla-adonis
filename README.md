# Tesla API application

RESTful API for Tesla Engineering website

## Dependencies

1. PostgreSQL 11
2. Moment
3. Sentry

Checkout `package.json` for more info.

## Setup

Use the adonis command to listen to Kue and serve the app

```bash
adonis kue:listen
adonis serve
```

or manually clone the repo and then run `npm install`.

## Migrations

Run the following command to run startup migrations.

```bash
adonis migration:run
```

## Routes

Run the command bellow to show the available routes.

```bash
adonis route:list
```
Insomnia workspace backup is available [here](https://gist.githubusercontent.com/renanmav/664a9d235c69b14112e6bf9c0fa4555e/raw/5fb9ed569d2a665579670d6920923923e2deec5a/insomnia-adonis-tesla-api.json).
