import {
  Body,
  Controller,
  Logger,
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
}
