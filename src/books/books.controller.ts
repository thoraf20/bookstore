import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorResponseObject, SuccessResponseObject } from '../common/https';
import { BooksService } from './books.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddBookDto } from './dto/books.dto';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  constructor(private booksService: BooksService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'add book' })
  async create(@Body() body: AddBookDto) {
    try {
      const book = await this.booksService.addBook(body);
      return new SuccessResponseObject(`book created successfully`, book);
    } catch (error) {
      this.logger.error(`add book error. ${error.message}`, error.stack);
      ErrorResponseObject(error);
    }
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'get all books' })
  async fetchAllBooks() {
    try {
      const books = await this.booksService.getAllBooks();
      return new SuccessResponseObject(`books fetched successfully`, books);
    } catch (error) {
      this.logger.error(`fetch books error. ${error.message}`, error.stack);
      ErrorResponseObject(error);
    }
  }

  @Get('/:bookId')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'fetch book by id' })
  async fetchBook(@Param('bookId') bookId: string) {
    try {
      const event = await this.booksService.getBook(bookId);
      return new SuccessResponseObject(`book fetched successfully`, event);
    } catch (error) {
      this.logger.error(`fetch book error. ${error.message}`, error.stack);
      ErrorResponseObject(error);
    }
  }
}
