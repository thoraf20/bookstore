import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Books } from './books.entity';
import { AddBookDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private bookRepository: Repository<Books>,
  ) {}

  async addBook(dto: AddBookDto) {
    const bookExist = await this.bookRepository.findOne({
      where: { author: dto.author, title: dto.title, isbn: dto.isbn },
    });

    if (bookExist) {
      throw new ConflictException(`Book with the same details already exist`);
    }
    const book = await this.bookRepository.save({
      ...dto,
    });

    return book;
  }

  async getAllBooks() {
    const books = await this.bookRepository.find();

    return books;
  }

  async getBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async updateBook(id: string, bookData: any) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return this.bookRepository.update(id, bookData);
  }

  async deleteteBook(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return this.bookRepository.delete(id);
  }
}
