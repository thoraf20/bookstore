<p align="center">A simple book store REST API to demonstrate CRUD operations with unit test.</p>

## Description

The REST API has the following endpoints:

  ### POST "/api/books" to add books
  ### GET "/api/books" to fetch all books
  ### GET "/api/books/{bookId}" to fetch a single book by id
  ### PATCH "/api/books/{bookId}" to update a book details
  ### DELETE "/api/books/{bookId}" to delete book

## Clone app

Clone the repo and run the command:

```bash
$ git clone https://github.com/thoraf20/bookstore.git
```
## Installation

Install all necessary dependencies using the commad:
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Technologies used
### Nestjs
### Postgres
### Typeorm
### Swagger Doc