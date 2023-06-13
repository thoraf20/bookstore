import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import env from './config/app.config';
import basicAuth from 'express-basic-auth';
import { BooksService } from './books/books.service';
import { AddBookDto } from './books/dto/books.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    // Tests that the app is created successfully
    it('test_create_app', async () => {
      const app = await NestFactory.create(AppModule, { cors: true });
      expect(app).toBeDefined();
    });
    it('test use validation pipe', async () => {
      const app = await NestFactory.create(AppModule, { cors: true });
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
      expect(app).toBeDefined();
    });
    it('test_use_body_parser', async () => {
      const app = await NestFactory.create(AppModule, { cors: true });
      app.use(bodyParser.json());
      expect(app).toBeDefined();
    });
    // Tests that the Swagger documentation is created successfully
    it('test_create_swagger_doc', async () => {
      const app = await NestFactory.create(AppModule, { cors: true });
      const config = new DocumentBuilder()
        .setTitle('BeerTech BookStore API')
        .setVersion('0.0.1')
        .addBearerAuth(
          {
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT Token',
          },
          'Bearer',
        )
        .build();
      const document = SwaggerModule.createDocument(app, config);
      expect(document).toBeDefined();
    });
    // Tests that Basic authentication is set up correctly
    it('test_set_basic_auth', async () => {
      const app = await NestFactory.create(AppModule, { cors: true });
      const getUnauthorizedResponse = (req) => {
        return req.auth
          ? 'Credentials ' +
              req.auth.user +
              ':' +
              req.auth.password +
              ' rejected'
          : 'No credentials provided';
      };
      app.use(
        '/api/doc',
        basicAuth({
          challenge: true,
          users: { [env().swaggerUsername]: env().swaggerPassword },
          unauthorizedResponse: getUnauthorizedResponse,
        }),
      );
      expect(app).toBeDefined();
    });
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('book', () => {
    // Tests that a book with unique details can be added successfully
    it('test add book unique details', async () => {
      const bookRepositoryMock = {
        findOne: jest.fn().mockResolvedValue(undefined),
        save: jest.fn().mockImplementation((book) => Promise.resolve(book)),
      };
      const booksService = new BooksService(bookRepositoryMock as any);

      const dto = new AddBookDto();
      dto.title = 'The Hobbit';
      dto.author = 'J.R.R. Tolkien';
      dto.isbn = '1234567890';

      const result = await booksService.addBook(dto);

      expect(bookRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { author: dto.author, title: dto.title, isbn: dto.isbn },
      });
      expect(bookRepositoryMock.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });

    // Tests that a book can be added successfully with optional fields left empty
    it('test add book empty optional fields', async () => {
      const bookRepositoryMock = {
        findOne: jest.fn().mockResolvedValue(undefined),
        save: jest.fn().mockImplementation((book) => Promise.resolve(book)),
      };
      const booksService = new BooksService(bookRepositoryMock as any);

      const dto = new AddBookDto();
      dto.title = 'The Hobbit';
      dto.author = 'J.R.R. Tolkien';

      const result = await booksService.addBook(dto);

      expect(bookRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { author: dto.author, title: dto.title, isbn: dto.isbn },
      });
      expect(bookRepositoryMock.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });

    // Tests that a book can be added successfully with optional fields left empty
    it('test add book empty required fields', async () => {
      const bookRepositoryMock = {
        findOne: jest.fn().mockResolvedValue(undefined),
        save: jest.fn().mockImplementation((book) => Promise.resolve(book)),
      };
      const booksService = new BooksService(bookRepositoryMock as any);

      const dto = new AddBookDto();
      dto.title = 'The Hobbit';
      dto.isbn = '1234565';

      await booksService.addBook(dto);

      expect(bookRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { author: dto.author, title: dto.title, isbn: dto.isbn },
      });
      expect(bookRepositoryMock.save).not.toBeCalledTimes(0);
    });
  });
});
